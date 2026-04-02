"use client";

import { useState, useEffect } from "react";
import { NeoCalendar } from "@iterumarchive/neo-calendar-full";
import { Navigation } from "../components/Navigation";

type CalendarOption = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

const CALENDARS: CalendarOption[] = [
  { id: "GREGORIAN", name: "Gregorian", icon: "🌍", color: "bg-blue-500" },
  { id: "JULIAN", name: "Julian", icon: "🏛️", color: "bg-purple-500" },
  { id: "HOLOCENE", name: "Holocene", icon: "📅", color: "bg-green-500" },
  { id: "COPTIC", name: "Coptic", icon: "✝️", color: "bg-amber-500" },
  { id: "ETHIOPIAN", name: "Ethiopian", icon: "🇪🇹", color: "bg-orange-500" },
  {
    id: "PERSIAN_ALGORITHMIC",
    name: "Persian",
    icon: "🌸",
    color: "bg-rose-500",
  },
  { id: "HEBREW", name: "Hebrew", icon: "✡️", color: "bg-cyan-500" },
  {
    id: "ISLAMIC_CIVIL",
    name: "Islamic Civil",
    icon: "☪️",
    color: "bg-emerald-500",
  },
  { id: "MAYAN_LONG_COUNT", name: "Mayan", icon: "🗿", color: "bg-stone-500" },
  {
    id: "FRENCH_REVOLUTIONARY",
    name: "French Republican",
    icon: "🇫🇷",
    color: "bg-indigo-500",
  },
  { id: "UNIX", name: "Unix Time", icon: "💻", color: "bg-slate-500" },
  { id: "BP", name: "Before Present", icon: "🦴", color: "bg-lime-500" },
];

type ConversionResult = {
  calendar: CalendarOption;
  display: string;
  jdn: string;
  error?: string;
};

