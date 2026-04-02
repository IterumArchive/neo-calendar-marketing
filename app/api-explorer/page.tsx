"use client";

import { useState } from "react";
import { Navigation } from "../components/Navigation";

type Example = {
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
};

const examples: Example[] = [
  {
    id: "basic-1",
    title: "Create a Date",
    description: "Create dates in any calendar system",
    category: "Basics",
    code: `import { NeoCalendar } from '@iterumarchive/neo-calendar';

// Create a date in Gregorian calendar
const date = NeoCalendar.at(2026, 3, 25, 'GREGORIAN');

console.log(date.display);
// Output: +002026-03-25 AD

console.log(\`Year: \${date.year}, Month: \${date.month}, Day: \${date.day}\`);
// Output: Year: 2026, Month: 3, Day: 25`,
  },
  {
    id: "basic-2",
    title: "Convert Between Calendars",
    description: "Seamlessly convert between any two calendar systems",
    category: "Basics",
    code: `import { NeoCalendar } from '@iterumarchive/neo-calendar';

const gregorian = NeoCalendar.at(2026, 3, 25, 'GREGORIAN');

// Convert to Hebrew
const hebrew = gregorian.to('HEBREW');
console.log(hebrew.display);
// Output: 5786-1-5 AM

// Convert to Islamic
const islamic = gregorian.to('ISLAMIC_CIVIL');
console.log(islamic.display);
// Output: 1447-11-25 AH

// Convert to Unix timestamp
const unix = gregorian.to('UNIX');
console.log(unix.display);
// Output: 1774396800 seconds`,
  },
  {
    id: "arithmetic-1",
    title: "Add Time",
    description: "Calendar-aware date arithmetic",
    category: "Arithmetic",
    code: `import { NeoCalendar } from '@iterumarchive/neo-calendar';

const date = NeoCalendar.at(2026, 3, 25, 'GREGORIAN');

// Add days
const tomorrow = date.add(1, 'day');
console.log(tomorrow.display);

// Add months (respects calendar rules)
const nextMonth = date.add(1, 'month');
console.log(nextMonth.display);

// Add years (handles leap years)
const nextYear = date.add(1, 'year');
console.log(nextYear.display);`,
  },
  {
    id: "arithmetic-2",
    title: "Calculate Differences",
    description: "Find the duration between two dates",
    category: "Arithmetic",
    code: `import { NeoCalendar } from '@iterumarchive/neo-calendar';

const date1 = NeoCalendar.at(2026, 1, 1, 'GREGORIAN');
const date2 = NeoCalendar.at(2026, 12, 31, 'GREGORIAN');

// Get duration object
const duration = date1.diff(date2);
console.log(\`\${duration.days} days\`);
// Output: 364 days

// Get specific unit
const months = date1.diffIn(date2, 'month');
console.log(\`\${months} months\`);`,
  },
  {
    id: "comparison-1",
    title: "Compare Dates",
    description: "Compare dates across calendar systems",
    category: "Comparisons",
    code: `import { NeoCalendar } from '@iterumarchive/neo-calendar';

const date1 = NeoCalendar.at(2026, 3, 20, 'GREGORIAN');
const date2 = NeoCalendar.at(2026, 3, 25, 'GREGORIAN');

console.log(date1.isBefore(date2)); // true
console.log(date1.isAfter(date2));  // false
console.log(date1.equals(date2));   // false

// Compare across calendars
const gregorian = NeoCalendar.at(2026, 3, 25, 'GREGORIAN');
const hebrew = NeoCalendar.at(5786, 1, 5, 'HEBREW');
console.log(gregorian.equals(hebrew)); // true (same JDN)`,
  },
  {
    id: "formatting-1",
    title: "Format Dates",
    description: "Use templates to format date display",
    category: "Formatting",
    code: `import { NeoCalendar, formatDate } from '@iterumarchive/neo-calendar';

const date = NeoCalendar.at(2026, 3, 25, 'GREGORIAN');

// ISO format
console.log(formatDate(date, 'YYYY-MM-DD'));
// Output: 2026-03-25

// US format
console.log(formatDate(date, 'MM/DD/YYYY'));
// Output: 03/25/2026

// With month names
console.log(formatDate(date, 'MMMM D, YYYY'));
// Output: March 25, 2026

// Custom format
console.log(formatDate(date, 'Day D of MMM, YYYY'));
// Output: Day 25 of Mar, 2026`,
  },
  {
    id: "advanced-1",
    title: "Date Spans",
    description: "Work with date ranges",
    category: "Advanced",
    code: `import { NeoCalendar } from '@iterumarchive/neo-calendar';

const start = NeoCalendar.at(2026, 1, 1, 'GREGORIAN');
const end = NeoCalendar.at(2026, 12, 31, 'GREGORIAN');

// Create a span
const span = NeoCalendar.span(start, end);

console.log(\`Duration: \${span.duration.days} days\`);

// Check if date is in span
const date = NeoCalendar.at(2026, 6, 15, 'GREGORIAN');
console.log(span.contains(date)); // true

// Get midpoint
const midpoint = start.add(Math.floor(span.duration.days / 2), 'day');
console.log(midpoint.display);`,
  },
  {
    id: "advanced-2",
    title: "Date Series",
    description: "Generate sequences of dates",
    category: "Advanced",
    code: `import { NeoCalendar } from '@iterumarchive/neo-calendar';

const start = NeoCalendar.at(2026, 1, 1, 'GREGORIAN');
const end = NeoCalendar.at(2026, 1, 10, 'GREGORIAN');

// Generate daily series
const series = NeoCalendar.series(start, end, {
  every: { amount: 1, unit: 'day' }
});

// Get all dates
const dates = series.toArray();
console.log(\`Generated \${dates.length} dates\`);

// Or use specific date
const third = series.nth(2); // 0-indexed
console.log(third?.display);`,
  },
  {
    id: "plugins-1",
    title: "Multiple Calendars",
    description: "Convert to multiple calendars at once",
    category: "Plugins",
    code: `import { NeoCalendar } from '@iterumarchive/neo-calendar-full';

const date = NeoCalendar.at(2026, 3, 25, 'GREGORIAN');

// Convert to multiple calendars efficiently
const displays = date.toStrings([
  'GREGORIAN',
  'JULIAN',
  'HEBREW',
  'ISLAMIC_CIVIL',
  'PERSIAN_ALGORITHMIC',
  'HOLOCENE'
]);

displays.forEach((display, i) => {
  console.log(\`Calendar \${i + 1}: \${display}\`);
});`,
  },
];

