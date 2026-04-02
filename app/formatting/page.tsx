"use client";

import { useState } from "react";
import { NeoCalendar } from "@iterumarchive/neo-calendar-full";
import { Navigation } from "../components/Navigation";

const ERA_MAPPINGS = [
  {
    era: "AD",
    calendar: "GREGORIAN",
    example: "2024",
    description: "Anno Domini / Common Era",
  },
  {
    era: "CE",
    calendar: "GREGORIAN",
    example: "2024",
    description: "Common Era (same as AD)",
  },
  {
    era: "BC",
    calendar: "GREGORIAN",
    example: "-43",
    description: "Before Christ",
  },
  {
    era: "BCE",
    calendar: "GREGORIAN",
    example: "-43",
    description: "Before Common Era",
  },
  {
    era: "NS",
    calendar: "GREGORIAN",
    example: "1732",
    description: "New Style (Gregorian)",
  },
  {
    era: "OS",
    calendar: "JULIAN",
    example: "1066",
    description: "Old Style (Julian)",
  },
  {
    era: "HE",
    calendar: "HOLOCENE",
    example: "12024",
    description: "Holocene Era",
  },
  {
    era: "AM",
    calendar: "HEBREW",
    example: "5784",
    description: "Anno Mundi (Jewish)",
  },
  {
    era: "AH",
    calendar: "ISLAMIC_CIVIL",
    example: "1445",
    description: "Anno Hegirae (Islamic)",
  },
  {
    era: "BP",
    calendar: "BP",
    example: "76",
    description: "Before Present (1950)",
  },
];

const FORMAT_EXAMPLES = [
  { template: "YYYY-MM-DD", description: "ISO 8601 format" },
  { template: "DD/MM/YYYY", description: "European format" },
  { template: "MM/DD/YYYY", description: "US format" },
  { template: "MMMM DD, YYYY", description: "Long month name" },
  { template: "MMM D, YYYY", description: "Short month name" },
  { template: "ddd, MMM D", description: "Day and month" },
  { template: "YYYY", description: "Year only" },
];