export default function ConverterPage() {
  // Source inputs
  const [sourceCalendar, setSourceCalendar] = useState("GREGORIAN");
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(3);
  const [day, setDay] = useState(25);

  // Target calendars
  const [selectedTargets, setSelectedTargets] = useState<Set<string>>(
    new Set(["GREGORIAN", "JULIAN", "HOLOCENE", "COPTIC"]),
  );

  // Results
  const [results, setResults] = useState<ConversionResult[]>([]);
  const [sourceJdn, setSourceJdn] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Auto-convert on input change
  useEffect(() => {
    handleConvert();
  }, [sourceCalendar, year, month, day, selectedTargets]);

  const handleConvert = () => {
    try {
      setError("");

      // Create source date
      const sourceDate = NeoCalendar.at(
        year,
        month,
        day,
        sourceCalendar as any,
      );

      setSourceJdn(String(sourceDate.jdn));

      // Convert to all selected targets
      const conversions: ConversionResult[] = [];

      selectedTargets.forEach(targetId => {
        const calendar = CALENDARS.find(c => c.id === targetId);
        if (!calendar) return;

        try {
          const converted: any = sourceDate.to(targetId as any);

          // Format the date for better clarity
          let displayText = converted?.display || String(converted);

          // Only reformat calendars with standard year/month/day structure
          // Skip special calendars like Mayan Long Count, Unix, Before Present
          const skipFormatting = ["MAYAN_LONG_COUNT", "UNIX", "BP"].includes(
            targetId,
          );

          // If it has year, month, day properties and should be reformatted
          if (
            !skipFormatting &&
            converted?.year !== undefined &&
            converted?.month !== undefined &&
            converted?.day !== undefined
          ) {
            const y = String(converted.year).padStart(4, "0");
            const m = String(converted.month).padStart(2, "0");
            const d = String(converted.day).padStart(2, "0");
            displayText = `${y}-${m}-${d}`;

            // Add era suffix if it exists in original display
            if (converted.display?.includes(" AD")) displayText += " AD";
            if (converted.display?.includes(" BCE")) displayText += " BCE";
            if (converted.display?.includes(" AH")) displayText += " AH";
          }

          conversions.push({
            calendar,
            display: displayText,
            jdn: converted?.jdn ? String(converted.jdn) : "",
          });
        } catch (err) {
          conversions.push({
            calendar,
            display: "",
            jdn: "",
            error: "Conversion error",
          });
        }
      });

      setResults(conversions);
    } catch (err) {
      setError("Invalid date or calendar configuration");
      setResults([]);
    }
  };

  const toggleTarget = (calendarId: string) => {
    const newTargets = new Set(selectedTargets);
    if (newTargets.has(calendarId)) {
      newTargets.delete(calendarId);
    } else {
      newTargets.add(calendarId);
    }
    setSelectedTargets(newTargets);
  };

  const selectAllTargets = () => {
    setSelectedTargets(new Set(CALENDARS.map(c => c.id)));
  };

  const clearAllTargets = () => {
    setSelectedTargets(new Set());
  };

  const copyResults = () => {
    const text = results
      .map(r => `${r.calendar.name}: ${r.display}`)
      .join("\n");
    navigator.clipboard.writeText(text);
  };

  const exportJSON = () => {
    const data = {
      source: {
        calendar: sourceCalendar,
        year,
        month,
        day,
        jdn: sourceJdn,
      },
      results: results.map(r => ({
        calendar: r.calendar.id,
        display: r.display,
        jdn: r.jdn,
      })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `calendar-conversion-${Date.now()}.json`;
    a.click();
  };

  const formatDate = (
    y: number,
    m: number,
    d: number,
    format: string,
  ): string => {
    const pad = (n: number) => String(n).padStart(2, "0");
    switch (format) {
      case "DD/MM/YYYY":
        return `${pad(d)}/${pad(m)}/${y}`;
      case "MM/DD/YYYY":
        return `${pad(m)}/${pad(d)}/${y}`;
      case "YYYY-MM-DD":
        return `${y}-${pad(m)}-${pad(d)}`;
      case "ISO 8601":
        return `${y}-${pad(m)}-${pad(d)}T00:00:00Z`;
      case "Numeric":
        return `${y}${pad(m)}${pad(d)}`;
      default:
        return `${y}-${pad(m)}-${pad(d)}`;
    }
  };

  const sourceCalendarObj = CALENDARS.find(c => c.id === sourceCalendar);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      <Navigation />

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Universal Date Converter
            </h1>
            <p className="text-xl text-slate-300">
              Convert dates between 12 calendar systems using mathematical
              precision
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Source Panel */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 sm:p-6 sticky top-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">📥</span> Source Date
                </h2>

                {/* Calendar Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Calendar System
                  </label>
                  <select
                    value={sourceCalendar}
                    onChange={e => setSourceCalendar(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    {CALENDARS.map(cal => (
                      <option key={cal.id} value={cal.id}>
                        {cal.icon} {cal.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Inputs */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      value={year}
                      onChange={e => setYear(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Month
                    </label>
                    <input
                      type="number"
                      value={month}
                      onChange={e => setMonth(parseInt(e.target.value) || 1)}
                      min="1"
                      max="13"
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Day
                    </label>
                    <input
                      type="number"
                      value={day}
                      onChange={e => setDay(parseInt(e.target.value) || 1)}
                      min="1"
                      max="31"
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono"
                    />
                  </div>
                </div>

                {/* Source Display */}
                {sourceCalendarObj && !error && (
                  <div
                    className={`p-4 bg-gradient-to-br ${sourceCalendarObj.color}/20 border border-slate-700/50 rounded-lg mb-6`}
                  >
                    <div className="text-xs text-slate-400 mb-1">
                      {sourceCalendarObj.icon} {sourceCalendarObj.name}
                    </div>
                    <div className="text-base sm:text-lg font-mono font-bold text-white break-all">
                      {year.toString().padStart(4, "0")}-
                      {month.toString().padStart(2, "0")}-
                      {day.toString().padStart(2, "0")}
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-lg mb-6">
                    <div className="text-red-400 text-sm">{error}</div>
                  </div>
                )}

                {/* JDN Display */}
                {sourceJdn && (
                  <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                    <div className="text-xs text-purple-300 mb-1">
                      Julian Day Number (JDN)
                    </div>
                    <div className="text-lg sm:text-xl font-mono font-bold text-purple-200 break-all">
                      {sourceJdn}
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                      The universal reference point for all calendar conversions
                    </div>
                  </div>
                )}

                {/* Quick Dates */}
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Quick Select
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        const now = new Date();
                        setYear(now.getFullYear());
                        setMonth(now.getMonth() + 1);
                        setDay(now.getDate());
                        setSourceCalendar("GREGORIAN");
                      }}
                      className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-white text-sm transition"
                    >
                      Today
                    </button>
                    <button
                      onClick={() => {
                        setYear(1955);
                        setMonth(11);
                        setDay(5);
                        setSourceCalendar("GREGORIAN");
                      }}
                      className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-white text-sm transition"
                    >
                      Nov 5, 1955 ⚡🏛️
                    </button>
                    <button
                      onClick={() => {
                        setYear(1776);
                        setMonth(7);
                        setDay(4);
                        setSourceCalendar("GREGORIAN");
                      }}
                      className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-white text-sm transition"
                    >
                      Declaration of Independence 🇺🇸
                    </button>
                    <button
                      onClick={() => {
                        setYear(1);
                        setMonth(12);
                        setDay(25);
                        setSourceCalendar("GREGORIAN");
                      }}
                      className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-white text-sm transition"
                    >
                      First Christmas 🎄
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Panel */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-2xl">📤</span> Convert To
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={selectAllTargets}
                      className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-white text-sm transition"
                      aria-label="Select all calendar systems for conversion"
                    >
                      Select All
                    </button>
                    <button
                      onClick={clearAllTargets}
                      className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-white text-sm transition"
                      aria-label="Clear all selected calendar systems"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Calendar Selection Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                  {CALENDARS.map(cal => (
                    <button
                      key={cal.id}
                      onClick={() => toggleTarget(cal.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        selectedTargets.has(cal.id)
                          ? `${cal.color} border-white/30 shadow-lg`
                          : "bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{cal.icon}</div>
                      <div className="text-xs font-semibold text-white">
                        {cal.name}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Results */}
                {results.length > 0 && (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        Results ({results.length})
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={copyResults}
                          className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-700/50 rounded-lg text-blue-300 text-sm transition"
                        >
                          📋 Copy
                        </button>
                        <button
                          onClick={exportJSON}
                          className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-700/50 rounded-lg text-purple-300 text-sm transition"
                        >
                          💾 Export JSON
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      {results.map((result, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-slate-600/50 transition"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">
                                {result.calendar.icon}
                              </span>
                              <div>
                                <div className="text-sm font-semibold text-slate-300">
                                  {result.calendar.name}
                                </div>
                                {result.error ? (
                                  <div className="text-red-400 text-xs">
                                    {result.error}
                                  </div>
                                ) : (
                                  <div className="text-base sm:text-lg md:text-xl font-mono font-bold text-white break-all">
                                    {result.display}
                                  </div>
                                )}
                              </div>
                            </div>
                            {!result.error && result.jdn && (
                              <div className="text-right">
                                <div className="text-xs text-slate-500">
                                  JDN
                                </div>
                                <div className="text-sm font-mono text-slate-400">
                                  {result.jdn}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {results.length === 0 && selectedTargets.size > 0 && (
                  <div className="text-center py-12 text-slate-400">
                    <div className="text-4xl mb-3">🎯</div>
                    <p>Select target calendars to see conversions</p>
                  </div>
                )}

                {selectedTargets.size === 0 && (
                  <div className="text-center py-12 text-slate-400">
                    <div className="text-4xl mb-3">👆</div>
                    <p>Select target calendars above to begin</p>
                  </div>
                )}
              </div>

              {/* Educational Note */}
              <div className="mt-6 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">
                  🎯 How It Works: Hub-and-Spoke Architecture
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  All calendar conversions go through the{" "}
                  <span className="font-semibold text-purple-300">
                    Julian Day Number (JDN)
                  </span>{" "}
                  - a universal astronomical reference system that acts as a
                  single invariant for all calendar transformations. This
                  architecture ensures:
                </p>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>
                      <span className="font-semibold">0-Day Error</span> -
                      Formally validated reversibility across 1,500+ test cases
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>
                      <span className="font-semibold">
                        Universal compatibility
                      </span>{" "}
                      - Any calendar to any calendar through JDN
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>
                      <span className="font-semibold">
                        Algorithmic precision
                      </span>{" "}
                      - Published formulas verified against authoritative
                      sources
                    </span>
                  </li>
                </ul>

                <div className="mt-4 pt-4 border-t border-cyan-700/30">
                  <h4 className="text-sm font-semibold text-cyan-300 mb-2">
                    📐 Proleptic Extension & Year Zero
                  </h4>
                  <p className="text-xs text-slate-300 mb-2">
                    All calendars use{" "}
                    <strong className="text-purple-300">
                      proleptic extension
                    </strong>{" "}
                    — mathematical projection beyond their historical usage
                    periods. For example, the Gregorian calendar (adopted 1582)
                    extends infinitely backward using the same leap year rules.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-950/50 rounded p-2">
                      <p className="font-semibold text-blue-300 mb-1">
                        Internal (Astronomical)
                      </p>
                      <p className="text-slate-400">
                        Includes year 0 for continuous math
                      </p>
                      <p className="font-mono text-slate-500 mt-1">
                        -2, -1, 0, 1, 2
                      </p>
                    </div>
                    <div className="bg-slate-950/50 rounded p-2">
                      <p className="font-semibold text-emerald-300 mb-1">
                        Display (Historical)
                      </p>
                      <p className="text-slate-400">
                        Shows familiar BCE/CE notation
                      </p>
                      <p className="font-mono text-slate-500 mt-1">
                        2 BCE, 1 BCE, 1 CE
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    This prevents off-by-one errors in deep time calculations
                    while preserving familiar historical notation.
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-cyan-700/30">
                  <p className="text-xs text-slate-400">
                    <strong className="text-blue-300">Beta Software:</strong>{" "}
                    While rigorously tested against published algorithms,
                    NeoCalendar is in active development. We recommend
                    additional validation before use in mission-critical
                    production systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
