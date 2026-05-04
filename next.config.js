/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  allowedDevOrigins: ["*.preview.same-app.com"],
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    const headers = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
      { key: "X-XSS-Protection", value: "0" },
    ];

    if (process.env.NODE_ENV === 'production') {
      headers.push({
        key: "Content-Security-Policy",
        value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://ext.same-assets.com https://source.unsplash.com https://images.unsplash.com https://ugc.same-assets.com; font-src 'self' data: https://ext.same-assets.com; connect-src 'self' https://gxnxqcnxyuktjimxzkop.supabase.co; frame-ancestors 'none'; object-src 'none'; base-uri 'self';",
      });
    }

    return [
      {
        source: "/(.*)",
        headers,
      },
    ];
  },
};

module.exports = nextConfig;
