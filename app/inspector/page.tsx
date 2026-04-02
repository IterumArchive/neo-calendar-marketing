"use client";

import { useState, useEffect } from "react";
import { NeoCalendar } from "@iterumarchive/neo-calendar-full";
import { Navigation } from "../components/Navigation";

const CALENDARS = [
  { id: "GREGORIAN", name: "Gregorian", icon: "🌍", color: "bg-blue-500" },
  { id: "JULIAN", name: "Julian", icon: "🏛️", color: "bg-purple-500" },
  { id: "HOLOCENE", name: "Holocene", icon: "📅", color: "bg-green-500" },
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
  { id: "COPTIC", name: "Coptic", icon: "✝️", color: "bg-amber-500" },
  { id: "ETHIOPIAN", name: "Ethiopian", icon: "🇪🇹", color: "bg-orange-500" },
  { id: "MAYAN_LONG_COUNT", name: "Mayan", icon: "🗿", color: "bg-stone-500" },
  {
    id: "FRENCH_REVOLUTIONARY",
    name: "French Republican",
    icon: "🇫🇷",
    color: "bg-indigo-500",
  },
  { id: "UNIX", name: "Unix Time", icon: "💻", color: "bg-slate-500" },
  { id: "BP", name: "Before Present", icon: "🦴", color: "bg-lime-500" },
] as const;

