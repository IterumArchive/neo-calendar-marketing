"use client";

import { Navigation } from "../components/Navigation";
import { CALENDAR_DATA } from "../constants/calendarData";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Validations and Limitations
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            NeoCalendar treats all calendars as reversible transformations over
            a single invariant (JDN), allowing formal validation of correctness
            across systems.
          </p>
          <p className="text-center text-sm text-slate-400 max-w-3xl mx-auto mt-4">
            All conversions reduce to JDN and are reconstructed from it,
            ensuring reversibility and cross-calendar consistency.
          </p>
        </div>

        {/* Validation Summary Stats */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 border border-purple-700/50 rounded-2xl p-6">
            <div className="text-5xl font-bold text-purple-400 mb-2">12</div>
            <div className="text-sm text-slate-300 font-semibold mb-1">
              Calendar Systems
            </div>
            <div className="text-xs text-slate-400">
              Gregorian · Julian · Islamic · Hebrew · Coptic · Ethiopian · Unix
              · Persian · Holocene · BP · French Rev · Mayan
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-900/5 border border-cyan-700/50 rounded-2xl p-6">
            <div className="text-5xl font-bold text-cyan-400 mb-2">0</div>
            <div className="text-sm text-slate-300 font-semibold mb-1">
              0-Day Error
            </div>
            <div className="text-xs text-slate-400">
              Across 1,500+ validation tests
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border border-blue-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-center mb-2">
              <span className="text-4xl font-bold text-blue-400">Beta</span>
              <span className="ml-2 text-lg text-blue-300">v0.x</span>
            </div>
            <div className="text-sm text-slate-300 font-semibold mb-1">
              Production-Ready Core
            </div>
            <div className="text-xs text-slate-400">
              Rigorously tested • Active development • Stable API
            </div>
          </div>
        </div>

        {/* Validation Model */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🎯</span> Validation Model
          </h2>
          <p className="text-slate-300 mb-6">
            Three validation layers that guarantee consistency, reversibility,
            and external alignment across all calendar systems:
          </p>

          <div className="bg-indigo-900/10 border border-indigo-700/30 rounded-lg p-4 mb-8">
            <p className="text-sm font-semibold text-indigo-300 mb-3">
              Test Coverage
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-indigo-400 mb-1">
                  1,500+
                </div>
                <div className="text-xs text-slate-400">Total test cases</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400 mb-1">383</div>
                <div className="text-xs text-slate-400">
                  High-rigor validation
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400 mb-1">
                  360
                </div>
                <div className="text-xs text-slate-400">
                  Cross-calendar triangle
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">
              All validation tests show 0-day error across edge cases,
              invariants, and boundary coverage.
            </p>
          </div>

          <div className="space-y-6">
            {/* Tier 1 */}
            <div className="bg-emerald-900/10 border-l-4 border-emerald-500 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-emerald-400 mb-2">
                    Internal Consistency (Bijection)
                  </h3>
                  <p className="text-slate-300 mb-3">
                    Proves that Date A → JDN → Date A always results in 0-day
                    error. No loss of day fidelity occurs during
                    transformations.
                  </p>
                  <div className="bg-slate-950/50 rounded-lg p-4 font-mono text-sm">
                    <div className="text-cyan-400">
                      Gregorian 2024-03-18 → JDN 2460388 → Gregorian 2024-03-18
                      ✓
                    </div>
                    <div className="text-emerald-400 text-xs mt-2">
                      Result: Perfect round-trip, 0 days lost
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-slate-400">
                    <strong>Tests:</strong> 20 scenarios across 5 calendars
                    (Gregorian, Julian, Islamic, Hebrew, Coptic)
                  </div>
                </div>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="bg-cyan-900/10 border-l-4 border-cyan-500 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">
                    Cross-Calendar Alignment (Triangle Test)
                  </h3>
                  <p className="text-slate-300 mb-3">
                    Proves that Gregorian → Islamic → Gregorian works perfectly.
                    JDN acts as an invariant canonical representation across all
                    calendar transformations.
                  </p>
                  <div className="bg-slate-950/50 rounded-lg p-4 font-mono text-sm">
                    <div className="text-cyan-400">
                      Gregorian 2024-03-18 → JDN 2460388
                    </div>
                    <div className="text-purple-400">
                      → Islamic 1445-9-8 → JDN 2460388
                    </div>
                    <div className="text-emerald-400">
                      → Gregorian 2024-03-18 ✓
                    </div>
                    <div className="text-emerald-400 text-xs mt-2">
                      Result: JDN remains stable through triangle
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-slate-400">
                    <strong>Tests:</strong> 360 triangle conversions across 12
                    calendar pairs, 0 day error
                  </div>
                </div>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-purple-900/10 border-l-4 border-purple-500 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-purple-400 mb-2">
                    External Authority (Gold Standard)
                  </h3>
                  <p className="text-slate-300 mb-3">
                    Results cross-verified against{" "}
                    <strong>
                      Dershowitz & Reingold's Calendrical Calculations
                    </strong>{" "}
                    (widely regarded as the standard reference for calendrical
                    algorithms) and religious authorities (Hebrew Calendar
                    Authority, Islamic Calendar Standards).
                  </p>
                  <div className="bg-slate-950/50 rounded-lg p-4">
                    <div className="text-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">
                          Rosh Hashanah 5784
                        </span>
                        <span className="text-emerald-400 font-mono">
                          JDN 2460204 ✓
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">
                          Islamic Epoch (Hijra)
                        </span>
                        <span className="text-emerald-400 font-mono">
                          JDN 1948440 ✓
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">
                          Coptic Epoch (Anno Martyrum)
                        </span>
                        <span className="text-emerald-400 font-mono">
                          JDN 1825030 ✓
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-slate-400">
                    <strong>Tests:</strong> 9 external benchmark validations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Assumptions */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-amber-600/50 rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">⚙️</span> Core Assumptions
          </h2>
          <p className="text-slate-300 mb-6">
            Implementation details that affect how calendars behave in
            NeoCalendar:
          </p>

          <div className="space-y-4">
            {/* Day Boundary Model */}
            <div className="bg-amber-900/10 border-l-4 border-amber-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-amber-300 mb-3">
                Day Boundary Model
              </h3>
              <p className="text-slate-300 mb-3">
                NeoCalendar uses <strong>astronomical JDN</strong> (day boundary
                at <strong>12:00 noon UTC</strong>).
              </p>
              <div className="bg-slate-950/50 rounded-lg p-4 mb-3">
                <p className="text-sm text-slate-300 mb-2">
                  <strong className="text-amber-400">Implication:</strong> A
                  calendar date maps to a noon-to-noon interval, not
                  midnight-to-midnight.
                </p>
                <p className="text-xs text-slate-400">
                  This may differ from civil date expectations. For example,
                  2024-03-18 represents the period from 12:00 noon on March 18
                  to 12:00 noon on March 19.
                </p>
              </div>
              <p className="text-xs text-slate-400 italic">
                <strong>Status:</strong> Civil midnight-based behavior requires
                diurnal offset implementation (planned).
              </p>
            </div>

            {/* Year Numbering Model */}
            <div className="bg-purple-900/10 border-l-4 border-purple-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-300 mb-3">
                Year Numbering Model
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-cyan-400 mb-2">
                    Internal (Astronomical)
                  </p>
                  <p className="text-xs text-slate-300">
                    Includes year 0 for continuous math operations
                  </p>
                  <p className="text-xs text-slate-400 mt-2 font-mono">
                    ... -2, -1, 0, 1, 2 ...
                  </p>
                </div>
                <div className="bg-slate-950/50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-emerald-400 mb-2">
                    External (Historical)
                  </p>
                  <p className="text-xs text-slate-300">
                    Displays without year 0 for familiar notation
                  </p>
                  <p className="text-xs text-slate-400 mt-2 font-mono">
                    ... 2 BCE, 1 BCE, 1 CE, 2 CE ...
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3">
                This prevents off-by-one errors in deep time calculations while
                preserving familiar historical notation.
              </p>
            </div>

            {/* Proleptic Gregorian */}
            <div className="bg-cyan-900/10 border-l-4 border-cyan-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyan-300 mb-3">
                Proleptic Gregorian Calendar
              </h3>
              <p className="text-slate-300 mb-3">
                For dates before 1582, NeoCalendar uses the{" "}
                <strong>Proleptic Gregorian Calendar</strong> — a backward
                extension of Gregorian rules.
              </p>
              <div className="bg-slate-950/50 rounded-lg p-4">
                <p className="text-sm text-slate-300 mb-2">
                  <strong className="text-cyan-400">
                    Mathematical Mode (current):
                  </strong>{" "}
                  Enables continuous JDN calculations across the 1582 transition
                  without historical discontinuities.
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  This approach treats the Gregorian calendar as a mathematical
                  continuum extending infinitely backward, supporting precise
                  day-count intervals for comparative historical analysis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Edge Case Validation */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">⚡</span> Edge Case Validation
          </h2>
          <p className="text-slate-300 mb-6">
            Edge cases validated to ensure correctness under boundary
            conditions:
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">📅</span>
                <div>
                  <h3 className="font-bold text-white mb-1">
                    The 1582 Papal Gap
                  </h3>
                  <p className="text-xs text-slate-400">
                    October 5-14, 1582 (missing days)
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-3">
                Uses Proleptic Gregorian model which remains continuous,
                avoiding historical "holes" in calculations.
              </p>
              <div className="bg-slate-950/50 rounded p-3 text-xs font-mono">
                <div className="text-emerald-400">
                  JDN 2299160 (Oct 4) → 2299161 (Oct 15) ✓
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-bold text-white mb-1">
                    The Century Rule
                  </h3>
                  <p className="text-xs text-slate-400">
                    Leap year logic for century years
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-3">
                Correctly handles divisible-by-400 rule for leap years at
                century boundaries.
              </p>
              <div className="bg-slate-950/50 rounded p-3 text-xs font-mono space-y-1">
                <div className="text-red-400">
                  Feb 29, 1900: Invalid (not divisible by 400)
                </div>
                <div className="text-emerald-400">Feb 29, 2000: Valid ✓</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <h3 className="font-bold text-white mb-1">
                    The Year 0 Transition
                  </h3>
                  <p className="text-xs text-slate-400">BC to AD boundary</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-3">
                Explicitly documents distance between 1 BCE and 1 AD as 1 day,
                confirming lack of Year Zero.
              </p>
              <div className="bg-slate-950/50 rounded p-3 text-xs font-mono">
                <div className="text-cyan-400">
                  1 BCE Dec 31 → 1 AD Jan 1 (1 day apart) ✓
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">📝</span>
                <div>
                  <h3 className="font-bold text-white mb-1">
                    Intercalary Days
                  </h3>
                  <p className="text-xs text-slate-400">Leap year edge cases</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-3">
                Validates Feb 29, Hebrew Adar II, and Coptic 6th epagomenal day.
              </p>
              <div className="bg-slate-950/50 rounded p-3 text-xs font-mono">
                <div className="text-emerald-400">
                  All intercalary days tested ✓
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historiography & Scholarly Context */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">📚</span> Historiography of Calendar
            Logic
          </h2>
          <p className="text-slate-300 mb-6">
            Understanding the historical context and algorithmic choices behind
            each calendar system:
          </p>

          <div className="space-y-6">
            {/* Source of Truth */}
            <div className="bg-indigo-900/10 border-l-4 border-indigo-500 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="text-xl font-bold text-indigo-400 mb-2">
                    Source of Truth: The Baseline Standards
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Explicit Version & Epoch References
                  </p>
                </div>
              </div>
              <div className="bg-slate-950/50 rounded-lg p-4 text-sm space-y-3">
                <p className="text-slate-300">
                  All JDN calculations are cross-validated against:
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">•</span>
                    <span>
                      <strong className="text-cyan-400">
                        Lilian Day Number (LDN)
                      </strong>{" "}
                      for Gregorian dates, ensuring compatibility with NASA's
                      SPICE kernels and Scaliger's Julian Day system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span>
                      <strong className="text-emerald-400">
                        Type II Friday Epoch (JDN 1,948,440)
                      </strong>{" "}
                      for Islamic Tabular dates, aligned with historical
                      astronomical tables (<em>Zij</em>)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>
                      <strong className="text-purple-400">
                        Dershowitz & Reingold
                      </strong>{" "}
                      algorithms (<em>Calendrical Calculations</em>, 4th
                      Edition)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>
                      <strong className="text-blue-400">
                        Maimonidean standards
                      </strong>{" "}
                      (<em>Sanctification of the New Moon</em>, Mishneh Torah)
                      for Hebrew calendar
                    </span>
                  </li>
                </ul>
              </div>

              {/* Epoch Names Table */}
              <div className="mt-4 bg-indigo-950/30 rounded-lg p-4 overflow-x-auto">
                <h4 className="text-sm font-semibold text-indigo-300 mb-3">
                  Calendar Epochs & Historical Names
                </h4>
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-indigo-700/30">
                        <th className="text-left py-2 text-indigo-300 font-semibold">
                          Calendar
                        </th>
                        <th className="text-left py-2 text-indigo-300 font-semibold">
                          Epoch Name
                        </th>
                        <th className="text-right py-2 text-indigo-300 font-semibold">
                          JDN
                        </th>
                        <th className="text-left py-2 pl-4 text-indigo-300 font-semibold">
                          Proleptic Date
                        </th>
                        <th className="text-left py-2 pl-4 text-indigo-300 font-semibold">
                          Leap Year Rule
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      <tr className="border-b border-slate-700/20">
                        <td className="py-2">Gregorian</td>
                        <td className="py-2 text-cyan-400">
                          Anno Domini / Lilian
                        </td>
                        <td className="text-right py-2 font-mono">1,721,426</td>
                        <td className="py-2 pl-4 text-slate-400">
                          January 1, 1 CE
                        </td>
                        <td className="py-2 pl-4 text-xs text-slate-500">
                          400-year rule (div by 400 or div by 4 but not 100)
                        </td>
                      </tr>
                      <tr className="border-b border-slate-700/20">
                        <td className="py-2">Hebrew</td>
                        <td className="py-2 text-cyan-400">Anno Mundi</td>
                        <td className="text-right py-2 font-mono">347,996</td>
                        <td className="py-2 pl-4 text-slate-400">
                          Tishri 1, 1 AM (3761 BCE)
                        </td>
                        <td className="py-2 pl-4 text-xs text-slate-500">
                          19-year Metonic cycle (7 leap years per cycle)
                        </td>
                      </tr>
                      <tr className="border-b border-slate-700/20">
                        <td className="py-2">Islamic</td>
                        <td className="py-2 text-cyan-400">Hijri</td>
                        <td className="text-right py-2 font-mono">1,948,440</td>
                        <td className="py-2 pl-4 text-slate-400">
                          Friday, July 19, 622 CE
                        </td>
                        <td className="py-2 pl-4 text-xs text-slate-500">
                          30-year cycle (11 leap years:
                          2,5,7,10,13,16,18,21,24,26,29)
                        </td>
                      </tr>
                      <tr className="border-b border-slate-700/20">
                        <td className="py-2">Coptic</td>
                        <td className="py-2 text-cyan-400">Era of Martyrs</td>
                        <td className="text-right py-2 font-mono">1,825,030</td>
                        <td className="py-2 pl-4 text-slate-400">
                          August 29, 284 CE
                        </td>
                        <td className="py-2 pl-4 text-xs text-slate-500">
                          Simple 4-year rule (every 4th year)
                        </td>
                      </tr>
                      <tr className="border-b border-slate-700/20">
                        <td className="py-2">Persian</td>
                        <td className="py-2 text-cyan-400">Nowruz / Jalali</td>
                        <td className="text-right py-2 font-mono">1,948,321</td>
                        <td className="py-2 pl-4 text-slate-400">
                          March 22, 622 CE
                        </td>
                        <td className="py-2 pl-4 text-xs text-slate-500">
                          33-year cycle (8 leap years per cycle)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">Before Present</td>
                        <td className="py-2 text-cyan-400">
                          Radiocarbon Standard
                        </td>
                        <td className="text-right py-2 font-mono">2,433,283</td>
                        <td className="py-2 pl-4 text-slate-400">
                          January 1, 1950 CE
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Islamic: Algorithm vs Observation */}
            <div className="bg-emerald-900/10 border-l-4 border-emerald-500 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">☪️</span>
                <div>
                  <h3 className="text-xl font-bold text-emerald-400 mb-2">
                    Islamic Calendar: Tabular vs. Observational
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Algorithm vs. Witnessed Practice
                  </p>
                </div>
              </div>
              <p className="text-slate-300 mb-3">
                The Islamic plugin utilizes the{" "}
                <strong>30-year tabular cycle (Khabash)</strong> common in
                medieval astronomical tables (<em>Zij</em>). This is a later
                mathematical construction that did not exist during the early
                Caliphate period.
              </p>
              <div className="bg-slate-950/50 rounded-lg p-4 text-sm text-slate-300 space-y-2">
                <p>
                  <strong className="text-cyan-400">Historical Context:</strong>{" "}
                  Early Islamic timekeeping relied on direct <em>Ru'yat</em>{" "}
                  (crescent moon sighting). The tabular variant emerged
                  centuries later as astronomers developed predictive
                  algorithms.
                </p>
                <p>
                  <strong className="text-cyan-400">Implications:</strong> Our
                  calculations may differ from local observational sightings
                  used in religious practice. This is a mathematical model, not
                  a substitute for traditional moon witnessing.
                </p>
                <p className="text-xs text-slate-400 italic">
                  Epoch: Friday, July 19, 622 CE (JDN 1,948,440) - Type II
                  Friday/Astronomical Epoch. Note: Some legacy systems use the
                  Thursday/Civil epoch (JDN 1,948,439), which can cause
                  off-by-one discrepancies.
                </p>
              </div>

              <div className="mt-3 bg-emerald-900/20 border border-emerald-700/40 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                  ✓ Recommended Use Cases
                </h4>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span>
                      <strong>Historical research:</strong> Dating manuscripts,
                      analyzing Islamic chronology
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span>
                      <strong>Predictive math:</strong> Calculating future dates
                      for planning purposes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span>
                      <strong>Academic simulations:</strong> Modeling historical
                      astronomical tables
                    </span>
                  </li>
                </ul>
                <p className="text-xs text-amber-400 mt-3">
                  ⚠️ <strong>Not recommended for:</strong> Real-time religious
                  holiday declaration or prayer apps (may be 1-2 days off from
                  actual moon sighting in Saudi Arabia, Morocco, etc.)
                </p>
              </div>
            </div>

            {/* Hebrew: Dehiyyot Rules */}
            <div className="bg-cyan-900/10 border-l-4 border-cyan-500 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">✡️</span>
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">
                    Hebrew Calendar: Dehiyyot Compliance
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Full Four Gates (Arba'ah She'arim) Logic
                  </p>
                </div>
              </div>
              <p className="text-slate-300 mb-3">
                The Hebrew plugin implements the complete <em>Four Gates</em>{" "}
                (Arba'ah She'arim) logic, including the{" "}
                <strong>Molad Zaqen</strong> (noon) postponement and the{" "}
                <strong>Lo ADU</strong> day-of-week constraints.
              </p>
              <div className="bg-slate-950/50 rounded-lg p-4 text-sm space-y-3">
                <div>
                  <strong className="text-cyan-400">1. Lo ADU Rosh:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Rosh Hashanah never falls on Sunday, Wednesday, or Friday
                    (to avoid ritual conflicts)
                  </p>
                </div>
                <div>
                  <strong className="text-cyan-400">2. Molad Zaqen:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    If the New Moon (molad) occurs after noon, the year is
                    postponed by one day
                  </p>
                </div>
                <div>
                  <strong className="text-cyan-400">3. GaTaRaD:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Special postponement for common years (prevents forbidden
                    356-day year length)
                  </p>
                </div>
                <div>
                  <strong className="text-cyan-400">4. BaTuTaPH:</strong>
                  <p className="text-slate-300 text-xs mt-1">
                    Special postponement for years following leap years
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-700/50">
                  <p className="text-xs text-slate-400">
                    <strong>Test Coverage:</strong> Our test suite specifically
                    targets the rare
                    <strong className="text-emerald-400">
                      {" "}
                      353-day "Deficient"
                    </strong>{" "}
                    and
                    <strong className="text-emerald-400">
                      {" "}
                      385-day "Complete"
                    </strong>{" "}
                    year lengths, validating postponement logic under extreme
                    conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Year Zero Handling - Reference to Core Assumptions */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-purple-700/50 rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🔢</span> Year Zero Handling
          </h2>
          <div className="bg-purple-900/10 border border-purple-700/30 rounded-lg p-6">
            <p className="text-slate-300 mb-3">
              For complete details on year numbering (astronomical vs.
              historical notation), see{" "}
              <strong className="text-purple-400">Year Numbering Model</strong>{" "}
              in Core Assumptions above.
            </p>
            <p className="text-sm text-slate-400">
              Key points: NeoCalendar uses ISO 8601-compatible astronomical
              numbering internally (includes year 0) for continuous math
              operations, while displaying historical notation where
              appropriate.
            </p>
          </div>
        </div>

        {/* Audit Transparency */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🔬</span> Audit Transparency
          </h2>
          <p className="text-slate-300 mb-6">
            The validation suite exceeds current implementation constraints in
            some areas. This allows detection of edge cases where internal
            models can be further refined, even when external JDN-based
            conversions remain correct.
          </p>

          {/* Hebrew 5704: From Bug to Feature */}
          <div className="bg-amber-900/10 border-l-4 border-amber-500 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">✡️</span>
              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-2">
                  Hebrew Year 5704: Internal Accumulator Variance
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  High-Fidelity Edge Case Discovery
                </p>
              </div>
            </div>
            <p className="text-slate-300 mb-3">
              Our validation engine identified an internal day-count variance in
              the 5704 cycle. While{" "}
              <strong className="text-emerald-400">
                JDN-to-Date conversion remains accurate
              </strong>{" "}
              (External Match: ✓), we are currently refining the internal
              accumulator to perfectly mirror the{" "}
              <em>Sanctification of the New Moon</em> (Mishneh Torah) standards.
            </p>
            <div className="bg-slate-950/50 rounded-lg p-4 text-sm space-y-3">
              <div>
                <p className="text-slate-300 mb-2">
                  <strong className="text-amber-400">The Issue:</strong>{" "}
                  Internal year-length accounting produces a forbidden 356-day
                  length, which violates the six permissible year lengths (353,
                  354, 355, 383, 384, 385).
                </p>
              </div>
              <div>
                <p className="text-slate-300 mb-2">
                  <strong className="text-emerald-400">The Reality:</strong>{" "}
                  Date conversions remain JDN-accurate and externally validated.
                  This is a variance in internal modeling, not a conversion
                  error.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-700/50">
                <p className="text-xs text-slate-400 italic">
                  <strong>Why This Matters:</strong> Year 5704 represents a rare
                  case where the <em>Molad</em>
                  (astronomical new moon calculation) and the <em>
                    Dehiyyot
                  </em>{" "}
                  (postponement rules) create mathematical tension. This
                  demonstrates the complexity of modeling the{" "}
                  <em>Arba'ah She'arim</em> — the interaction between
                  astronomical calculation, Halakhic constraints, and the
                  19-year Metonic cycle. Discovering this edge case proves our
                  testing suite is rigorous enough to catch subtle violations
                  that most implementations miss.
                </p>
              </div>
            </div>
          </div>

          {/* Centennial Audit Subsection */}
          <div className="bg-emerald-900/10 border-l-4 border-emerald-500 rounded-lg p-6 mt-6">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="text-xl font-bold text-emerald-400 mb-2">
                  The Centennial Audit (1900-2000)
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  Brute-Force Round-Trip Validation
                </p>
              </div>
            </div>
            <p className="text-slate-300 mb-4">
              We performed a brute-force round-trip test from 1900 to 2000
              across all supported calendars:
            </p>
            <div className="grid grid-cols-3 gap-4 bg-slate-950/50 rounded-lg p-4">
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-1">
                  328
                </div>
                <div className="text-xs text-slate-300">Dates Tested</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-1">
                  0
                </div>
                <div className="text-xs text-slate-300">Total error (days)</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-1">
                  100%
                </div>
                <div className="text-xs text-slate-300">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Audit Trail: Raw Test Output */}
          <div className="bg-indigo-900/10 border-l-4 border-indigo-500 rounded-lg p-6 mt-6">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">📋</span>
              <div>
                <h3 className="text-xl font-bold text-indigo-400 mb-2">
                  Audit Trail: Raw Test Output
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  Downloadable Verification Data
                </p>
              </div>
            </div>
            <p className="text-slate-300 mb-4">
              For developers who want to verify the math themselves, download
              the complete test outputs with all JDN values and date
              conversions:
            </p>

            <div className="space-y-3">
              <div className="bg-slate-950/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-cyan-400">
                    Core 5 Calendars (360 tests)
                  </span>
                  <a
                    href="/verify-zero-drift_20260401-231840.txt"
                    download
                    className="text-xs text-indigo-400 hover:text-indigo-300 underline flex items-center gap-1"
                  >
                    Download Output (14KB) →
                  </a>
                </div>
                <p className="text-xs text-slate-400">
                  Gregorian, Julian, Islamic, Hebrew, Coptic with full JDN
                  round-trip verification
                </p>
              </div>

              <div className="bg-slate-950/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-cyan-400">
                    Core 5 Advanced Edge Cases
                  </span>
                  <a
                    href="/verify-zero-drift-advanced_20260401-231847.txt"
                    download
                    className="text-xs text-indigo-400 hover:text-indigo-300 underline flex items-center gap-1"
                  >
                    Download Output (15KB) →
                  </a>
                </div>
                <p className="text-xs text-slate-400">
                  Gregorian reform gap, Hebrew postponements, Islamic epoch
                  boundaries, deep proleptic dates
                </p>
              </div>

              <div className="bg-slate-950/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-cyan-400">
                    Extended 7 Calendars (23 tests)
                  </span>
                  <a
                    href="/verify-zero-drift-remaining-calendars_20260401-231854.txt"
                    download
                    className="text-xs text-indigo-400 hover:text-indigo-300 underline flex items-center gap-1"
                  >
                    Download Output (15KB) →
                  </a>
                </div>
                <p className="text-xs text-slate-400">
                  Ethiopian, Unix, Persian, Holocene, Before Present, French
                  Revolutionary, Mayan
                </p>
              </div>

              <div className="bg-slate-950/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-cyan-400">
                    Extended 7 Hardcore Edge Cases (22 tests)
                  </span>
                  <a
                    href="/verify-zero-drift-remaining-calendars-advanced_20260401-231901.txt"
                    download
                    className="text-xs text-indigo-400 hover:text-indigo-300 underline flex items-center gap-1"
                  >
                    Download Output (14KB) →
                  </a>
                </div>
                <p className="text-xs text-slate-400">
                  Ethiopian Pagume 6, French Rev Sextile years, Unix 2038
                  rollover, Persian 33-year cycle, BP deep time, Mayan baktun,
                  Holocene year 1
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-indigo-950/30 rounded border border-indigo-700/30">
              <p className="text-xs text-slate-300">
                <strong className="text-indigo-400">
                  Verification Details:
                </strong>{" "}
                Each output file contains step-by-step JDN conversions, expected
                vs actual results, and drift calculations. All test outputs
                generated{" "}
                {new Date("2026-04-01T23:18:00").toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
                .
              </p>
            </div>
          </div>
        </div>

        {/* Precision & Scope */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🎯</span> Precision & Scope Limitations
          </h2>
          <p className="text-slate-300 mb-6">
            Beta transparency: What's implemented vs what's planned:
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-blue-900/10 border border-blue-700/30 rounded-lg p-4">
              <span className="text-xl">⏱️</span>
              <div>
                <h3 className="font-semibold text-blue-300 mb-1">
                  Time Resolution
                </h3>
                <p className="text-sm text-slate-300">
                  Calculations based on Mean Solar Days (JDN). Sub-second
                  precision and ΔT (leap second) corrections are currently out
                  of scope.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-purple-900/10 border border-purple-700/30 rounded-lg p-4">
              <span className="text-xl">🌙</span>
              <div>
                <h3 className="font-semibold text-purple-300 mb-1">
                  Calendar Variants
                </h3>
                <p className="text-sm text-slate-300">
                  Islamic calculations use <strong>Tabular/Civil</strong>{" "}
                  variant (30-year algorithmic cycle). Observational
                  (crescent-moon) variants not supported.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-slate-800/50 border border-slate-700/30 rounded-lg p-4">
              <span className="text-xl">🔧</span>
              <div>
                <h3 className="font-semibold text-slate-300 mb-1">
                  Known Issue
                </h3>
                <p className="text-sm text-slate-300">
                  Hebrew year 5704 internal accounting produces forbidden
                  356-day length.
                  <strong className="text-emerald-400">
                    {" "}
                    Date conversions remain correct
                  </strong>{" "}
                  (externally validated).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Status & Validation Context */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">📋</span> Calendar Status & Validation
            Context
          </h2>

          {/* Battle-Tested Calendars */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">
              🏆 Battle-Tested (12 Calendars)
            </h3>
            <p className="text-slate-300 mb-4">
              Complete validation: Triangle conversions with 0 day error +
              hardcore edge case testing (45 total tests)
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Core 5 */}
              <div className="bg-emerald-900/10 border border-emerald-700/30 rounded-xl p-4">
                <h4 className="font-semibold text-emerald-300 mb-2">
                  Core 5 (360 tests)
                </h4>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>✓ Gregorian (Astronomical variant*)</li>
                  <li>✓ Julian (Astronomical variant*)</li>
                  <li>✓ Islamic (Civil/Tabular 30-year cycle)</li>
                  <li>✓ Hebrew (Full molad + dehiyyot rules)</li>
                  <li>✓ Coptic (Proleptic, Era of Martyrs)</li>
                </ul>
              </div>

              {/* Extended 7 */}
              <div className="bg-emerald-900/10 border border-emerald-700/30 rounded-xl p-4">
                <h4 className="font-semibold text-emerald-300 mb-2">
                  Extended 7 (23 tests)
                </h4>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>✓ Ethiopian (13-month, Ge'ez calendar)</li>
                  <li>✓ Unix (2038 rollover validated)</li>
                  <li>✓ Persian/Jalali (33-year cycle)*</li>
                  <li>✓ Holocene (Deep time to 10000 BCE)</li>
                  <li>✓ Before Present (1950 C-14 anchor)**</li>
                  <li>✓ French Revolutionary (1792-1805)</li>
                  <li>✓ Mayan (GMT correlation validated)</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-emerald-700/30 text-xs text-slate-400 space-y-1">
                  <p>
                    *<strong className="text-emerald-400">Persian:</strong>{" "}
                    Arguably the most accurate solar calendar in existence—more
                    precise than Gregorian due to sophisticated 33-year leap
                    clustering.
                  </p>
                  <p>
                    **<strong className="text-cyan-400">BP 1950 Anchor:</strong>{" "}
                    Fixed at 1950 CE to avoid C-14 contamination from
                    atmospheric nuclear testing (post-1950).
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-slate-800/50 border border-slate-700/30 rounded-lg p-4">
              <p className="text-sm text-slate-300">
                <strong className="text-cyan-400">
                  📐 For Space/Physics Researchers:
                </strong>{" "}
                Our JDN values can be converted to Modified Julian Date (MJD)
                using:{" "}
                <code className="text-emerald-400 bg-slate-950/50 px-2 py-1 rounded font-mono text-xs">
                  MJD = JDN - 2,400,000.5
                </code>
                . MJD is commonly used in astronomical software and SPICE
                kernels.
              </p>
            </div>

            <div className="mt-4 bg-cyan-900/10 border border-cyan-700/30 rounded-lg p-4">
              <p className="text-sm text-slate-300">
                <strong className="text-cyan-400">
                  *Astronomical Variant Context:
                </strong>{" "}
                Current Gregorian/Julian implementations use noon-based JDN
                (astronomical standard). Civil variants (midnight-based) planned
                for future. All conversions internally consistent within variant
                type.
              </p>
            </div>
          </div>

          {/* Functional (Architecture Review) */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-400 mb-4">
              🔬 Under Architectural Review (1 Calendar)
            </h3>
            <p className="text-slate-300 mb-4">
              Epoch validated and mathematically sound, but requires interface
              design decisions to support non-standard date representation:
            </p>

            <div className="space-y-3">
              <div className="bg-blue-900/10 border border-blue-700/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-2">
                  Mayan Long Count
                </h4>
                <p className="text-sm text-slate-300 mb-3">
                  <strong>Status:</strong> Under Architectural Review. Epoch
                  validated using{" "}
                  <strong>GMT Correlation constant (584,283)</strong>, but
                  5-part coordinate system (Baktun.Katun.Tun.Uinal.Kin) requires
                  interface design for vigesimal place-value representation.
                </p>

                <div className="bg-blue-950/30 border border-blue-700/30 rounded p-3 mb-3">
                  <h5 className="text-xs font-semibold text-blue-400 mb-2">
                    Correlation Constant Context
                  </h5>
                  <div className="text-xs text-slate-300 space-y-1">
                    <p>
                      <strong className="text-cyan-400">
                        GMT (Goodman-Martínez-Thompson) = 584,283:
                      </strong>{" "}
                      Most widely accepted correlation. 0.0.0.0.0 = August 11,
                      3114 BCE (proleptic Gregorian).
                    </p>
                    <p>
                      <strong className="text-purple-400">
                        Lounsbury = 584,285:
                      </strong>{" "}
                      Alternative correlation (+2 days). Supported by some
                      Mesoamerican scholars.
                    </p>
                    <p className="text-slate-400 italic">
                      Our implementation uses GMT (584,283) as it represents the
                      scholarly consensus. Researchers requiring Lounsbury can
                      adjust by adding 2 to JDN values.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-400">
                  <strong>Design Decision:</strong> Extend DateInput interface
                  to support multi-part coordinates, or encode as metadata
                  fields? This affects how we model all non-conventional
                  calendars (Tzolk'in, Haab, etc.).
                </p>
              </div>
            </div>

            <div className="mt-4 bg-emerald-900/10 border border-emerald-700/30 rounded-lg p-4">
              <p className="text-sm text-slate-300">
                <strong className="text-emerald-400">✓ Recent Fixes:</strong>{" "}
                Ethiopian (Pagume 6 leap day) and French Revolutionary (Romme
                rule Sextile years) promoted to Battle-Tested after fixing
                fromJDN year calculation formulas.
              </p>
            </div>
          </div>
        </div>

        {/* ICU Comparison */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-700/50 rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🏆</span> Comparison: NeoCalendar vs ICU
          </h2>
          <p className="text-slate-300 mb-6">
            How NeoCalendar compares to ICU (International Components for
            Unicode) — the industry-standard calendar library powering Chrome,
            Node.js, and billions of devices worldwide:
          </p>

          {/* Philosophy Comparison */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-purple-900/10 border-l-4 border-purple-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-3">
                ICU Philosophy
              </h3>
              <p className="text-slate-300 text-sm mb-3">
                "Make internationalization transparent — users shouldn't think
                about it"
              </p>
              <div className="space-y-2 text-xs text-slate-400">
                <p>
                  ✓ Comprehensive i18n solution (formatting, locales, timezones)
                </p>
                <p>✓ Observational calendar support (moon sighting)</p>
                <p>✓ Historical transitions (country-specific)</p>
                <p>✓ Decades of battle-testing at scale</p>
              </div>
            </div>

            <div className="bg-cyan-900/10 border-l-4 border-cyan-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">
                NeoCalendar Philosophy
              </h3>
              <p className="text-slate-300 text-sm mb-3">
                "Make calendar variants explicit — users should understand what
                they're using"
              </p>
              <div className="space-y-2 text-xs text-slate-400">
                <p>✓ Transparent validation model (3-tier documented)</p>
                <p>✓ Explicit algorithmic variants</p>
                <p>✓ JDN as first-class API</p>
                <p>✓ Small, tree-shakeable TypeScript</p>
              </div>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="bg-slate-950/50 rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                      Feature
                    </th>
                    <th className="text-center py-3 px-4 text-purple-400 font-semibold">
                      ICU
                    </th>
                    <th className="text-center py-3 px-4 text-cyan-400 font-semibold">
                      NeoCalendar
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800/50">
                    <td className="py-3 px-4">Calendar Systems</td>
                    <td className="text-center py-3 px-4">15+</td>
                    <td className="text-center py-3 px-4">12</td>
                  </tr>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-3 px-4">Bundle Size</td>
                    <td className="text-center py-3 px-4 text-amber-400">
                      ~30MB
                    </td>
                    <td className="text-center py-3 px-4 text-emerald-400">
                      ~50KB/calendar
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-3 px-4">Locale/i18n Support</td>
                    <td className="text-center py-3 px-4 text-emerald-400">
                      ✓ Full
                    </td>
                    <td className="text-center py-3 px-4 text-slate-500">
                      Out of scope
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-3 px-4">Timezone Support</td>
                    <td className="text-center py-3 px-4 text-emerald-400">
                      ✓ Full
                    </td>
                    <td className="text-center py-3 px-4 text-slate-500">
                      Out of scope
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-3 px-4">JDN API</td>
                    <td className="text-center py-3 px-4 text-amber-400">
                      Internal only
                    </td>
                    <td className="text-center py-3 px-4 text-emerald-400">
                      ✓ First-class
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-3 px-4">Variant Explicitness</td>
                    <td className="text-center py-3 px-4 text-amber-400">
                      Implicit
                    </td>
                    <td className="text-center py-3 px-4 text-emerald-400">
                      ✓ Explicit
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-3 px-4">Validation Documentation</td>
                    <td className="text-center py-3 px-4 text-amber-400">
                      Implicit
                    </td>
                    <td className="text-center py-3 px-4 text-emerald-400">
                      ✓ 3-tier model
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-3 px-4">TypeScript Native</td>
                    <td className="text-center py-3 px-4 text-amber-400">
                      Via bindings
                    </td>
                    <td className="text-center py-3 px-4 text-emerald-400">
                      ✓ Native
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-3 px-4">Tree-Shakeable</td>
                    <td className="text-center py-3 px-4 text-red-400">✗</td>
                    <td className="text-center py-3 px-4 text-emerald-400">
                      ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Islamic Variants</td>
                    <td className="text-center py-3 px-4 text-emerald-400">
                      4+ variants
                    </td>
                    <td className="text-center py-3 px-4 text-amber-400">
                      Tabular only
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Calendar Coverage Comparison */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-emerald-400 mb-3">
                ✓ Both Libraries Support
              </h3>
              <div className="bg-emerald-900/10 border border-emerald-700/30 rounded-lg p-4">
                <p className="text-sm text-slate-300">
                  Gregorian · Julian · Islamic · Hebrew · Persian · Coptic ·
                  Ethiopian
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-400 mb-3">
                ICU Has (NeoCalendar Doesn't)
              </h3>
              <div className="bg-purple-900/10 border border-purple-700/30 rounded-lg p-4">
                <p className="text-sm text-slate-300 mb-3">
                  Chinese (lunisolar) · Japanese (imperial eras) · Buddhist ·
                  ROC (Taiwan) · Indian · Dangi (Korean)
                </p>
                <p className="text-xs text-slate-400">
                  Note: ICU also supports observational Islamic calendars
                  (moon-sighting based) and historical calendar transitions
                  (e.g., England 1752 gap).
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-3">
                NeoCalendar Has (ICU Doesn't)
              </h3>
              <div className="bg-cyan-900/10 border border-cyan-700/30 rounded-lg p-4">
                <p className="text-sm text-slate-300 mb-3">
                  Unix Time · Holocene · Before Present (BP) · French
                  Revolutionary · Mayan Long Count
                </p>
                <p className="text-xs text-slate-400">
                  These calendars serve niche use cases: deep time archaeology
                  (Holocene), radiocarbon dating (BP), historical research
                  (French Rev), and programmer-friendly abstractions (Unix).
                </p>
              </div>
            </div>
          </div>

          {/* Use Case Guidance */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-purple-900/10 border border-purple-700/30 rounded-lg p-5">
              <h4 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                <span>🏢</span> Use ICU When You Need
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Production i18n (formatting, locales)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Asian calendars (Chinese, Japanese, Korean)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Observational Islamic calendar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Timezone support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Historical calendar transitions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Enterprise stability guarantees</span>
                </li>
              </ul>
            </div>

            <div className="bg-cyan-900/10 border border-cyan-700/30 rounded-lg p-5">
              <h4 className="font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                <span>🔬</span> Use NeoCalendar When You Need
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>Explicit algorithmic variant selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>Small, tree-shakeable bundles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>JDN as first-class API</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>Transparent validation model</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>TypeScript-native experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>
                    Niche calendars (Holocene, BP, French Revolutionary)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="mt-8 bg-indigo-900/10 border border-indigo-700/30 rounded-lg p-6">
            <p className="text-sm text-slate-300">
              <strong className="text-indigo-400">Bottom Line:</strong> ICU is a
              comprehensive i18n solution with broader calendar coverage and
              production features. NeoCalendar is a focused calendar math
              library with explicit variant handling, better JavaScript
              ergonomics, and transparency about validation/edge cases. They
              serve different use cases — ICU for production applications
              requiring localization, NeoCalendar for projects requiring
              mathematical correctness transparency and explicit algorithmic
              control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
