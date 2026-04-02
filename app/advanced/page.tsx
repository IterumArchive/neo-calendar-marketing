"use client";

import { useState } from "react";
import { NeoCalendar, NeoSpan } from "@iterumarchive/neo-calendar-full";
import { Navigation } from "../components/Navigation";

const CALENDARS = [
  { id: "GREGORIAN", name: "Gregorian" },
  { id: "JULIAN", name: "Julian" },
  { id: "HEBREW", name: "Hebrew" },
  { id: "ISLAMIC_CIVIL", name: "Islamic" },
  { id: "PERSIAN_ALGORITHMIC", name: "Persian" },
  { id: "COPTIC", name: "Coptic" },
  { id: "HOLOCENE", name: "Holocene" },
];

export default function AdvancedPage() {
  // Demo 1: NeoSeries - Lazy Date Iteration
  const [seriesConfig, setSeriesConfig] = useState({
    calendar: "GREGORIAN",
    startYear: 2024,
    startMonth: 1,
    startDay: 1,
    every: 7,
    unit: "day" as "day" | "month" | "year",
    limit: 10,
  });
  const [seriesResult, setSeriesResult] = useState<string[] | null>(null);

  // Demo 2: NeoSpan Operations
  const [spanConfig, setSpanConfig] = useState({
    calendar: "GREGORIAN",
    span1Start: { year: 2024, month: 1, day: 1 },
    span1End: { year: 2024, month: 6, day: 30 },
    span2Start: { year: 2024, month: 3, day: 1 },
    span2End: { year: 2024, month: 9, day: 30 },
  });
  const [spanResult, setSpanResult] = useState<{
    intersects: boolean;
    intersection: string | null;
    midpoint1: string;
    midpoint2: string;
  } | null>(null);

  // Demo 3: Method Chaining
  const [chainConfig, setChainConfig] = useState({
    startCalendar: "GREGORIAN",
    startYear: 2024,
    startMonth: 1,
    startDay: 1,
    viewCalendar: "HEBREW",
  });
  const [chainResult, setChainResult] = useState<{
    start: string;
    step1: string;
    step2: string;
    step3: string;
    final: string;
  } | null>(null);

  // Demo 4: Multi-Calendar Projection
  const [projectionConfig, setProjectionConfig] = useState({
    sourceCalendar: "GREGORIAN",
    year: 2024,
    month: 3,
    day: 18,
    targetCalendars: ["HEBREW", "ISLAMIC_CIVIL", "HOLOCENE"],
  });
  const [projectionResult, setProjectionResult] = useState<Array<{
    name: string;
    date: string;
  }> | null>(null);

  // Demo 5: Cross-Calendar Comparisons
  const [comparisonConfig, setComparisonConfig] = useState({
    calendar1: "GREGORIAN",
    date1: { year: 2024, month: 3, day: 18 },
    calendar2: "HEBREW",
    date2: { year: 5784, month: 7, day: 8 },
  });
  const [comparisonResult, setComparisonResult] = useState<{
    date1Display: string;
    date2Display: string;
    isBefore: boolean;
    isAfter: boolean;
    isSame: boolean;
  } | null>(null);

  // Demo 6: Template Formatting
  const [formatConfig, setFormatConfig] = useState({
    calendar: "GREGORIAN",
    year: 2024,
    month: 3,
    day: 18,
    template: "YYYY-MM-DD",
  });
  const [formatResult, setFormatResult] = useState<string | null>(null);

  const handleSeriesDemo = () => {
    try {
      const start = NeoCalendar.at(
        seriesConfig.startYear,
        seriesConfig.startMonth,
        seriesConfig.startDay,
        seriesConfig.calendar as any,
      );

      const series = NeoCalendar.series(start, null, {
        every: { amount: seriesConfig.every, unit: seriesConfig.unit },
        limit: seriesConfig.limit,
      });

      const dates = series.toArray().map(d => d.display);
      setSeriesResult(dates);
    } catch (error) {
      console.error("Series demo failed:", error);
      setSeriesResult(["Error generating series"]);
    }
  };

  const handleSpanDemo = () => {
    try {
      const span1Start = NeoCalendar.at(
        spanConfig.span1Start.year,
        spanConfig.span1Start.month,
        spanConfig.span1Start.day,
        spanConfig.calendar as any,
      );
      const span1End = NeoCalendar.at(
        spanConfig.span1End.year,
        spanConfig.span1End.month,
        spanConfig.span1End.day,
        spanConfig.calendar as any,
      );
      const span2Start = NeoCalendar.at(
        spanConfig.span2Start.year,
        spanConfig.span2Start.month,
        spanConfig.span2Start.day,
        spanConfig.calendar as any,
      );
      const span2End = NeoCalendar.at(
        spanConfig.span2End.year,
        spanConfig.span2End.month,
        spanConfig.span2End.day,
        spanConfig.calendar as any,
      );

      const span1 = NeoSpan.from(span1Start, span1End);
      const span2 = NeoSpan.from(span2Start, span2End);

      const intersects = span1.intersects(span2);
      const intersection = span1.intersection(span2);
      const midpoint1 = span1.midpoint();
      const midpoint2 = span2.midpoint();

      setSpanResult({
        intersects,
        intersection: intersection
          ? `${intersection.start.display} → ${intersection.end.display}`
          : null,
        midpoint1: midpoint1.display,
        midpoint2: midpoint2.display,
      });
    } catch (error) {
      console.error("Span demo failed:", error);
    }
  };

  const handleChainDemo = () => {
    try {
      const start = NeoCalendar.at(
        chainConfig.startYear,
        chainConfig.startMonth,
        chainConfig.startDay,
        chainConfig.startCalendar as any,
      );

      let step1, step2, step3, final;

      try {
        step1 = start.add(3, "month");
      } catch (e) {
        throw new Error(`Step 1 (add 3 months) failed: ${e}`);
      }

      try {
        step2 = step1.subtract(10, "day");
      } catch (e) {
        throw new Error(`Step 2 (subtract 10 days) failed: ${e}`);
      }

      try {
        step3 = NeoCalendar.fromJDN(step2.jdn, chainConfig.viewCalendar as any);
      } catch (e) {
        throw new Error(
          `Step 3 (convert to ${chainConfig.viewCalendar}) failed: ${e}`,
        );
      }

      try {
        final = step3.add(1, "year", { overflow: "snap" });
      } catch (e) {
        throw new Error(`Step 4 (add 1 year) failed: ${e}`);
      }

      const viewCalName =
        CALENDARS.find(c => c.id === chainConfig.viewCalendar)?.name ||
        chainConfig.viewCalendar;

      setChainResult({
        start: start.display,
        step1: `${step1.display} (added 3 months)`,
        step2: `${step2.display} (subtracted 10 days)`,
        step3: `${step3.display} (converted to ${viewCalName})`,
        final: `${final.display} (added 1 year in ${viewCalName})`,
      });
    } catch (error) {
      console.error("Chain demo failed:", error);
      setChainResult({
        start: "Error",
        step1: String(error),
        step2: "",
        step3: "",
        final: "",
      });
    }
  };

  const handleProjectionDemo = () => {
    try {
      const source = NeoCalendar.at(
        projectionConfig.year,
        projectionConfig.month,
        projectionConfig.day,
        projectionConfig.sourceCalendar as any,
      );

      const results = projectionConfig.targetCalendars.map(calId => ({
        name: CALENDARS.find(c => c.id === calId)?.name || calId,
        date: source.as(calId as any).display,
      }));

      setProjectionResult(results);
    } catch (error) {
      console.error("Projection demo failed:", error);
    }
  };

  const handleComparisonDemo = () => {
    try {
      const date1 = NeoCalendar.at(
        comparisonConfig.date1.year,
        comparisonConfig.date1.month,
        comparisonConfig.date1.day,
        comparisonConfig.calendar1 as any,
      );

      const date2 = NeoCalendar.at(
        comparisonConfig.date2.year,
        comparisonConfig.date2.month,
        comparisonConfig.date2.day,
        comparisonConfig.calendar2 as any,
      );

      setComparisonResult({
        date1Display: date1.display,
        date2Display: date2.display,
        isBefore: date1.isBefore(date2),
        isAfter: date1.isAfter(date2),
        isSame: date1.isSame(date2),
      });
    } catch (error) {
      console.error("Comparison demo failed:", error);
    }
  };

  const handleFormatDemo = () => {
    try {
      const date = NeoCalendar.at(
        formatConfig.year,
        formatConfig.month,
        formatConfig.day,
        formatConfig.calendar as any,
      );

      const formatted = date.format(formatConfig.template);
      setFormatResult(formatted);
    } catch (error) {
      console.error("Format demo failed:", error);
      setFormatResult("Error formatting");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Navigation />
      <div className="max-w-7xl mx-auto px-8 pb-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Advanced Features
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Powerful APIs for complex calendar operations
          </p>
        </div>

        {/* Demo 1: NeoSeries */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🔁</span>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                NeoSeries: Lazy Date Iteration
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Generate date sequences without materializing entire range
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                Calendar System
              </label>
              <select
                value={seriesConfig.calendar}
                onChange={e =>
                  setSeriesConfig({ ...seriesConfig, calendar: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                {CALENDARS.map(cal => (
                  <option key={cal.id} value={cal.id}>
                    {cal.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                Every N
              </label>
              <input
                type="number"
                value={seriesConfig.every}
                onChange={e =>
                  setSeriesConfig({
                    ...seriesConfig,
                    every: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                Unit
              </label>
              <select
                value={seriesConfig.unit}
                onChange={e =>
                  setSeriesConfig({
                    ...seriesConfig,
                    unit: e.target.value as "day" | "month" | "year",
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="day">Days</option>
                <option value="month">Months</option>
                <option value="year">Years</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSeriesDemo}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
          >
            Generate Series: Every {seriesConfig.every} {seriesConfig.unit}(s)
          </button>

          {seriesResult && (
            <div className="mt-6">
              <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Generated {seriesResult.length} dates:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {seriesResult.map((date, idx) => (
                    <div
                      key={idx}
                      className="font-mono text-xs bg-white dark:bg-slate-800 p-2 rounded"
                    >
                      {date}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
                <p className="text-sm font-semibold text-purple-800 dark:text-purple-400">
                  💡 The Power
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                  NeoSeries uses lazy iteration - dates are generated on-demand,
                  not all at once. Perfect for recurring events, pagination, or
                  infinite sequences.
                  <br />
                  <code className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded mt-2 inline-block">
                    .filter() .map() .skip() .take() .nth()
                  </code>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Demo 2: NeoSpan */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">📏</span>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                NeoSpan: Advanced Span Operations
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Intersection, midpoint, containment checking
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Calendar System
            </label>
            <select
              value={spanConfig.calendar}
              onChange={e =>
                setSpanConfig({ ...spanConfig, calendar: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            >
              {CALENDARS.map(cal => (
                <option key={cal.id} value={cal.id}>
                  {cal.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">
                Span 1
              </h3>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">
                  Start Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="Year"
                    value={spanConfig.span1Start.year}
                    onChange={e =>
                      setSpanConfig({
                        ...spanConfig,
                        span1Start: {
                          ...spanConfig.span1Start,
                          year: parseInt(e.target.value) || 2024,
                        },
                      })
                    }
                    className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                  <input
                    type="number"
                    placeholder="Mo"
                    min="1"
                    max="13"
                    value={spanConfig.span1Start.month}
                    onChange={e =>
                      setSpanConfig({
                        ...spanConfig,
                        span1Start: {
                          ...spanConfig.span1Start,
                          month: parseInt(e.target.value) || 1,
                        },
                      })
                    }
                    className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                  <input
                    type="number"
                    placeholder="Day"
                    min="1"
                    max="31"
                    value={spanConfig.span1Start.day}
                    onChange={e =>
                      setSpanConfig({
                        ...spanConfig,
                        span1Start: {
                          ...spanConfig.span1Start,
                          day: parseInt(e.target.value) || 1,
                        },
                      })
                    }
                    className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">
                  End Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="Year"
                    value={spanConfig.span1End.year}
                    onChange={e =>
                      setSpanConfig({
                        ...spanConfig,
                        span1End: {
                          ...spanConfig.span1End,
                          year: parseInt(e.target.value) || 2024,
                        },
                      })
                    }
                    className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                  <input
                    type="number"
                    placeholder="Mo"
                    min="1"
                    max="13"
                    value={spanConfig.span1End.month}
                    onChange={e =>
                      setSpanConfig({
                        ...spanConfig,
                        span1End: {
                          ...spanConfig.span1End,
                          month: parseInt(e.target.value) || 1,
                        },
                      })
                    }
                    className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                  <input
                    type="number"
                    placeholder="Day"
                    min="1"
                    max="31"
                    value={spanConfig.span1End.day}
                    onChange={e =>
                      setSpanConfig({
                        ...spanConfig,
                        span1End: {
                          ...spanConfig.span1End,
                          day: parseInt(e.target.value) || 1,
                        },
                      })
                    }
                    className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">
                Span 2
              </h3>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">
                  Start Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="Year"
                    value={spanConfig.span2Start.year}
                    onChange={e =>
                      setSpanConfig({
                        ...spanConfig,
                        span2Start: {
                          ...spanConfig.span2Start,
                          year: parseInt(e.target.value) || 2024,
                        },
                      })
                    }
                    className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                  <input
                    type="number"
                    placeholder="Mo"
                    min="1"
                    max="13"
                    value={spanConfig.span2Start.month}
                    onChange={e =>
                      setSpanConfig({
                        ...spanConfig,
                        span2Start: {
                          ...spanConfig.span2Start,
                          month: parseInt(e.target.value) || 1,
                        },
                      })
                    }
                    className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                  <input
                    type="number"
                    placeholder="Day"
                    min="1"
                    max="31"
                    value={spanConfig.span2Start.day}
                    onChange={e =>
                      setSpanConfig({
                        ...spanConfig,
                        span2Start: {
                          ...spanConfig.span2Start,
                          day: parseInt(e.target.value) || 1,
                        },
                      })
                    }
                    className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1">
                  End Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="Year"
                    value={spanConfig.span2End.year}
                    onChange={e =>
                      setSpanConfig({
                        ...spanConfig,
                        span2End: {
                          ...spanConfig.span2End,
                          year: parseInt(e.target.value) || 2024,
                        },
                      })
                    }
                    className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                  <input
                    type="number"
                    placeholder="Mo"
                    min="1"
                    max="13"
                    value={spanConfig.span2End.month}
                    onChange={e =>
                      setSpanConfig({
                        ...spanConfig,
                        span2End: {
                          ...spanConfig.span2End,
                          month: parseInt(e.target.value) || 1,
                        },
                      })
                    }
                    className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                  <input
                    type="number"
                    placeholder="Day"
                    min="1"
                    max="31"
                    value={spanConfig.span2End.day}
                    onChange={e =>
                      setSpanConfig({
                        ...spanConfig,
                        span2End: {
                          ...spanConfig.span2End,
                          day: parseInt(e.target.value) || 1,
                        },
                      })
                    }
                    className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSpanDemo}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition"
          >
            Analyze Spans
          </button>

          {spanResult && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                      Span 1 Midpoint
                    </p>
                    <p className="font-mono text-sm">{spanResult.midpoint1}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                      Span 2 Midpoint
                    </p>
                    <p className="font-mono text-sm">{spanResult.midpoint2}</p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg ${
                  spanResult.intersects
                    ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700"
                    : "bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700"
                }`}
              >
                <p className="font-semibold mb-2">
                  {spanResult.intersects
                    ? "✅ Spans Intersect"
                    : "❌ No Intersection"}
                </p>
                {spanResult.intersection && (
                  <p className="text-sm font-mono">{spanResult.intersection}</p>
                )}
              </div>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                <p className="text-sm font-semibold text-blue-800 dark:text-blue-400">
                  💡 NeoSpan Operations
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                  <code className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                    .intersection() .gap() .midpoint() .contains() .isAdjacent()
                  </code>
                  <br />
                  Perfect for scheduling conflicts, date range queries, timeline
                  analysis
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Demo 3: Method Chaining */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">⛓️</span>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                Fluent Method Chaining
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Chain operations across calendar systems
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                Start Calendar
              </label>
              <select
                value={chainConfig.startCalendar}
                onChange={e =>
                  setChainConfig({
                    ...chainConfig,
                    startCalendar: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                {CALENDARS.map(cal => (
                  <option key={cal.id} value={cal.id}>
                    {cal.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                View Result In
              </label>
              <select
                value={chainConfig.viewCalendar}
                onChange={e =>
                  setChainConfig({
                    ...chainConfig,
                    viewCalendar: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                {CALENDARS.map(cal => (
                  <option key={cal.id} value={cal.id}>
                    {cal.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Start Date
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="Year"
                value={chainConfig.startYear}
                onChange={e =>
                  setChainConfig({
                    ...chainConfig,
                    startYear: parseInt(e.target.value) || 2024,
                  })
                }
                className="px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              />
              <input
                type="number"
                placeholder="Month"
                min="1"
                max="13"
                value={chainConfig.startMonth}
                onChange={e =>
                  setChainConfig({
                    ...chainConfig,
                    startMonth: parseInt(e.target.value) || 1,
                  })
                }
                className="px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              />
              <input
                type="number"
                placeholder="Day"
                min="1"
                max="31"
                value={chainConfig.startDay}
                onChange={e =>
                  setChainConfig({
                    ...chainConfig,
                    startDay: parseInt(e.target.value) || 1,
                  })
                }
                className="px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <button
            onClick={handleChainDemo}
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-medium rounded-lg hover:from-orange-700 hover:to-red-700 transition"
          >
            Execute Chain: +3mo → -10d → convert → +1yr
          </button>

          {chainResult && (
            <div className="mt-6">
              <div className="space-y-2">
                {[
                  { label: "Start", value: chainResult.start },
                  { label: "Step 1", value: chainResult.step1 },
                  { label: "Step 2", value: chainResult.step2 },
                  { label: "Step 3", value: chainResult.step3 },
                  { label: "Final", value: chainResult.final },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center"
                  >
                    <span className="w-16 text-sm font-bold text-slate-600 dark:text-slate-400">
                      {step.label}
                    </span>
                    <span className="text-sm font-mono flex-1">
                      {step.value}
                    </span>
                    {idx < 4 && <span className="text-2xl">→</span>}
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded">
                <p className="text-sm font-semibold text-orange-800 dark:text-orange-400">
                  💡 Fluent API
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                  All operations return new NeoDate instances, enabling
                  unlimited chaining across calendar boundaries. Immutable,
                  composable, powerful.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Demo 4: Multi-Calendar Projection */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🎯</span>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                Multi-Calendar Projection
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Project one date to multiple calendars at once
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Source Calendar
            </label>
            <select
              value={projectionConfig.sourceCalendar}
              onChange={e =>
                setProjectionConfig({
                  ...projectionConfig,
                  sourceCalendar: e.target.value,
                })
              }
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            >
              {CALENDARS.map(cal => (
                <option key={cal.id} value={cal.id}>
                  {cal.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Source Date
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="Year"
                value={projectionConfig.year}
                onChange={e =>
                  setProjectionConfig({
                    ...projectionConfig,
                    year: parseInt(e.target.value) || 2024,
                  })
                }
                className="px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              />
              <input
                type="number"
                placeholder="Month"
                min="1"
                max="13"
                value={projectionConfig.month}
                onChange={e =>
                  setProjectionConfig({
                    ...projectionConfig,
                    month: parseInt(e.target.value) || 1,
                  })
                }
                className="px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              />
              <input
                type="number"
                placeholder="Day"
                min="1"
                max="31"
                value={projectionConfig.day}
                onChange={e =>
                  setProjectionConfig({
                    ...projectionConfig,
                    day: parseInt(e.target.value) || 1,
                  })
                }
                className="px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <button
            onClick={handleProjectionDemo}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-medium rounded-lg hover:from-cyan-700 hover:to-teal-700 transition"
          >
            Project to 3 Calendars
          </button>

          {projectionResult && (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {projectionResult.map((result, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-lg"
                  >
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                      {result.name}
                    </p>
                    <p className="font-mono text-sm font-bold">{result.date}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500 rounded">
                <p className="text-sm font-semibold text-cyan-800 dark:text-cyan-400">
                  💡 Use Case
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                  Perfect for historical documentation: show the same event in
                  multiple calendar systems simultaneously. Also useful for{" "}
                  <code className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                    .toStrings()
                  </code>{" "}
                  method.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Demo 5: Cross-Calendar Comparisons */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">⚖️</span>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                Cross-Calendar Comparisons
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Compare dates from different calendar systems
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                Date 1 Calendar
              </label>
              <select
                value={comparisonConfig.calendar1}
                onChange={e =>
                  setComparisonConfig({
                    ...comparisonConfig,
                    calendar1: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                {CALENDARS.map(cal => (
                  <option key={cal.id} value={cal.id}>
                    {cal.name}
                  </option>
                ))}
              </select>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Year"
                  value={comparisonConfig.date1.year}
                  onChange={e =>
                    setComparisonConfig({
                      ...comparisonConfig,
                      date1: {
                        ...comparisonConfig.date1,
                        year: parseInt(e.target.value) || 2024,
                      },
                    })
                  }
                  className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
                <input
                  type="number"
                  placeholder="Mo"
                  min="1"
                  max="13"
                  value={comparisonConfig.date1.month}
                  onChange={e =>
                    setComparisonConfig({
                      ...comparisonConfig,
                      date1: {
                        ...comparisonConfig.date1,
                        month: parseInt(e.target.value) || 1,
                      },
                    })
                  }
                  className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
                <input
                  type="number"
                  placeholder="Day"
                  min="1"
                  max="31"
                  value={comparisonConfig.date1.day}
                  onChange={e =>
                    setComparisonConfig({
                      ...comparisonConfig,
                      date1: {
                        ...comparisonConfig.date1,
                        day: parseInt(e.target.value) || 1,
                      },
                    })
                  }
                  className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                Date 2 Calendar
              </label>
              <select
                value={comparisonConfig.calendar2}
                onChange={e =>
                  setComparisonConfig({
                    ...comparisonConfig,
                    calendar2: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                {CALENDARS.map(cal => (
                  <option key={cal.id} value={cal.id}>
                    {cal.name}
                  </option>
                ))}
              </select>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Year"
                  value={comparisonConfig.date2.year}
                  onChange={e =>
                    setComparisonConfig({
                      ...comparisonConfig,
                      date2: {
                        ...comparisonConfig.date2,
                        year: parseInt(e.target.value) || 5784,
                      },
                    })
                  }
                  className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
                <input
                  type="number"
                  placeholder="Mo"
                  min="1"
                  max="13"
                  value={comparisonConfig.date2.month}
                  onChange={e =>
                    setComparisonConfig({
                      ...comparisonConfig,
                      date2: {
                        ...comparisonConfig.date2,
                        month: parseInt(e.target.value) || 1,
                      },
                    })
                  }
                  className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
                <input
                  type="number"
                  placeholder="Day"
                  min="1"
                  max="31"
                  value={comparisonConfig.date2.day}
                  onChange={e =>
                    setComparisonConfig({
                      ...comparisonConfig,
                      date2: {
                        ...comparisonConfig.date2,
                        day: parseInt(e.target.value) || 1,
                      },
                    })
                  }
                  className="px-2 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleComparisonDemo}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition"
          >
            Compare Dates
          </button>

          {comparisonResult && (
            <div className="mt-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                    Date 1
                  </p>
                  <p className="font-mono text-sm">
                    {comparisonResult.date1Display}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                    Date 2
                  </p>
                  <p className="font-mono text-sm">
                    {comparisonResult.date2Display}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div
                  className={`p-4 rounded-lg text-center ${
                    comparisonResult.isBefore
                      ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500"
                      : "bg-slate-100 dark:bg-slate-700"
                  }`}
                >
                  <p className="text-sm font-bold">isBefore()</p>
                  <p className="text-2xl">
                    {comparisonResult.isBefore ? "✅" : "❌"}
                  </p>
                </div>
                <div
                  className={`p-4 rounded-lg text-center ${
                    comparisonResult.isAfter
                      ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500"
                      : "bg-slate-100 dark:bg-slate-700"
                  }`}
                >
                  <p className="text-sm font-bold">isAfter()</p>
                  <p className="text-2xl">
                    {comparisonResult.isAfter ? "✅" : "❌"}
                  </p>
                </div>
                <div
                  className={`p-4 rounded-lg text-center ${
                    comparisonResult.isSame
                      ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500"
                      : "bg-slate-100 dark:bg-slate-700"
                  }`}
                >
                  <p className="text-sm font-bold">isSame()</p>
                  <p className="text-2xl">
                    {comparisonResult.isSame ? "✅" : "❌"}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded">
                <p className="text-sm font-semibold text-green-800 dark:text-green-400">
                  💡 Cross-Calendar Comparisons
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                  Compare dates from DIFFERENT calendar systems directly. The
                  API handles JDN conversion automatically. No manual conversion
                  needed!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Demo 6: Template Formatting */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">📝</span>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                Template Formatting
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Custom date formatting with tokens
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                Calendar System
              </label>
              <select
                value={formatConfig.calendar}
                onChange={e =>
                  setFormatConfig({ ...formatConfig, calendar: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                {CALENDARS.map(cal => (
                  <option key={cal.id} value={cal.id}>
                    {cal.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                Template
              </label>
              <select
                value={formatConfig.template}
                onChange={e =>
                  setFormatConfig({ ...formatConfig, template: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD.MM.YYYY">DD.MM.YYYY</option>
                <option value="YYYY-MM-DD EE">YYYY-MM-DD EE (with era)</option>
                <option value="D/M/YY">D/M/YY (no padding)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleFormatDemo}
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition"
          >
            Format Date
          </button>

          {formatResult && (
            <div className="mt-6">
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border-2 border-indigo-300 dark:border-indigo-700">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Formatted Output
                </p>
                <p className="text-2xl font-mono font-bold">{formatResult}</p>
              </div>

              <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 rounded">
                <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-400">
                  💡 Format Tokens
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                  <code className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                    YYYY YY MM M DD D EE
                  </code>
                  <br />
                  Works across ALL calendar systems. Use custom formats for
                  localization, exports, or display requirements.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