export default function InspectorPage() {
  const [jdnInput, setJdnInput] = useState("2461127");
  const [jdnResults, setJdnResults] = useState<Record<string, string>>({});
  const [jdnMetadata, setJdnMetadata] = useState<any>(null);

  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(3);
  const [day, setDay] = useState(25);
  const [calendar, setCalendar] = useState("GREGORIAN");
  const [dateJdn, setDateJdn] = useState<string>("");
  const [dateMetadata, setDateMetadata] = useState<any>(null);

  const [copied, setCopied] = useState(false);

  // Load from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const jdnParam = params.get("jdn");
    if (jdnParam) {
      setJdnInput(jdnParam);
      setTimeout(() => handleJdnLookup(), 100);
    }
  }, []);

  const handleJdnLookup = () => {
    try {
      const jdn = BigInt(jdnInput) as never;
      const results: Record<string, string> = {};

      CALENDARS.forEach(({ id }) => {
        try {
          const date = NeoCalendar.fromJDN(jdn, id as any);
          results[id] = date?.display || String(date);
        } catch {
          results[id] = "Conversion error";
        }
      });

      // Get metadata from Gregorian conversion
      try {
        const gregorianDate = NeoCalendar.fromJDN(jdn, "GREGORIAN" as any);
        setJdnMetadata(gregorianDate);
      } catch {
        setJdnMetadata(null);
      }

      setJdnResults(results);

      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.set("jdn", jdnInput);
      window.history.pushState({}, "", url);
    } catch (error) {
      console.error("Invalid JDN:", error);
    }
  };

  const handleDateToJdn = () => {
    try {
      const date = NeoCalendar.at(year, month, day, calendar as any);
      setDateJdn(String(date.jdn));
      setDateMetadata(date);
    } catch (error) {
      console.error("Date conversion failed:", error);
      setDateJdn("Error");
      setDateMetadata(null);
    }
  };

  const copyJdnUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("jdn", jdnInput);
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyResults = () => {
    const text = Object.entries(jdnResults)
      .map(([id, date]) => {
        const cal = CALENDARS.find(c => c.id === id);
        return `${cal?.name}: ${date}`;
      })
      .join("\n");
    navigator.clipboard.writeText(`JDN ${jdnInput}:\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      <Navigation />
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            JDN Lookup
          </h1>
          <p className="text-xl text-slate-300">
            Explore Julian Day Numbers and the universal date reference system
          </p>
        </div>

        {/* Info Box */}
        <div className="mb-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
            <span>💡</span> What is a Julian Day Number?
          </h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            The Julian Day Number (JDN) is a continuous count of days since noon
            Universal Time on January 1, 4713 BCE (in the proleptic Julian
            calendar). It provides a universal reference point for all calendar
            systems.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="text-cyan-400 font-semibold mb-1">
                🌐 Universal
              </div>
              <div className="text-slate-400">
                Single reference for all calendars
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="text-blue-400 font-semibold mb-1">
                🔄 Convertible
              </div>
              <div className="text-slate-400">
                Hub-and-spoke conversion model
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="text-purple-400 font-semibold mb-1">
                ⚡ Efficient
              </div>
              <div className="text-slate-400">
                Fast arithmetic and comparisons
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* JDN to Date */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-3xl">🔍</span> JDN → Date Lookup
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Julian Day Number
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={jdnInput}
                  onChange={e => setJdnInput(e.target.value)}
                  onKeyPress={e => e.key === "Enter" && handleJdnLookup()}
                  placeholder="2461127"
                  className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-lg"
                />
                <button
                  onClick={handleJdnLookup}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-xl"
                >
                  Lookup
                </button>
              </div>
            </div>

            {Object.keys(jdnResults).length > 0 && (
              <>
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={copyJdnUrl}
                    className="flex-1 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-slate-300 text-sm transition"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy URL"}
                  </button>
                  <button
                    onClick={copyResults}
                    className="flex-1 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-slate-300 text-sm transition"
                  >
                    📤 Copy Results
                  </button>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {CALENDARS.map(({ id, name, icon, color }) => (
                    <div
                      key={id}
                      className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-slate-600/50 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{icon}</span>
                          <div>
                            <div className="text-sm font-semibold text-slate-400">
                              {name}
                            </div>
                            <div className="text-lg font-mono font-bold text-white group-hover:text-cyan-400 transition-colors">
                              {jdnResults[id]}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {jdnMetadata && (
              <div className="mt-6 bg-purple-900/20 border border-purple-700/50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-purple-300 mb-3 uppercase tracking-wider">
                  Metadata (Gregorian Reference)
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-slate-400">Day of Week:</span>
                    <div className="text-white font-semibold">
                      {jdnMetadata.dayOfWeek || "N/A"}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Day of Year:</span>
                    <div className="text-white font-semibold">
                      {jdnMetadata.dayOfYear || "N/A"}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Week of Year:</span>
                    <div className="text-white font-semibold">
                      {jdnMetadata.weekOfYear || "N/A"}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Leap Year:</span>
                    <div className="text-white font-semibold">
                      {jdnMetadata.isLeapYear ? "Yes" : "No"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Date to JDN */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-3xl">📅</span> Date → JDN Conversion
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Calendar System
              </label>
              <select
                value={calendar}
                onChange={e => setCalendar(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                {CALENDARS.map(({ id, name, icon }) => (
                  <option key={id} value={id}>
                    {icon} {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={e => setYear(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Month
                </label>
                <input
                  type="number"
                  min="1"
                  max="13"
                  value={month}
                  onChange={e => setMonth(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Day
                </label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={day}
                  onChange={e => setDay(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleDateToJdn}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-xl mb-6"
            >
              Calculate JDN
            </button>

            {dateJdn && dateJdn !== "Error" && (
              <>
                <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg p-6 border border-cyan-700/50 mb-6">
                  <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">
                    Julian Day Number
                  </div>
                  <div className="text-4xl font-mono font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                    {dateJdn}
                  </div>
                </div>

                {dateMetadata && (
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
                      Date Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Display:</span>
                        <span className="text-white font-mono">
                          {dateMetadata.display}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Era:</span>
                        <span className="text-white font-semibold">
                          {dateMetadata.era || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Calendar Type:</span>
                        <span className="text-white font-semibold">
                          {calendar}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {dateJdn === "Error" && (
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <div className="text-red-400 text-sm">
                  Invalid date for the selected calendar system
                </div>
              </div>
            )}

            {/* Quick Presets */}
            <div className="mt-8 pt-8 border-t border-slate-700/50">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Quick Examples
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setYear(2026);
                    setMonth(3);
                    setDay(25);
                    setCalendar("GREGORIAN");
                  }}
                  className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-white text-sm transition"
                >
                  Today
                </button>
                <button
                  onClick={() => {
                    setYear(0);
                    setMonth(1);
                    setDay(1);
                    setCalendar("GREGORIAN");
                  }}
                  className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-white text-sm transition"
                >
                  Year 0
                </button>
                <button
                  onClick={() => {
                    setYear(1066);
                    setMonth(10);
                    setDay(14);
                    setCalendar("JULIAN");
                  }}
                  className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-white text-sm transition"
                >
                  Hastings
                </button>
                <button
                  onClick={() => {
                    setYear(1582);
                    setMonth(10);
                    setDay(15);
                    setCalendar("GREGORIAN");
                  }}
                  className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-white text-sm transition"
                >
                  1582 Reform
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.7);
        }
      `}</style>
    </div>
  );
}