export default function FormattingPage() {
  const [eraYear, setEraYear] = useState(1800);
  const [selectedEra, setSelectedEra] = useState("AD");
  const [eraMonth, setEraMonth] = useState(1);
  const [eraDay, setEraDay] = useState(1);
  const [eraResult, setEraResult] = useState<{
    display: string;
    calendar: string;
    conversions: string[];
  } | null>(null);

  const [formatDate, setFormatDate] = useState({
    year: 2024,
    month: 3,
    day: 18,
  });
  const [formatResults, setFormatResults] = useState<
    Array<{ template: string; result: string }>
  >([]);

  const [diffYear1, setDiffYear1] = useState(2024);
  const [diffMonth1, setDiffMonth1] = useState(1);
  const [diffDay1, setDiffDay1] = useState(1);
  const [diffYear2, setDiffYear2] = useState(2024);
  const [diffMonth2, setDiffMonth2] = useState(12);
  const [diffDay2, setDiffDay2] = useState(31);
  const [diffUnit, setDiffUnit] = useState<"day" | "week" | "month" | "year">(
    "day",
  );
  const [diffResult, setDiffResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
    components: string;
  } | null>(null);

  const [betweenDate, setBetweenDate] = useState({
    year: 2024,
    month: 6,
    day: 15,
  });
  const [betweenStart, setBetweenStart] = useState({
    year: 2024,
    month: 1,
    day: 1,
  });
  const [betweenEnd, setBetweenEnd] = useState({
    year: 2024,
    month: 12,
    day: 31,
  });
  const [betweenResult, setBetweenResult] = useState<{
    isBetween: boolean;
    isBeforeStart: boolean;
    isAfterEnd: boolean;
  } | null>(null);

  const handleEraCreate = () => {
    try {
      // Use the NEW calendar() ergonomic API
      const date = NeoCalendar.calendar(eraYear, selectedEra, eraMonth, eraDay);

      // Convert to multiple calendars to show the date
      const conversions = date.toStrings([
        "GREGORIAN",
        "JULIAN",
        "HOLOCENE",
        "HEBREW",
        "ISLAMIC_CIVIL",
      ]);

      setEraResult({
        display: date.display,
        calendar: date.calendar,
        conversions,
      });
    } catch (error) {
      console.error("Era creation failed:", error);
    }
  };

  const handleFormat = () => {
    try {
      const date = NeoCalendar.at(
        formatDate.year,
        formatDate.month,
        formatDate.day,
        "GREGORIAN",
      );

      const results = FORMAT_EXAMPLES.map(fmt => ({
        template: fmt.template,
        result: date.format(fmt.template),
      }));

      setFormatResults(results);
    } catch (error) {
      console.error("Formatting failed:", error);
    }
  };

  const handleDiffIn = () => {
    try {
      const date1 = NeoCalendar.at(
        diffYear1,
        diffMonth1,
        diffDay1,
        "GREGORIAN",
      );
      const date2 = NeoCalendar.at(
        diffYear2,
        diffMonth2,
        diffDay2,
        "GREGORIAN",
      );

      const duration = date1.diff(date2);

      // Use diffIn for specific units
      const days = Math.abs(date1.diffIn(date2, "day"));
      const weeks = Math.abs(date1.diffIn(date2, "week"));
      const months = Math.abs(date1.diffIn(date2, "month"));
      const years = Math.abs(date1.diffIn(date2, "year"));

      // Get component breakdown
      const components = duration.toComponents("GREGORIAN");
      const componentStr = Object.entries(components)
        .filter(([_, v]) => v && v > 0)
        .map(([k, v]) => `${v} ${k}`)
        .join(", ");

      setDiffResult({
        days,
        weeks: parseFloat(weeks.toFixed(2)),
        months: parseFloat(months.toFixed(2)),
        years: parseFloat(years.toFixed(2)),
        components: componentStr || "0 days",
      });
    } catch (error) {
      console.error("Diff calculation failed:", error);
    }
  };

  const handleBetweenCheck = () => {
    try {
      const date = NeoCalendar.at(
        betweenDate.year,
        betweenDate.month,
        betweenDate.day,
        "GREGORIAN",
      );
      const start = NeoCalendar.at(
        betweenStart.year,
        betweenStart.month,
        betweenStart.day,
        "GREGORIAN",
      );
      const end = NeoCalendar.at(
        betweenEnd.year,
        betweenEnd.month,
        betweenEnd.day,
        "GREGORIAN",
      );

      setBetweenResult({
        isBetween: date.isBetween(start, end, true),
        isBeforeStart: date.isBefore(start),
        isAfterEnd: date.isAfter(end),
      });
    } catch (error) {
      console.error("Between check failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Navigation />
      <div className="max-w-7xl mx-auto px-8 pb-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Formatting & Extended Features
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Era-driven creation, custom formatting, diffIn, and isBetween
          </p>
        </div>

        {/* Era-Driven Creation */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
            ⭐ calendar(year, era) - Ergonomic API
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Automatically selects the correct calendar based on era suffix. This
            is the NEW preferred API!
          </p>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Era Suffix
              </label>
              <select
                value={selectedEra}
                onChange={e => setSelectedEra(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
              >
                {ERA_MAPPINGS.map(mapping => (
                  <option key={mapping.era} value={mapping.era}>
                    {mapping.era} - {mapping.description}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-1">
                → Auto-selects:{" "}
                {ERA_MAPPINGS.find(m => m.era === selectedEra)?.calendar}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Date Components
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={eraYear}
                  onChange={e => setEraYear(parseInt(e.target.value))}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                  placeholder="Year"
                />
                <input
                  type="number"
                  value={eraMonth}
                  onChange={e => setEraMonth(parseInt(e.target.value))}
                  className="w-20 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                  min="1"
                  max="12"
                />
                <input
                  type="number"
                  value={eraDay}
                  onChange={e => setEraDay(parseInt(e.target.value))}
                  className="w-20 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                  min="1"
                  max="31"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleEraCreate}
            className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition"
          >
            Create Date with calendar()
          </button>

          {eraResult && (
            <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Created in:</span>{" "}
                {eraResult.calendar}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Display:</span>{" "}
                {eraResult.display}
              </p>
              <p className="text-sm font-semibold mt-4">Conversions:</p>
              <div className="grid grid-cols-2 gap-2">
                {["Gregorian", "Julian", "Holocene", "Hebrew", "Islamic"].map(
                  (name, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-white dark:bg-slate-800 rounded text-xs"
                    >
                      <span className="font-semibold text-slate-600 dark:text-slate-400">
                        {name}:
                      </span>
                      <br />
                      {eraResult.conversions[idx]}
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Custom Formatting */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
            🎨 format(template) - Custom Date Formatting
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Format dates with custom templates using tokens like YYYY, MM, DD,
            etc.
          </p>

          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Select Date
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={formatDate.year}
                  onChange={e =>
                    setFormatDate({
                      ...formatDate,
                      year: parseInt(e.target.value),
                    })
                  }
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                />
                <input
                  type="number"
                  value={formatDate.month}
                  onChange={e =>
                    setFormatDate({
                      ...formatDate,
                      month: parseInt(e.target.value),
                    })
                  }
                  className="w-20 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                  min="1"
                  max="12"
                />
                <input
                  type="number"
                  value={formatDate.day}
                  onChange={e =>
                    setFormatDate({
                      ...formatDate,
                      day: parseInt(e.target.value),
                    })
                  }
                  className="w-20 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                  min="1"
                  max="31"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleFormat}
            className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition"
          >
            Generate All Formats
          </button>

          {formatResults.length > 0 && (
            <div className="mt-6 space-y-2">
              {formatResults.map((result, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex justify-between items-center"
                >
                  <code className="text-sm font-mono text-slate-700 dark:text-slate-300">
                    {result.template}
                  </code>
                  <span className="text-sm font-medium">{result.result}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* diffIn() Specific Units */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
            📏 diffIn(other, unit) - Specific Unit Differences
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Calculate differences in specific units with component breakdown.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Date 1
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={diffYear1}
                  onChange={e => setDiffYear1(parseInt(e.target.value))}
                  className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                />
                <input
                  type="number"
                  value={diffMonth1}
                  onChange={e => setDiffMonth1(parseInt(e.target.value))}
                  className="w-16 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                  min="1"
                  max="12"
                />
                <input
                  type="number"
                  value={diffDay1}
                  onChange={e => setDiffDay1(parseInt(e.target.value))}
                  className="w-16 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                  min="1"
                  max="31"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Date 2
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={diffYear2}
                  onChange={e => setDiffYear2(parseInt(e.target.value))}
                  className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                />
                <input
                  type="number"
                  value={diffMonth2}
                  onChange={e => setDiffMonth2(parseInt(e.target.value))}
                  className="w-16 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                  min="1"
                  max="12"
                />
                <input
                  type="number"
                  value={diffDay2}
                  onChange={e => setDiffDay2(parseInt(e.target.value))}
                  className="w-16 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                  min="1"
                  max="31"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleDiffIn}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Calculate Differences
          </button>

          {diffResult && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Days
                </p>
                <p className="text-2xl font-bold">{diffResult.days}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Weeks
                </p>
                <p className="text-2xl font-bold">{diffResult.weeks}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Months
                </p>
                <p className="text-2xl font-bold">{diffResult.months}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Years
                </p>
                <p className="text-2xl font-bold">{diffResult.years}</p>
              </div>
              <div className="col-span-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Component Breakdown
                </p>
                <p className="text-lg font-semibold">{diffResult.components}</p>
              </div>
            </div>
          )}
        </div>

        {/* isBetween() Range Checking */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
            🎯 isBetween(start, end) - Range Validation
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Check if a date falls within a specified range.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Check Date
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={betweenDate.year}
                  onChange={e =>
                    setBetweenDate({
                      ...betweenDate,
                      year: parseInt(e.target.value),
                    })
                  }
                  className="flex-1 px-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                />
                <input
                  type="number"
                  value={betweenDate.month}
                  onChange={e =>
                    setBetweenDate({
                      ...betweenDate,
                      month: parseInt(e.target.value),
                    })
                  }
                  className="w-14 px-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                  min="1"
                  max="12"
                />
                <input
                  type="number"
                  value={betweenDate.day}
                  onChange={e =>
                    setBetweenDate({
                      ...betweenDate,
                      day: parseInt(e.target.value),
                    })
                  }
                  className="w-14 px-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                  min="1"
                  max="31"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Start Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={betweenStart.year}
                  onChange={e =>
                    setBetweenStart({
                      ...betweenStart,
                      year: parseInt(e.target.value),
                    })
                  }
                  className="flex-1 px-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                />
                <input
                  type="number"
                  value={betweenStart.month}
                  onChange={e =>
                    setBetweenStart({
                      ...betweenStart,
                      month: parseInt(e.target.value),
                    })
                  }
                  className="w-14 px-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                  min="1"
                  max="12"
                />
                <input
                  type="number"
                  value={betweenStart.day}
                  onChange={e =>
                    setBetweenStart({
                      ...betweenStart,
                      day: parseInt(e.target.value),
                    })
                  }
                  className="w-14 px-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                  min="1"
                  max="31"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                End Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={betweenEnd.year}
                  onChange={e =>
                    setBetweenEnd({
                      ...betweenEnd,
                      year: parseInt(e.target.value),
                    })
                  }
                  className="flex-1 px-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                />
                <input
                  type="number"
                  value={betweenEnd.month}
                  onChange={e =>
                    setBetweenEnd({
                      ...betweenEnd,
                      month: parseInt(e.target.value),
                    })
                  }
                  className="w-14 px-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                  min="1"
                  max="12"
                />
                <input
                  type="number"
                  value={betweenEnd.day}
                  onChange={e =>
                    setBetweenEnd({
                      ...betweenEnd,
                      day: parseInt(e.target.value),
                    })
                  }
                  className="w-14 px-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm"
                  min="1"
                  max="31"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleBetweenCheck}
            className="w-full px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition"
          >
            Check if Between
          </button>

          {betweenResult && (
            <div className="mt-6 space-y-2">
              <div
                className={`p-4 rounded-lg ${
                  betweenResult.isBetween
                    ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-500"
                    : "bg-red-50 dark:bg-red-900/20 border-2 border-red-500"
                }`}
              >
                <p className="text-lg font-bold">
                  {betweenResult.isBetween
                    ? "✅ Date is within range"
                    : "❌ Date is outside range"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Before Start?
                  </p>
                  <p className="text-sm font-semibold">
                    {betweenResult.isBeforeStart ? "Yes" : "No"}
                  </p>
                </div>
                <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    After End?
                  </p>
                  <p className="text-sm font-semibold">
                    {betweenResult.isAfterEnd ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
