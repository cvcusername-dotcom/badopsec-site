import { NextResponse } from "next/server";

// Simple cache for search results
const searchCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60000; // 60 seconds

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.trim().length === 0) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  const query = q.trim().toLowerCase();

  // Check cache first
  const cached = searchCache.get(query);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`https://api.eye-all.fr/api/v1/search?q=${encodeURIComponent(query)}&api_key=S0fnMCHZTRRa`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle rate limiting from external API
    if (response.status === 429) {
      // Return cached result if available even if expired
      if (cached) {
        return NextResponse.json(cached.data);
      }
      return NextResponse.json({ error: "External API rate limited. Try again in a few seconds." }, { status: 429 });
    }

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch from external API" }, { status: response.status });
    }

    const data = await response.json() as {
      data?: {
        results?: Array<{ results?: unknown[] }>;
      };
    };

    // Parse nested structure: data.results is an array of objects with description and results
    let flatResults: unknown[] = [];
    if (data.data?.results && Array.isArray(data.data.results)) {
      data.data.results.forEach((category) => {
        if (category.results && Array.isArray(category.results)) {
          flatResults = flatResults.concat(category.results);
        }
      });
    }

    const formattedResponse = {
      results: flatResults.slice(0, 50), // Limit to 50 results
      query: query,
      total: flatResults.length,
    };

    // Cache the result
    searchCache.set(query, { data: formattedResponse, timestamp: Date.now() });

    // Clean up old cache entries to prevent memory issues
    if (searchCache.size > 100) {
      const oldest = Array.from(searchCache.entries())
        .sort((a, b) => a[1].timestamp - b[1].timestamp)[0];
      if (oldest) {
        searchCache.delete(oldest[0]);
      }
    }

    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error("Search API error:", error);
    
    // Return cached result if available on error
    if (cached) {
      return NextResponse.json(cached.data);
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}