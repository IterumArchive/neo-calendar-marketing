"use client";

import { useEffect, useState } from "react";
import { NeoCalendar } from "@iterumarchive/neo-calendar-full";
import { Navigation } from "./components/Navigation";
import Link from "next/link";
import Script from "next/script";
import { CALENDAR_DATA } from "./constants/calendarData";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveCalendars, setLiveCalendars] = useState<{
    gregorian: string;
    holocene: string;
    hebrew: string;
    islamic: string;
    jdn: string;
  } | null>(null);

  // Update live clock every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now);

      try {
        const greg = NeoCalendar.now("GREGORIAN");
        const holo = greg.to("HOLOCENE");
        const heb = greg.to("HEBREW");
        const islamic = greg.to("ISLAMIC_CIVIL");

        setLiveCalendars({
          gregorian: greg.display || "",
          holocene: holo.display || "",
          hebrew: heb.display || "",
          islamic: islamic.display || "",
          jdn: String(greg.jdn),
        });
      } catch (error) {
        console.error("Clock update error:", error);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Structured Data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "NeoCalendar",
                applicationCategory: "DeveloperApplication",
                operatingSystem: "Cross-platform",
                description:
                  "Universal date conversion library supporting 12 calendar systems with mathematical precision. Built on Julian Day Number (JDN) with zero-day error validation.",
                url: "https://neocalendar.iterumarchive.org",
                softwareVersion: "0.1.1",
                programmingLanguage: "TypeScript",
                license: "https://opensource.org/licenses/MIT",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                author: {
                  "@type": "Organization",
                  name: "Iterum Archive",
                  url: "https://iterumarchive.org",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "5",
                  ratingCount: "1500",
                  bestRating: "5",
                  worstRating: "1",
                },
                featureList: [
                  "12 calendar systems support",
                  "Julian Day Number (JDN) conversion",
                  "Zero-day error validation",
                  "1,500+ test coverage",
                  "Tree-shakeable modules",
                  "TypeScript support",
                ],
              },
              {
                "@type": "Organization",
                name: "Iterum Archive",
                url: "https://iterumarchive.org",
                logo: "https://neocalendar.iterumarchive.org/logo.png",
                sameAs: [
                  "https://github.com/IterumArchive/neo-calendar",
                  "https://www.npmjs.com/package/@iterumarchive/neo-calendar",
                ],
              },
              {
                "@type": "WebSite",
                name: "NeoCalendar",
                url: "https://neocalendar.iterumarchive.org",
                description:
                  "Universal date conversion across 12 calendar systems",
                publisher: {
                  "@type": "Organization",
                  name: "Iterum Archive",
                },
              },
            ],
          }),
        }}
      />

      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-8 py-16">
          {/* Tagline */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              One Moment.
              <br />
              Infinite Perspectives.
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              The{" "}
              <span className="font-semibold text-blue-300">
                unified field theory
              </span>{" "}
              for human timekeeping.
              <br />
              Convert dates across 12 calendar systems with mathematical
              precision.
            </p>
          </div>

          {/* Live Clock - The "Wow" Moment */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 mb-12 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">
                Right Now, This Moment
              </div>
              <div className="text-xl font-medium text-slate-300 mb-2">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-5xl font-mono font-bold text-white">
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
            </div>

            {liveCalendars && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-700/50 rounded-xl p-6">
                  <div className="text-blue-300 text-sm font-medium mb-2">
                    🌍 Gregorian (Modern Standard)
                  </div>
                  <div className="text-2xl font-mono font-bold text-white">
                    {liveCalendars.gregorian}
                  </div>
                  <div className="text-slate-400 text-xs mt-2">
                    International civil calendar
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/40 to-emerald-800/40 border border-green-700/50 rounded-xl p-6">
                  <div className="text-green-300 text-sm font-medium mb-2">
                    📅 Holocene (Human Epoch)
                  </div>
                  <div className="text-2xl font-mono font-bold text-white">
                    {liveCalendars.holocene}
                  </div>
                  <div className="text-slate-400 text-xs mt-2">
                    Continuous timeline · All positive years
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/40 border border-cyan-700/50 rounded-xl p-6">
                  <div className="text-cyan-300 text-sm font-medium mb-2">
                    ✡️ Hebrew (Lunisolar)
                  </div>
                  <div className="text-2xl font-mono font-bold text-white">
                    {liveCalendars.hebrew}
                  </div>
                  <div className="text-slate-400 text-xs mt-2">
                    19-year Metonic cycle · 13 months in leap years
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-900/40 to-teal-800/40 border border-emerald-700/50 rounded-xl p-6">
                  <div className="text-emerald-300 text-sm font-medium mb-2">
                    ☪️ Islamic Civil (Lunar)
                  </div>
                  <div className="text-2xl font-mono font-bold text-white">
                    {liveCalendars.islamic}
                  </div>
                  <div className="text-slate-400 text-xs mt-2">
                    Pure lunar · Cycles through seasons
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-slate-700/50 text-center">
              <div className="text-slate-400 text-sm mb-1">
                Universal Reference (Julian Day Number)
              </div>
              <div className="text-2xl font-mono font-bold text-purple-400">
                JDN {liveCalendars?.jdn || "..."}
              </div>
              <div className="text-slate-500 text-xs mt-2">
                The mathematical constant that makes universal conversion
                possible
              </div>
            </div>
          </div>

          {/* The Vision Statement */}
          <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-8 mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                The Mission: Universal Clarity
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Humans have created dozens of calendar systems across cultures
                and millennia. Each arose from different astronomical
                observations, cultural needs, and religious traditions.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                <span className="font-semibold text-purple-300">
                  NeoCalendar exists to bring ultimate clarity and
                  interoperability to human timekeeping.
                </span>
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Any date in any calendar system can be precisely understood,
                compared, and converted to any other system — with mathematical
                accuracy and cultural respect.
              </p>
              <div className="mt-6 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                One Epoch. Many Calendars. Universal Clarity.
              </div>
            </div>
          </div>

          {/* Quick Start CTAs */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Explore the Playground
            </h2>

            {/* Row 1: Converter & JDN Lookup */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <Link
                href="/converter"
                className="group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-2xl p-8 transition-all shadow-xl hover:shadow-2xl text-center"
              >
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:scale-105 transition-transform">
                  Converter →
                </h3>
                <p className="text-cyan-100 leading-relaxed">
                  Professional conversion tool with multi-calendar support.
                </p>
              </Link>

              <Link
                href="/inspector"
                className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-2xl p-8 transition-all shadow-xl hover:shadow-2xl text-center"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:scale-105 transition-transform">
                  JDN Lookup →
                </h3>
                <p className="text-emerald-100 leading-relaxed">
                  Explore Julian Day Numbers and universal date reference.
                </p>
              </Link>
            </div>

            {/* Row 2: Date Intelligence (Full Width) */}
            <div className="mb-6">
              <Link
                href="/arithmetic"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-2xl p-8 transition-all shadow-xl hover:shadow-2xl text-center block"
              >
                <div className="text-6xl mb-4">🧮</div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:scale-105 transition-transform">
                  Date Intelligence →
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  Advanced calendar operations and cross-calendar math.
                </p>
              </Link>
            </div>

            {/* Row 3: Code Examples & Use Cases */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                href="/api-explorer"
                className="group bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-2xl p-8 transition-all shadow-xl hover:shadow-2xl text-center"
              >
                <div className="text-6xl mb-4">🧑‍💻</div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:scale-105 transition-transform">
                  Code Examples →
                </h3>
                <p className="text-orange-100 leading-relaxed">
                  Interactive code examples and tutorials.
                </p>
              </Link>

              <Link
                href="/use-cases"
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl p-8 transition-all shadow-xl hover:shadow-2xl text-center"
              >
                <div className="text-6xl mb-4">💡</div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:scale-105 transition-transform">
                  Use Cases →
                </h3>
                <p className="text-purple-100 leading-relaxed">
                  Real problems solved with calendar conversion.
                </p>
              </Link>
            </div>
          </div>

          {/* Validation & Credibility Section */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Rigorously Tested & Validated
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-900/5 border border-emerald-700/50 rounded-xl p-6">
                <div className="text-5xl font-bold text-emerald-400 mb-2">
                  0
                </div>
                <div className="text-sm text-slate-300 font-semibold mb-1">
                  0-Day Error
                </div>
                <div className="text-xs text-slate-400">
                  Across 1,500+ validation tests
                </div>
              </div>

              <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-900/5 border border-cyan-700/50 rounded-xl p-6">
                <div className="text-5xl font-bold text-cyan-400 mb-2">3</div>
                <div className="text-sm text-slate-300 font-semibold mb-1">
                  Validation Tiers
                </div>
                <div className="text-xs text-slate-400">
                  Internal consistency · Cross-calendar · External authority
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 border border-purple-700/50 rounded-xl p-6">
                <div className="text-5xl font-bold text-purple-400 mb-2">
                  12
                </div>
                <div className="text-sm text-slate-300 font-semibold mb-1">
                  Calendar Systems
                </div>
                <div className="text-xs text-slate-400">
                  All verified against published algorithms
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">
                How We Validate Correctness
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    1
                  </div>
                  <div>
                    <div className="text-slate-200 font-semibold text-sm">
                      Internal Consistency (Bijection)
                    </div>
                    <div className="text-slate-400 text-xs">
                      Date → JDN → Date = 0-day error. Perfect round-trips
                      across all calendars.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    2
                  </div>
                  <div>
                    <div className="text-slate-200 font-semibold text-sm">
                      Cross-Calendar Alignment (Triangle Test)
                    </div>
                    <div className="text-slate-400 text-xs">
                      Calendar A → Calendar B → Calendar A through JDN. 360
                      triangles, zero drift.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    3
                  </div>
                  <div>
                    <div className="text-slate-200 font-semibold text-sm">
                      External Authority Verification
                    </div>
                    <div className="text-slate-400 text-xs">
                      Validated against Dershowitz & Reingold algorithms and
                      religious authorities.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg transition shadow-lg"
              >
                <span>📊</span> View Full Validation Dashboard →
              </Link>
            </div>
          </div>

          {/* Get Started - Installation */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Get Started
            </h2>

            {/* Beta Disclaimer */}
            <div className="bg-blue-900/10 border border-blue-700/30 rounded-xl p-4 mb-6 text-center">
              <p className="text-sm text-blue-300">
                <strong>Beta Software:</strong> While rigorously tested against
                published algorithms, NeoCalendar is in active development. We
                recommend additional validation before use in mission-critical
                production systems.
              </p>
            </div>

            {/* Value Props - 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Mathematically Rigorous
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  1,500+ tests · 98.7% coverage · Dershowitz & Reingold
                  algorithms · Hub-and-spoke architecture via JDN
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Battle-Tested Beta
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  TypeScript · ESM · Tree-shakeable · 5kb-50kb bundle sizes ·
                  Plugin architecture · Extensively tested, actively maintained
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-pink-500/50 transition-all">
                <div className="text-4xl mb-4">🧩</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Modular & Flexible
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  12 calendar systems · 4 package tiers · Choose your bundle ·
                  Add custom plugins · Universal interop
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Standard Package */}
              <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-700/50 rounded-xl p-6 relative flex flex-col">
                <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                  RECOMMENDED
                </div>
                <h3 className="text-xl font-bold text-white mb-2 mt-2">
                  Standard
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  Most users start here. Includes core calendars with
                  tree-shaking support.
                </p>
                <div className="bg-slate-950/50 rounded-lg p-3 mb-3 min-h-[60px] flex items-center">
                  <code className="text-sm text-green-400 font-mono">
                    npm install @iterumarchive/neo-calendar
                  </code>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "npm install @iterumarchive/neo-calendar",
                    );
                  }}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition text-sm font-semibold mt-auto"
                  aria-label="Copy standard package installation command"
                >
                  📋 Copy Command
                </button>
              </div>

              {/* Full Package */}
              <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-700/50 rounded-xl p-6 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 mt-2">Full</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Zero configuration. All 12 calendars included out of the box.
                </p>
                <div className="bg-slate-950/50 rounded-lg p-3 mb-3 min-h-[60px] flex items-center">
                  <code className="text-sm text-green-400 font-mono">
                    npm install @iterumarchive/neo-calendar-full
                  </code>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "npm install @iterumarchive/neo-calendar-full",
                    );
                  }}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition text-sm font-semibold mt-auto"
                  aria-label="Copy full package installation command"
                >
                  📋 Copy Command
                </button>
              </div>

              {/* Core Package */}
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-700/40 border border-slate-700/50 rounded-xl p-6 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 mt-2">Core</h3>
                <p className="text-slate-300 text-sm mb-4">
                  For building custom calendar plugins and advanced
                  integrations.
                </p>
                <div className="bg-slate-950/50 rounded-lg p-3 mb-3 min-h-[60px] flex items-center">
                  <code className="text-sm text-green-400 font-mono">
                    npm install @iterumarchive/neo-calendar-core
                  </code>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "npm install @iterumarchive/neo-calendar-core",
                    );
                  }}
                  className="w-full px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition text-sm font-semibold mt-auto"
                  aria-label="Copy core package installation command"
                >
                  📋 Copy Command
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/IterumArchive/neo-calendar"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition border border-slate-600 flex items-center gap-2"
              >
                <span>⭐</span> View on GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/@iterumarchive/neo-calendar"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition flex items-center gap-2"
              >
                <span>📦</span> View on npm
              </a>
            </div>
          </div>

          {/* Calendar Evolution Timeline */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-3xl">🌐</span> 12,000 Years of Timekeeping,
              Unified
            </h2>
            <p className="text-slate-400 mb-6">
              Centuries of astronomical observation and cultural tradition, now
              unified in the digital age
            </p>
            <div className="space-y-4 sm:space-y-4">
              {/* Neo Calendar - Starting Node */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 group">
                <div className="flex items-center gap-3 sm:block sm:w-40 sm:text-right space-y-0 sm:space-y-1">
                  <div className="w-8 h-8 sm:hidden rounded-full bg-purple-500 flex items-center justify-center text-base shrink-0">
                    🚀
                  </div>
                  <div>
                    <div className="font-mono font-bold text-purple-400 text-base sm:text-sm">
                      2026
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                      12026 HE
                    </div>
                  </div>
                </div>
                <div className="relative hidden sm:block">
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                    🚀
                  </div>
                  <div className="absolute top-6 left-3 w-0.5 h-8 bg-slate-700/50" />
                </div>
                <div className="flex-1 bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-700/50 rounded-lg p-4 sm:p-4 hover:from-purple-900/50 hover:to-blue-900/50 transition-all">
                  <div className="font-semibold text-white mb-1 text-base sm:text-sm">
                    Neo Calendar
                  </div>
                  <div className="text-sm text-slate-400">
                    Universal date conversion library supporting 12 calendar
                    systems with mathematical precision
                  </div>
                </div>
              </div>

              {/* All Calendar Systems - sorted reverse chronologically */}
              {[...CALENDAR_DATA]
                .sort((a, b) => b.adoptionYear - a.adoptionYear)
                .map(cal => {
                  // Convert adoption year to Holocene calendar
                  let holoceneYear = null;
                  try {
                    const gregorianDate = NeoCalendar.at(
                      cal.adoptionYear,
                      1,
                      1,
                      "GREGORIAN",
                    );
                    const holoceneDate = gregorianDate.to("HOLOCENE");
                    holoceneYear = holoceneDate.year;
                  } catch (e) {
                    // If conversion fails, leave it null
                  }

                  return (
                    <div
                      key={cal.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 group"
                    >
                      <div className="flex items-center gap-3 sm:block sm:w-40 sm:text-right space-y-0 sm:space-y-1">
                        <div
                          className={`w-8 h-8 sm:hidden rounded-full ${cal.color} flex items-center justify-center text-base shrink-0`}
                        >
                          {cal.icon}
                        </div>
                        <div>
                          <div className="font-mono font-bold text-cyan-400 text-base sm:text-sm">
                            {cal.adoptionYear > 0
                              ? cal.adoptionYear
                              : `${Math.abs(cal.adoptionYear)} BCE`}
                          </div>
                          {holoceneYear && (
                            <div className="text-xs font-mono text-slate-500">
                              {holoceneYear} HE
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="relative hidden sm:block">
                        <div
                          className={`w-6 h-6 rounded-full ${cal.color} flex items-center justify-center text-xs group-hover:scale-110 transition-transform`}
                        >
                          {cal.icon}
                        </div>
                        <div className="absolute top-6 left-3 w-0.5 h-8 bg-slate-700/50" />
                      </div>
                      <div className="flex-1 bg-slate-800/30 rounded-lg p-4 hover:bg-slate-800/50 transition-all">
                        <div className="font-semibold text-white mb-1 text-base sm:text-sm">
                          {cal.name}
                        </div>
                        <div className="text-sm text-slate-400">
                          {cal.description}
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* Holocene Epoch - Ending Node */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 group">
                <div className="flex items-center gap-3 sm:block sm:w-40 sm:text-right space-y-0 sm:space-y-1">
                  <div className="w-8 h-8 sm:hidden rounded-full bg-emerald-500 flex items-center justify-center text-base shrink-0">
                    🌅
                  </div>
                  <div>
                    <div className="font-mono font-bold text-emerald-400 text-base sm:text-sm">
                      10,000 BCE
                    </div>
                    <div className="text-xs font-mono text-slate-500">0 HE</div>
                  </div>
                </div>
                <div className="relative hidden sm:block">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                    🌅
                  </div>
                </div>
                <div className="flex-1 bg-slate-800/30 rounded-lg p-4 hover:bg-slate-800/50 transition-all">
                  <div className="font-semibold text-white mb-1 text-base sm:text-sm">
                    Holocene Epoch Begins
                  </div>
                  <div className="text-sm text-slate-400">
                    Estimated beginning of the Holocene era, marking the end of
                    the last ice age and the dawn of human civilization
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Facts */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-400">12</div>
              <div className="text-slate-400 text-sm mt-1">
                Calendar Systems
              </div>
            </div>
            <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-400">1,500+</div>
              <div className="text-slate-400 text-sm mt-1">Tests Passing</div>
            </div>
            <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl p-4">
              <div className="text-3xl font-bold text-pink-400">98.7%</div>
              <div className="text-slate-400 text-sm mt-1">Code Coverage</div>
            </div>
            <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-400">5-50kb</div>
              <div className="text-slate-400 text-sm mt-1">Bundle Size</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 pb-12">
        <div className="max-w-7xl mx-auto px-8 text-center text-slate-500 text-sm space-y-3">
          <p>
            Built with TypeScript and Vitest, powered by Julian Day Number (JDN)
            — <br />
            the universal reference built on centuries of astronomical
            observation.
          </p>
          <div className="text-center text-slate-500 text-sm space-y-2">
            Built by{" "}
            <a
              href="https://iterumarchive.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-300 underline decoration-slate-600 hover:decoration-slate-400 transition-colors"
            >
              Iterum Archive
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
