"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogIn, LogOut, User, Search } from "lucide-react";
import { supabase } from "@/Lib/supabaseClient";

const Logo = () => (
  <Link href="/" className="flex items-center gap-2">
    <img
      src="https://ext.same-assets.com/3329413445/606803464.png"
      alt="BadOpsec"
      className="w-8 h-8 rounded-lg"
    />
    <span className="font-semibold text-white">BadOpsec</span>
  </Link>
);

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string | null; user_metadata?: { role?: string } } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Record<string, unknown>[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const isSearchingRef = useRef(false);
  const setIsSearchingState = (value: boolean) => {
    isSearchingRef.current = value;
    setIsSearching(value);
  };
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchAbortControllerRef = useRef<AbortController | null>(null);
  const lastSearchQueryRef = useRef<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = !!user;
  const isAdmin = isLoggedIn && user.email === "ffef8191@gmail.com";
  const canSeeClear = isLoggedIn && (user.user_metadata?.role === 'admin' || user.user_metadata?.role === 'week' || user.user_metadata?.role === 'month' || user.user_metadata?.role === 'year');

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/connexion");
  };

  const formatSearchResult = (result: Record<string, unknown>) => {
    // Determine type and emoji based on available fields
    let type = 'person';
    let emoji = '👤';
    let name = '';
    let info = '';

    if (result.nom_complet) {
      name = String(result.nom_complet);
      type = 'person';
      emoji = '👤';
    } else if (result.name) {
      name = String(result.name);
      type = 'person';
      emoji = '👤';
    } else if (result.titre) {
      name = String(result.titre);
    }

    // Add additional info
    if (result.email) {
      info = String(result.email);
      emoji = '✉️';
    } else if (result.telephone) {
      info = String(result.telephone);
      emoji = '📞';
    } else if (result.formatted) {
      info = String(result.formatted);
      emoji = '📍';
    } else if (result.city) {
      info = String(result.city);
      emoji = '📍';
    } else if (result.organisme) {
      info = String(result.organisme);
    }

    return { emoji, name: name || 'N/A', info, type };
  };

  const getAllAvailableFields = (result: Record<string, unknown>) => {
    // Get all fields from the result object, organized by type
    const fields: { [key: string]: { label: string; emoji: string; value: string } } = {};
    
    // Map of field names to display labels and emojis
    const fieldMap: { [key: string]: { label: string; emoji: string } } = {
      'nom_complet': { label: 'Nom Complet', emoji: '👤' },
      'prenom': { label: 'Prénom', emoji: '👤' },
      'nom': { label: 'Nom', emoji: '👤' },
      'name': { label: 'Nom', emoji: '👤' },
      'titre': { label: 'Titre', emoji: '📝' },
      'email': { label: 'Email', emoji: '✉️' },
      'telephone': { label: 'Téléphone', emoji: '📞' },
      'phone': { label: 'Téléphone', emoji: '📞' },
      'formatted': { label: 'Adresse', emoji: '📍' },
      'address': { label: 'Adresse', emoji: '📍' },
      'city': { label: 'Ville', emoji: '🏙️' },
      'postal_code': { label: 'Code Postal', emoji: '📮' },
      'country': { label: 'Pays', emoji: '🌍' },
      'organisme': { label: 'Organisme', emoji: '🏢' },
      'company': { label: 'Entreprise', emoji: '🏢' },
      'date_naissance': { label: 'Date de Naissance', emoji: '🎂' },
      'genre': { label: 'Genre', emoji: '👥' },
      'situation': { label: 'Situation', emoji: 'ℹ️' },
      'profession': { label: 'Profession', emoji: '💼' },
      'fonction': { label: 'Fonction', emoji: '💼' },
      'poste': { label: 'Poste', emoji: '💼' },
      'secteur': { label: 'Secteur', emoji: '📊' },
      'localite': { label: 'Localité', emoji: '📍' },
      'statut': { label: 'Statut', emoji: 'ℹ️' },
      'description': { label: 'Description', emoji: '📄' },
      'note': { label: 'Note', emoji: '📌' },
      'linkedin': { label: 'LinkedIn', emoji: '🔗' },
      'twitter': { label: 'Twitter', emoji: '🐦' },
      'site_web': { label: 'Site Web', emoji: '🌐' },
      'website': { label: 'Site Web', emoji: '🌐' },
      'id': { label: 'ID', emoji: '🔑' },
      'source': { label: 'Source', emoji: '📌' },
    };

    // Iterate through result object and extract all fields
    Object.keys(result).forEach(key => {
      const value = result[key];
      if (value !== null && value !== undefined && value !== '') {
        const displayInfo = fieldMap[key.toLowerCase()] || { label: key.charAt(0).toUpperCase() + key.slice(1), emoji: '📋' };
        let displayValue = String(value);

        // Format specific field types
        if (key === 'date_naissance' && value) {
          try {
            displayValue = new Date(String(value)).toLocaleDateString('fr-FR');
          } catch (e) {
            displayValue = String(value);
          }
        } else if (key === 'genre' && value) {
          const genreValue = String(value);
          displayValue = genreValue === 'F' ? 'Femme' : genreValue === 'M' ? 'Homme' : genreValue;
        } else {
          displayValue = String(value);
        }

        fields[key] = { label: displayInfo.label, emoji: displayInfo.emoji, value: displayValue };
      }
    });

    return fields;
  };

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearchingState(false);
      setIsSearchModalOpen(false);
      return;
    }

    // Skip if we're already searching for this exact query
    if (lastSearchQueryRef.current === query && isSearchingRef.current) {
      return;
    }

    // Cancel previous request if still in progress
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort();
    }

    lastSearchQueryRef.current = query;
    setIsSearchingState(true);
    searchAbortControllerRef.current = new AbortController();

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        signal: searchAbortControllerRef.current.signal,
      });
      
      if (response.status === 429) {
        console.warn("Rate limited, retrying...");
        setTimeout(() => handleSearch(query), 1000);
        return;
      }
      
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json() as { results?: Record<string, unknown>[] };
      setSearchResults(data.results || []);
      setIsSearchModalOpen(true);
    } catch (error) {
      const err = error as Error;
      if (err.name !== "AbortError") {
        console.error("Search error:", error);
        setSearchResults([]);
      }
    }
    setIsSearchingState(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery && searchQuery.trim()) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
        setIsSearchingState(false);
        setIsSearchModalOpen(false);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href || (href === "/" && pathname === "");
    return (
      <Link
        href={href}
        className={`relative group px-1 py-1 ${isActive ? "text-white font-semibold" : "text-muted-foreground"} text-sm transition-colors`}
      >
        <span className="relative z-10">{children}</span>
        <span className={`absolute left-0 -bottom-2 h-1 rounded-full bg-violet-500 w-full transform transition-transform origin-center ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 persistent-navbar">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="relative flex items-center justify-between bg-background/80 backdrop-blur-md border border-border rounded-full px-6 py-2 shadow-lg">
          <div className="flex items-center gap-3">
            <Logo />
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen((prev) => !prev)}
              className="md:hidden text-white p-2 rounded-full hover:bg-white/10"
              aria-label={isMobileSearchOpen ? "Fermer la recherche" : "Ouvrir la recherche"}
            >
              <Search className="w-5 h-5" />
            </button>
            {isMobileSearchOpen && (
              <div className="md:hidden flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 w-full max-w-[320px]">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full bg-transparent border-none outline-none text-sm text-white placeholder:text-muted-foreground"
                />
              </div>
            )}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink href="/">ACCUEIL</NavLink>
            <NavLink href="/tarifs">TARIFS</NavLink>
            <NavLink href="/contact">CONTACT</NavLink>
            {isAdmin && <NavLink href="/dashboard">DASHBOARD</NavLink>}
            <div className="relative">
              <button
                onClick={() => setLegalOpen(!legalOpen)}
                className="relative group px-1 py-1 flex items-center gap-1 transition-colors text-sm"
              >
                <span className="relative z-10 text-muted-foreground group-hover:text-white">LÉGAL</span>
                <ChevronDown className="w-4 h-4" />
                <span className="absolute left-0 -bottom-2 h-1 rounded-full bg-violet-500 w-full transform transition-transform origin-center scale-x-0 group-hover:scale-x-100" />
              </button>
              {legalOpen && (
                <div className="absolute top-full mt-2 left-0 bg-card border border-border rounded-lg py-2 min-w-[200px] shadow-xl">
                  <Link href="/conditions" className="block px-4 py-2 text-sm text-muted-foreground hover:text-white hover:bg-secondary transition-colors">
                    Conditions d'utilisation
                  </Link>
                  <Link href="/legal" className="block px-4 py-2 text-sm text-muted-foreground hover:text-white hover:bg-secondary transition-colors">
                    Politique de confidentialité
                  </Link>
                  <Link href="/rgpd" className="block px-4 py-2 text-sm text-muted-foreground hover:text-white hover:bg-secondary transition-colors">
                    RGPD
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="bg-transparent border-none outline-none text-sm text-white placeholder:text-muted-foreground w-32 focus:w-48 transition-all"
                />
              </div>
              {(searchResults.length > 0 || isSearching) && (
                <div className="absolute top-full mt-2 left-0 bg-card border border-border rounded-lg py-2 min-w-[350px] max-h-96 overflow-y-auto shadow-xl z-50">
                    {isSearching && searchResults.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-muted-foreground text-center">🔍 Recherche en cours...</div>
                    ) : searchResults.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-muted-foreground text-center">Aucun résultat</div>
                    ) : (
                      searchResults.map((result, index) => {
                        const formatted = formatSearchResult(result);
                        return (
                          <div
                            key={index}
                            className={`px-4 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition cursor-pointer ${
                              canSeeClear ? '' : 'blur-md select-none pointer-events-none'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{formatted.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-white truncate">{formatted.name}</div>
                                {formatted.info && <div className="text-xs text-muted-foreground truncate mt-0.5">{formatted.info}</div>}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="hidden md:inline-flex items-center gap-2 bg-white/5 text-white px-5 py-2 rounded-full text-sm font-medium border border-violet-500/20 hover:bg-white/10 transition"
                >
                  <User className="w-4 h-4" />
                  PROFIL
                </Link>
                <button
                  onClick={handleSignOut}
                  className="hidden md:inline-flex items-center gap-2 bg-rose-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-rose-400 transition"
                >
                  <LogOut className="w-4 h-4" />
                  DÉCONNEXION
                </button>
              </>
            ) : (
              <Link
                href="/connexion"
                className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-violet-400 text-white px-5 py-2 rounded-full text-sm font-medium shadow-[0_10px_30px_rgba(184,107,255,0.18)]"
              >
                <LogIn className="w-4 h-4" />
                ACCÈS
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-white mb-1.5" />
            <div className="w-6 h-0.5 bg-white mb-1.5" />
            <div className="w-6 h-0.5 bg-white" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border p-4 mt-2 rounded-lg mx-4">
          <div className="mb-4">
            <label htmlFor="mobile-search" className="sr-only">Rechercher</label>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                id="mobile-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher..."
                className="w-full bg-transparent border-none outline-none text-sm text-white placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <Link href="/" className="block py-2 text-white">ACCUEIL</Link>
          <Link href="/tarifs" className="block py-2 text-muted-foreground">TARIFS</Link>
          <Link href="/contact" className="block py-2 text-muted-foreground">CONTACT</Link>
          {isAdmin && <Link href="/dashboard" className="block py-2 text-muted-foreground">DASHBOARD</Link>}
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="block py-2 text-muted-foreground">PROFIL</Link>
              <button onClick={handleSignOut} className="w-full text-left py-2 text-muted-foreground hover:text-white">DÉCONNEXION</button>
            </>
          ) : (
            <Link href="/connexion" className="block py-2 text-muted-foreground">ACCÈS</Link>
          )}
        </div>
      )}

      {/* Search Results Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 overflow-y-auto">
          <div className="w-full max-w-6xl max-h-[90vh] rounded-[2rem] border border-violet-500/20 bg-[#110816]/95 backdrop-blur-xl shadow-2xl shadow-violet-900/50 overflow-hidden flex flex-col bg-cover bg-center" style={{backgroundImage: "url('/25e45cf3153f5d88e4833a5133ffd821.jpg')"}}>
            <div className="absolute inset-0 bg-gradient-to-b from-[#110816]/80 via-[#110816]/90 to-[#110816]/95 pointer-events-none"></div>
            <div className="relative flex items-center justify-between border-b border-violet-500/20 px-8 py-6 bg-gradient-to-r from-violet-900/40 to-fuchsia-900/40">
              <div>
                <h2 className="text-4xl font-bold text-white">Résultats de recherche</h2>
                <p className="text-violet-200/70 text-sm mt-1">{searchResults.length} résultat{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const text = searchResults.map((r) => {
                      const lines = [];
                      const fields = getAllAvailableFields(r);
                      const name = r.nom_complet || r.name || 'N/A';
                      lines.push(`=== ${name} ===`);
                      Object.entries(fields).forEach(([key, field]) => {
                        if (key !== 'nom_complet' && key !== 'name') {
                          lines.push(`${field.label}: ${field.value}`);
                        }
                      });
                      return lines.join('\n');
                    }).join('\n\n');
                    const element = document.createElement('a');
                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                    element.setAttribute('download', `resultats_recherche_${Date.now()}.txt`);
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }}
                  className="inline-flex items-center gap-2 bg-green-600/80 hover:bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
                >
                  📥 Télécharger TXT
                </button>
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="text-white/60 hover:text-white transition text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto relative z-10">
              {isSearching && searchResults.length === 0 ? (
                <div className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-lg text-muted-foreground">Recherche en cours...</p>
                  </div>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="flex items-center justify-center h-40">
                  <p className="text-lg text-muted-foreground">Aucun résultat trouvé</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
                  {searchResults.map((result, index) => {
                    const formatted = formatSearchResult(result);
                    const allFields = getAllAvailableFields(result);
                    const fieldEntries = Object.entries(allFields);
                    const priorityFields = ['nom_complet', 'name', 'email', 'telephone', 'phone', 'formatted', 'address'];
                    
                    // Sort fields: priority fields first, then rest
                    const sortedFields = [
                      ...fieldEntries.filter(([key]) => priorityFields.includes(key.toLowerCase())),
                      ...fieldEntries.filter(([key]) => !priorityFields.includes(key.toLowerCase()))
                    ];
                    
                    return (
                      <div
                        key={index}
                        className={`rounded-xl border border-violet-500/30 bg-white/5 hover:bg-white/10 backdrop-blur-sm p-6 transition ${
                          canSeeClear ? '' : 'blur-md select-none pointer-events-none'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-4">
                          <span className="text-3xl">{formatted.emoji}</span>
                          <h3 className="text-lg font-bold text-white flex-1">{formatted.name}</h3>
                        </div>
                        <div className="space-y-2.5 text-sm max-h-96 overflow-y-auto">
                          {sortedFields.map(([key, field], idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-base flex-shrink-0 w-5 text-center">{field.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs text-muted-foreground font-medium">{field.label}</div>
                                <div className="text-white/90 break-all">{field.value}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
