"use client";

import { useState } from "react";
import { NeoCalendar } from "@iterumarchive/neo-calendar-full";
import { Navigation } from "../components/Navigation";

export default function ArithmeticPage() {
  // Demo 1: Cross-calendar synchronization
  const [syncDemo, setSyncDemo] = useState<{
    jdn: string;
    calendars: Array<{ name: string; date: string; color: string }>;
  } | null>(null);

  // Demo 2: Adding 1 year across calendars
  const [yearDemo, setYearDemo] = useState<{
    base: string;
    results: Array<{
      calendar: string;
      after: string;
      daysDiff: number;
      color: string;
    }>;
  } | null>(null);

  // Demo 3: Leap year handling
  const [leapDemo, setLeapDemo] = useState<{
    calendars: Array<{
      name: string;
      before: string;
      after: string;
      handling: string;
      color: string;
    }>;
  } | null>(null);

  // Demo 4: Historical calendar transition
  const [historicalDemo, setHistoricalDemo] = useState<{
    julian: string;
    gregorian: string;
    daysMissing: number;
    explanation: string;
  } | null>(null);

  // Demo 5: Lunisolar calendar complexity
  const [lunarDemo, setLunarDemo] = useState<{
    hebrew: {
      before: string;
      after: string;
      monthsAdded: number;
      isLeap: string;
    };
    islamic: { before: string; after: string; monthsAdded: number };
    gregorian: { before: string; after: string; monthsAdded: number };
    comparison: string;
  } | null>(null);

  const handleSyncDemo = () => {
    try {
      const date = NeoCalendar.at(2024, 3, 18, "GREGORIAN");

      const calendars = [
        {
          id: "GREGORIAN",
          name: "Gregorian",
          color: "bg-blue-500",
        },
        { id: "JULIAN", name: "Julian", color: "bg-purple-500" },
        { id: "HEBREW", name: "Hebrew", color: "bg-cyan-500" },
        { id: "ISLAMIC_CIVIL", name: "Islamic Civil", color: "bg-emerald-500" },
        {
          id: "PERSIAN_ALGORITHMIC",
          name: "Persian",
          color: "bg-rose-500",
        },
        { id: "HOLOCENE", name: "Holocene", color: "bg-green-500" },
        { id: "COPTIC", name: "Coptic", color: "bg-amber-500" },
      ];

      const results = calendars.map(({ id, name, color }) => ({
        name,
        date: date.as(id as any).display,
        color,
      }));

      setSyncDemo({
        jdn: date.jdn.toString(),
        calendars: results,
      });
    } catch (error) {
      console.error("Sync demo failed:", error);
    }
  };

  const handleYearDemo = () => {
    try {
      const baseDate = NeoCalendar.at(2024, 1, 1, "GREGORIAN");
      const baseJDN = baseDate.jdn;

      const calendars = [
        {
          id: "GREGORIAN",
          name: "Gregorian",
          color: "bg-blue-500",
        },
        { id: "ISLAMIC_CIVIL", name: "Islamic", color: "bg-emerald-500" },
        { id: "HEBREW", name: "Hebrew", color: "bg-cyan-500" },
        {
          id: "PERSIAN_ALGORITHMIC",
          name: "Persian",
          color: "bg-rose-500",
        },
        { id: "JULIAN", name: "Julian", color: "bg-purple-500" },
      ];

      const results = calendars.map(({ id, name, color }) => {
        const inCalendar = baseDate.as(id as any);
        const afterOneYear = inCalendar.add(1, "year");

        // Calculate actual JDN difference
        const daysDiff = Number(afterOneYear.jdn - baseJDN);

        // Convert result back to Gregorian for display
        const resultInGregorian = afterOneYear.to("GREGORIAN");

        return {
          calendar: name,
          after: resultInGregorian.display,
          daysDiff,
          color,
        };
      });

      setYearDemo({
        base: baseDate.display,
        results,
      });
    } catch (error) {
      console.error("Year demo failed:", error);
    }
  };

  const handleLeapDemo = () => {
    try {
      // Start with ONE moment in time: Gregorian Feb 29, 2024
      const gregorianLeapDay = NeoCalendar.at(2024, 2, 29, "GREGORIAN");

      // Convert that SAME moment to other calendars (demonstrates simultaneity)
      const julianEquivalent = gregorianLeapDay.to("JULIAN");
      const copticEquivalent = gregorianLeapDay.to("COPTIC");

      const calendars = [
        {
          id: "GREGORIAN",
          name: "Gregorian",
          color: "bg-blue-500",
          leapDate: gregorianLeapDay,
        },
        {
          id: "JULIAN",
          name: "Julian",
          color: "bg-purple-500",
          leapDate: julianEquivalent, // Same JDN, different date representation
        },
        {
          id: "COPTIC",
          name: "Coptic",
          color: "bg-amber-500",
          leapDate: copticEquivalent, // Same JDN, different date representation
        },
      ];

      const results = calendars.map(({ id, name, color, leapDate }) => {
        const afterOneYear = leapDate.add(1, "year");

        let handling = "";
        if (
          id === "GREGORIAN" &&
          afterOneYear.day === 28 &&
          afterOneYear.month === 2
        ) {
          handling = "Snapped to last valid day (Feb 28)";
        } else if (id === "JULIAN" && leapDate.day !== 29) {
          handling = `No snapping needed (regular day in Julian)`;
        } else if (afterOneYear.day === 29 && afterOneYear.month === 2) {
          handling = "Stayed on Feb 29 (still leap year)";
        } else if (
          id === "COPTIC" &&
          afterOneYear.month === 13 &&
          afterOneYear.day &&
          leapDate.day &&
          afterOneYear.day < leapDate.day
        ) {
          handling = `Snapped to day ${afterOneYear.day} (non-leap year)`;
        } else {
          handling = `Day ${afterOneYear.day ?? "unknown"} in the following year`;
        }

        return {
          name,
          before: leapDate.display,
          after: afterOneYear.display,
          handling,
          color,
          jdn: leapDate.jdn.toString(),
        };
      });

      setLeapDemo({
        calendars: results,
        sharedJDN: gregorianLeapDay.jdn.toString(),
      });
    } catch (error) {
      console.error("Leap demo failed:", error);
    }
  };

  const handleHistoricalDemo = () => {
    try {
      const oct4Julian = NeoCalendar.at(1582, 10, 4, "JULIAN");
      const nextDay = oct4Julian.add(1, "day");
      const asGregorian = nextDay.to("GREGORIAN");

      setHistoricalDemo({
        julian: oct4Julian.display,
        gregorian: asGregorian.display,
        daysMissing: 10,
        explanation:
          "The Gregorian Reform: 10 days were 'skipped' to realign the calendar with the solar year.",
      });
    } catch (error) {
      console.error("Historical demo failed:", error);
    }
  };

  const handleLunarDemo = () => {
    try {
      const startDate = NeoCalendar.at(5784, 1, 1, "HEBREW");

      const hebrew = startDate;
      const hebrewAfter = hebrew.add(6, "month");
      const monthsInYear = 13;

      const asGregorian = startDate.to("GREGORIAN");
      const gregorianAfter = asGregorian.add(6, "month");

      const asIslamic = startDate.to("ISLAMIC_CIVIL");
      const islamicAfter = asIslamic.add(6, "month");

      const hebrewDays = Math.abs(hebrew.diff(hebrewAfter).days);
      const gregorianDays = Math.abs(asGregorian.diff(gregorianAfter).days);
      const islamicDays = Math.abs(asIslamic.diff(islamicAfter).days);

      setLunarDemo({
        hebrew: {
          before: hebrew.display,
          after: hebrewAfter.display,
          monthsAdded: 6,
          isLeap: `Leap year (${monthsInYear} months) - ${hebrewDays} days`,
        },
        islamic: {
          before: asIslamic.display,
          after: islamicAfter.display,
          monthsAdded: 6,
        },
        gregorian: {
          before: asGregorian.display,
          after: gregorianAfter.display,
          monthsAdded: 6,
        },
        comparison: `Hebrew: ${hebrewDays}d | Islamic: ${islamicDays}d | Gregorian: ${gregorianDays}d`,
      });
    } catch (error) {
      console.error("Lunar demo failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      <Navigation />
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Cross-Calendar Intelligence
          </h1>
          <p className="text-xl text-slate-300">
            The magic of seamless interoperability: One moment, seven
            civilizations
          </p>
        </div>

        {/* THE MAGIC: Cross-Calendar Synchronization */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-700/50 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">✨</span>
            <div>
              <h2 className="text-3xl font-bold text-white">
                The Magic: Zero-Drift Synchronization
              </h2>
              <p className="text-indigo-200 text-sm mt-1">
                Watch the same moment in time expressed across 7 different
                calendar systems - with perfect mathematical accuracy
              </p>
            </div>
          </div>

          <button
            onClick={handleSyncDemo}
            className="w-full px-6 py-4 bg-white text-indigo-700 font-bold text-lg rounded-xl hover:bg-indigo-50 transition shadow-lg mb-6"
          >
            🎯 Show Me: March 18, 2024 Across All Calendars
          </button>

          {syncDemo && (
            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/20">
                <p className="text-xs text-indigo-200 mb-1">
                  Universal Anchor Point
                </p>
                <p className="font-mono text-lg font-bold text-white">
                  JDN {syncDemo.jdn}
                </p>
                <p className="text-xs text-indigo-200 mt-1">
                  This single number represents the same instant across all
                  human timekeeping systems
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {syncDemo.calendars.map((cal, idx) => (
                  <div
                    key={idx}
                    className="bg-white/95 rounded-lg p-4 text-slate-900"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 ${cal.color} text-white text-xs font-bold rounded`}
                      >
                        {cal.name}
                      </span>
                      <span className="font-mono text-sm font-semibold">
                        {cal.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-lg p-4 mt-4 border border-yellow-300/30">
                <p className="text-sm font-bold text-yellow-100 mb-2">
                  🎯 The Interoperability Guarantee
                </p>
                <p className="text-sm text-white/90">
                  Convert between ANY two calendars through the JDN hub with{" "}
                  <span className="font-bold text-yellow-300">0.00% drift</span>
                  . No rounding errors, no approximations, no data loss.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Demo 1: Adding "1 Year" Means Different Things */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-white">
            🌍 "Add 1 Year" = Different Days Per Calendar
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Not all years are equal! Watch how adding "1 year" produces
            different day counts.
          </p>

          <button
            onClick={handleYearDemo}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition mb-6"
          >
            Run Demo: Add 1 Year to Jan 1, 2024
          </button>

          {yearDemo && (
            <div>
              <div className="p-4 bg-slate-800/50 rounded-lg mb-4">
                <p className="text-sm font-semibold text-white">
                  Starting Date: {yearDemo.base}
                </p>
              </div>

              <div className="space-y-3">
                {yearDemo.results.map((result, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span
                          className={`inline-block px-3 py-1 ${result.color} text-white text-xs font-bold rounded mr-3`}
                        >
                          {result.calendar}
                        </span>
                        <span className="text-sm text-white">
                          {result.after}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-400">
                          {result.daysDiff} days
                        </div>
                        <div className="text-xs text-slate-400">
                          actual duration
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
                <p className="text-sm font-semibold text-yellow-400">
                  💡 Key Insight
                </p>
                <p className="text-sm text-slate-300 mt-1">
                  Islamic calendar: ~354 days/year (lunar) | Gregorian: ~365.25
                  days/year (solar). The API respects each calendar&apos;s rules
                  automatically!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Demo 2: Leap Year Handling */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-white">
            📅 Intelligent Leap Year Handling
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Starting from the same moment in time (Gregorian Feb 29, 2024), see
            how adding 1 year behaves differently across calendar systems.
          </p>

          <button
            onClick={handleLeapDemo}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition mb-6"
          >
            Run Demo: Leap Day + 1 Year (Simultaneity)
          </button>

          {leapDemo && (
            <div className="space-y-3">
              {/* Simultaneity Badge */}
              <div className="p-3 bg-indigo-900/20 border border-indigo-700/30 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 bg-indigo-900/40 border border-indigo-600/40 rounded font-mono text-indigo-300 text-xs font-semibold">
                    JDN {leapDemo.sharedJDN}
                  </span>
                  <span className="text-slate-400">
                    ← All dates represent this same moment in time
                  </span>
                </div>
              </div>

              {leapDemo.calendars.map((cal, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <span
                        className={`inline-block px-3 py-1 ${cal.color} text-white text-xs font-bold rounded mb-2`}
                      >
                        {cal.name}
                      </span>
                      <div className="text-sm space-y-1 text-white">
                        <div>
                          <span className="font-semibold">Before:</span>{" "}
                          {cal.before}
                        </div>
                        <div>
                          <span className="font-semibold">After:</span>{" "}
                          {cal.after}
                        </div>
                        <div className="text-xs text-green-400 font-medium mt-2">
                          ✓ {cal.handling}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 p-4 bg-blue-900/20 border-l-4 border-blue-500 rounded">
                <p className="text-sm font-semibold text-blue-400">
                  💡 Smart Overflow Handling
                </p>
                <p className="text-sm text-slate-300 mt-1">
                  The API automatically "snaps" invalid dates to the last valid
                  day. No crashes, no errors!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Demo 3: Historical Calendar Transition */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-white">
            ⏳ The Gregorian Calendar Reform (1582)
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            When Europe switched from Julian to Gregorian, 10 days vanished from
            the calendar.
          </p>

          <button
            onClick={handleHistoricalDemo}
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-medium rounded-lg hover:from-orange-700 hover:to-red-700 transition mb-6"
          >
            Run Demo: October 1582 Transition
          </button>

          {historicalDemo && (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-purple-900/20 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Julian Calendar</p>
                  <p className="text-lg font-bold text-white">
                    October 4, 1582
                  </p>
                </div>
                <div className="p-4 bg-blue-900/20 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">
                    Next Day (Gregorian)
                  </p>
                  <p className="text-lg font-bold text-white">
                    October 15, 1582
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg border-2 border-red-700/50">
                <p className="text-2xl font-bold text-center text-red-400 mb-2">
                  {historicalDemo.daysMissing} Days "Missing"
                </p>
                <p className="text-sm text-center text-slate-300">
                  {historicalDemo.explanation}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Demo 4: Lunisolar Calendar Complexity */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-2 text-white">
            🌙 Lunisolar Calendar: Hebrew Leap Years
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Hebrew calendar has 13 months in leap years. Watch how "add 6
            months" differs across calendars.
          </p>

          <button
            onClick={handleLunarDemo}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-medium rounded-lg hover:from-cyan-700 hover:to-teal-700 transition mb-6"
          >
            Run Demo: Add 6 Months in Leap Year
          </button>

          {lunarDemo && (
            <div className="space-y-4">
              <div className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-700/50">
                <div className="flex items-center mb-2">
                  <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-bold rounded mr-3">
                    Hebrew
                  </span>
                  <span className="text-xs text-cyan-400 font-semibold">
                    {lunarDemo.hebrew.isLeap}
                  </span>
                </div>
                <div className="text-sm space-y-1 text-white">
                  <div>
                    <span className="font-semibold">Before:</span>{" "}
                    {lunarDemo.hebrew.before}
                  </div>
                  <div>
                    <span className="font-semibold">After:</span>{" "}
                    {lunarDemo.hebrew.after}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-900/20 rounded-lg border border-emerald-700/50">
                <div className="flex items-center mb-2">
                  <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded">
                    Islamic
                  </span>
                </div>
                <div className="text-sm space-y-1 text-white">
                  <div>
                    <span className="font-semibold">Before:</span>{" "}
                    {lunarDemo.islamic.before}
                  </div>
                  <div>
                    <span className="font-semibold">After:</span>{" "}
                    {lunarDemo.islamic.after}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-700/50">
                <div className="flex items-center mb-2">
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded">
                    Gregorian
                  </span>
                </div>
                <div className="text-sm space-y-1 text-white">
                  <div>
                    <span className="font-semibold">Before:</span>{" "}
                    {lunarDemo.gregorian.before}
                  </div>
                  <div>
                    <span className="font-semibold">After:</span>{" "}
                    {lunarDemo.gregorian.after}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-cyan-900/20 to-teal-900/20 rounded-lg border-2 border-cyan-700/50">
                <p className="text-sm font-semibold text-cyan-400 mb-2">
                  📊 Duration Comparison
                </p>
                <p className="text-lg font-mono font-bold text-white">
                  {lunarDemo.comparison}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Same "6 months" operation, different actual durations!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
