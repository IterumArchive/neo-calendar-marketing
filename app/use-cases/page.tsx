"use client";

import { useState } from "react";
import { NeoCalendar } from "@iterumarchive/neo-calendar-full";
import { Navigation } from "../components/Navigation";

type ScenarioResult = {
  title: string;
  output: string;
  explanation: string;
};

export default function UseCasesPage() {
  const [scenario1, setScenario1] = useState<ScenarioResult | null>(null);
  const [scenario2, setScenario2] = useState<ScenarioResult | null>(null);
  const [scenario3, setScenario3] = useState<ScenarioResult | null>(null);
  const [scenario4, setScenario4] = useState<ScenarioResult | null>(null);
  const [scenario5, setScenario5] = useState<ScenarioResult | null>(null);

  const runScenario1 = () => {
    try {
      const gregorianDate = NeoCalendar.at(2026, 6, 15, "GREGORIAN");
      const hebrewDate = gregorianDate.to("HEBREW");
      const islamicDate = gregorianDate.to("ISLAMIC_CIVIL");

      setScenario1({
        title: "Multi-Cultural Wedding Invitation",
        output: `June 15, 2026\n${hebrewDate.display}\n${islamicDate.display}`,
        explanation:
          "Show respect for multiple cultural traditions by displaying the same date in different calendar systems. Perfect for interfaith events, international conferences, or multicultural celebrations.",
      });
    } catch (error) {
      console.error("Scenario 1 failed:", error);
    }
  };

  const runScenario2 = () => {
    try {
      const battleOfHastings = NeoCalendar.at(1066, 10, 14, "JULIAN");
      const jdn = battleOfHastings.jdn;
      const inModern = NeoCalendar.fromJDN(jdn, "GREGORIAN");

      setScenario2({
        title: "Historical Research Database",
        output: `Julian: ${battleOfHastings.display}\nJDN: ${jdn}\nGregorian: ${inModern.display}`,
        explanation:
          "Store dates as JDN (Julian Day Number) for perfect accuracy across calendar systems. Query historical events using a universal time coordinate. Accounts for the 7-day offset between Julian and Gregorian calendars in 1066.",
      });
    } catch (error) {
      console.error("Scenario 2 failed:", error);
    }
  };

  const runScenario3 = () => {
    try {
      // Orthodox Easter is April 20, 2026 in Gregorian
      const gregorianEaster = NeoCalendar.at(2026, 4, 20, "GREGORIAN");
      const julianEaster = gregorianEaster.to("JULIAN");

      setScenario3({
        title: "Religious Calendar App",
        output: `Orthodox Easter 2026:\nJulian: ${julianEaster.display}\nGregorian: ${gregorianEaster.display}`,
        explanation:
          "Calculate Orthodox holidays using the Julian calendar, then convert to Gregorian for modern users. The 13-day difference in 2026 shows why Orthodox and Western Easter dates differ.",
      });
    } catch (error) {
      console.error("Scenario 3 failed:", error);
    }
  };

  const runScenario4 = () => {
    try {
      const artifact = NeoCalendar.at(3450, 1, 1, "BP");
      const gregorian = artifact.to("GREGORIAN");

      setScenario4({
        title: "Archaeological Dating",
        output: `Radiocarbon Date: ${artifact.display}\nGregorian: ${gregorian.display}`,
        explanation:
          "Convert radiocarbon dates (Before Present = before 1950 CE) to standard calendar systems. Essential for archaeology, paleontology, and geological research. Enables cross-referencing with historical records.",
      });
    } catch (error) {
      console.error("Scenario 4 failed:", error);
    }
  };

  const runScenario5 = () => {
    try {
      const persianNewYear = NeoCalendar.at(1403, 1, 1, "PERSIAN_ALGORITHMIC");
      const gregorian = persianNewYear.to("GREGORIAN");
      const jdn = persianNewYear.jdn;

      setScenario5({
        title: "Time-Series Data Analytics",
        output: `Persian 1403/1/1: Nowruz\nGregorian: ${gregorian.display}\nJDN: ${jdn}\n\nSQL: WHERE jdn BETWEEN ${jdn} AND ${Number(jdn) + 365}`,
        explanation:
          "Aggregate data across calendar systems using JDN as a universal join key. Query date ranges that span different calendar systems. Perfect for financial analytics, demographic studies, or global event tracking.",
      });
    } catch (error) {
      console.error("Scenario 5 failed:", error);
    }
  };

  const scenarios = [
    {
      id: 1,
      icon: "💑",
      title: "Multi-Cultural Event App",
      problem:
        "Plan a wedding that respects both cultures - show dates in multiple calendar systems",
      code: `const date = NeoCalendar.at(2026, 6, 15, 'GREGORIAN');
const hebrew = date.to('HEBREW');
const islamic = date.to('ISLAMIC_CIVIL');

// Display: "June 15, 2026 / 19 Sivan 5786 / 19 Dhu al-Qidah 1447"`,
      run: runScenario1,
      result: scenario1,
      color: "from-pink-900/40 to-rose-800/40",
      border: "border-pink-700/50",
    },
    {
      id: 2,
      icon: "📚",
      title: "Historical Research Database",
      problem:
        "Store & query historical dates accurately using JDN as universal coordinate",
      code: `const battle = NeoCalendar.at(1066, 10, 14, 'JULIAN');
const jdn = battle.jdn; // Store in database

// Later, retrieve in any calendar
const modern = NeoCalendar.fromJDN(jdn, 'GREGORIAN');
// → October 21, 1066 (accounts for 7-day offset)`,
      run: runScenario2,
      result: scenario2,
      color: "from-blue-900/40 to-indigo-800/40",
      border: "border-blue-700/50",
    },
    {
      id: 3,
      icon: "⛪",
      title: "Religious Calendar App",
      problem:
        "Calculate Orthodox holidays using Julian calendar, convert for modern users",
      code: `const easter2026 = NeoCalendar.at(2026, 4, 20, 'GREGORIAN');
const julian = easter2026.to('JULIAN');

// Julian: April 7, 2026
// Gregorian: April 20, 2026 (13-day difference)`,
      run: runScenario3,
      result: scenario3,
      color: "from-purple-900/40 to-violet-800/40",
      border: "border-purple-700/50",
    },
    {
      id: 4,
      icon: "🦴",
      title: "Archaeological Dating",
      problem:
        "Convert radiocarbon dates (Before Present) to standard calendar systems",
      code: `const artifact = NeoCalendar.at(3450, 1, 1, 'BP');
const gregorian = artifact.to('GREGORIAN');

// 3450 BP → 1501 BCE → Gregorian -1500`,
      run: runScenario4,
      result: scenario4,
      color: "from-amber-900/40 to-orange-800/40",
      border: "border-amber-700/50",
    },
    {
      id: 5,
      icon: "📊",
      title: "Time-Series Data Analytics",
      problem:
        "Aggregate data across calendar systems using JDN as universal join key",
      code: `const nowruz = NeoCalendar.at(1403, 1, 1, 'PERSIAN_ALGORITHMIC');
const greg = nowruz.to('GREGORIAN');

// Persian 1403 → Gregorian March 20, 2024
// SQL: WHERE jdn BETWEEN x AND y`,
      run: runScenario5,
      result: scenario5,
      color: "from-green-900/40 to-emerald-800/40",
      border: "border-green-700/50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      <Navigation />

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Real-World Use Cases
          </h1>
          <p className="text-xl text-slate-300">
            See what you can build with NeoCalendar
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-12">
          <p className="text-lg text-slate-300 leading-relaxed">
            NeoCalendar isn&apos;t just a library - it&apos;s a toolkit for
            solving real problems. From multi-cultural event planning to
            archaeological research, these scenarios show how accurate calendar
            conversion enables entirely new capabilities.
          </p>
        </div>

        {/* Scenarios */}
        <div className="space-y-8">
          {scenarios.map(scenario => (
            <div
              key={scenario.id}
              className={`bg-gradient-to-br ${scenario.color} backdrop-blur-xl border ${scenario.border} rounded-2xl p-8`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{scenario.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {scenario.title}
                  </h2>
                  <p className="text-slate-300 text-sm mb-4">
                    <span className="font-semibold">Problem:</span>{" "}
                    {scenario.problem}
                  </p>
                </div>
              </div>

              {/* Code Example */}
              <div className="bg-slate-900/80 rounded-xl p-4 mb-4 border border-slate-700/50">
                <pre className="text-sm text-slate-200 overflow-x-auto">
                  <code>{scenario.code}</code>
                </pre>
              </div>

              {/* Try It Button */}
              <button
                onClick={scenario.run}
                className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition border border-white/20"
              >
                Try It →
              </button>

              {/* Result */}
              {scenario.result && (
                <div className="mt-4 bg-slate-900/80 rounded-xl p-6 border border-slate-700/50">
                  <div className="text-sm font-semibold text-emerald-400 mb-2">
                    ✓ Result:
                  </div>
                  <pre className="text-white font-mono text-sm mb-4 whitespace-pre-wrap">
                    {scenario.result.output}
                  </pre>
                  <div className="pt-4 border-t border-slate-700/50">
                    <div className="text-sm font-semibold text-slate-300 mb-1">
                      💡 Why This Matters:
                    </div>
                    <p className="text-sm text-slate-400">
                      {scenario.result.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-700/50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            These are just a few examples. With 12 calendar systems and
            comprehensive date arithmetic, the possibilities are endless.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://github.com/IterumArchive/neo-calendar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-purple-900 font-bold rounded-xl hover:bg-slate-100 transition"
            >
              View on GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@iterumarchive/neo-calendar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition"
            >
              Install from npm
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