const categories = [
  "Basics",
  "Arithmetic",
  "Comparisons",
  "Formatting",
  "Advanced",
  "Plugins",
];

export default function ApiExplorerPage() {
  const [activeCategory, setActiveCategory] = useState("Basics");
  const [selectedExample, setSelectedExample] = useState<Example>(examples[0]);

  const filteredExamples = examples.filter(
    ex => ex.category === activeCategory,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      <Navigation />

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            API Explorer
          </h1>
          <p className="text-xl text-slate-300">
            Code examples and API reference
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-12">
          <p className="text-lg text-slate-300 leading-relaxed">
            Browse the NeoCalendar API through organized code examples. Each
            example shows real working code with explanations that you can copy
            and use in your projects.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                const firstExample = examples.find(
                  ex => ex.category === category,
                );
                if (firstExample) setSelectedExample(firstExample);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeCategory === category
                  ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Example List */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              {activeCategory} Examples
            </h3>
            {filteredExamples.map(example => (
              <button
                key={example.id}
                onClick={() => setSelectedExample(example)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedExample.id === example.id
                    ? "bg-gradient-to-r from-orange-900/40 to-red-900/40 border border-orange-700/50"
                    : "bg-slate-800/50 hover:bg-slate-800/70 border border-slate-700/50"
                }`}
              >
                <div className="font-semibold text-white mb-1">
                  {example.title}
                </div>
                <div className="text-sm text-slate-400">
                  {example.description}
                </div>
              </button>
            ))}
          </div>

          {/* Code Display */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
              <div className="bg-slate-800/50 border-b border-slate-700/50 px-6 py-4">
                <h2 className="text-xl font-bold text-white">
                  {selectedExample.title}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  {selectedExample.description}
                </p>
              </div>

              <div className="p-6">
                <pre className="text-sm text-slate-200 overflow-x-auto bg-slate-950/50 rounded-lg p-6 border border-slate-700/50">
                  <code>{selectedExample.code}</code>
                </pre>
              </div>

              <div className="bg-slate-800/30 border-t border-slate-700/50 px-6 py-4">
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition text-sm">
                    📋 Copy Code
                  </button>
                  <a
                    href="https://github.com/IterumArchive/neo-calendar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition text-sm"
                  >
                    📚 View Full Docs
                  </a>
                </div>
              </div>
            </div>

            {/* Type Information */}
            <div className="mt-6 bg-blue-900/20 border border-blue-700/50 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3">
                💡 Pro Tip
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                NeoCalendar is fully typed with TypeScript. Your IDE will
                provide autocomplete and type checking for all methods and
                properties. Install{" "}
                <code className="px-2 py-1 bg-slate-800/50 rounded text-xs">
                  @iterumarchive/neo-calendar
                </code>{" "}
                to get started.
              </p>
            </div>
          </div>
        </div>

        {/* Installation Guide */}
        <div className="mt-16 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-700/50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-3xl">📦</span> Installation
          </h2>
          <p className="text-slate-300 mb-6">
            Choose the package that fits your needs:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="text-blue-400 font-semibold mb-2 text-sm">
                Standard (Recommended)
              </div>
              <div className="bg-slate-950/50 rounded p-3 mb-3">
                <code className="text-xs text-green-400 font-mono break-all">
                  npm install @iterumarchive/neo-calendar
                </code>
              </div>
              <p className="text-xs text-slate-400">
                Tree-shakeable, includes core calendars
              </p>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="text-purple-400 font-semibold mb-2 text-sm">
                Full
              </div>
              <div className="bg-slate-950/50 rounded p-3 mb-3">
                <code className="text-xs text-green-400 font-mono break-all">
                  npm install @iterumarchive/neo-calendar-full
                </code>
              </div>
              <p className="text-xs text-slate-400">
                All 12 calendars, zero configuration
              </p>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="text-slate-400 font-semibold mb-2 text-sm">
                Core
              </div>
              <div className="bg-slate-950/50 rounded p-3 mb-3">
                <code className="text-xs text-green-400 font-mono break-all">
                  npm install @iterumarchive/neo-calendar-core
                </code>
              </div>
              <p className="text-xs text-slate-400">
                For building custom plugins
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <a
            href="https://github.com/IterumArchive/neo-calendar"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition"
          >
            <div className="text-3xl mb-3">📖</div>
            <h3 className="text-lg font-bold text-white mb-2">
              Full Documentation
            </h3>
            <p className="text-slate-400 text-sm">
              Complete API reference, guides, and tutorials
            </p>
          </a>

          <a
            href="https://www.npmjs.com/package/@iterumarchive/neo-calendar"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition"
          >
            <div className="text-3xl mb-3">📦</div>
            <h3 className="text-lg font-bold text-white mb-2">
              Install from npm
            </h3>
            <p className="text-slate-400 text-sm">
              Get started with a simple npm install command
            </p>
          </a>

          <a
            href="/use-cases"
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition"
          >
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-lg font-bold text-white mb-2">
              Real Use Cases
            </h3>
            <p className="text-slate-400 text-sm">
              See how others are using NeoCalendar in production
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
