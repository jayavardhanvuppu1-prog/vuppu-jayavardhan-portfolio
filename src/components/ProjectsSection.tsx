import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Code2, ExternalLink, Play, X } from 'lucide-react';
import { GITHUB_PROFILE_URL, PROJECTS_DATA } from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Interactive Grade Calculator tester state
  const [marksInput, setMarksInput] = useState('88, 92, 79, 85, 91');

  // Interactive Basic Calculator tester state
  const [numA, setNumA] = useState('24');
  const [numB, setNumB] = useState('6');
  const [operator, setOperator] = useState<'+' | '-' | '*' | '/'>('+');

  useEffect(() => {
    if (!activeProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject]);

  const computeGradeResult = () => {
    const parts = marksInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number);

    if (parts.length === 0 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 100)) {
      return { error: 'Enter comma-separated marks between 0 and 100.' };
    }

    const avg = parts.reduce((acc, val) => acc + val, 0) / parts.length;
    let grade = 'F';
    if (avg >= 90) grade = 'A+';
    else if (avg >= 80) grade = 'A';
    else if (avg >= 70) grade = 'B';
    else if (avg >= 60) grade = 'C';
    else if (avg >= 50) grade = 'D';

    return {
      average: avg.toFixed(2),
      grade,
      count: parts.length,
    };
  };

  const computeArithmeticResult = () => {
    const a = Number(numA);
    const b = Number(numB);
    if (Number.isNaN(a) || Number.isNaN(b) || numA.trim() === '' || numB.trim() === '') {
      return 'Enter valid numeric values.';
    }
    if (operator === '+') return String(Number((a + b).toFixed(4)));
    if (operator === '-') return String(Number((a - b).toFixed(4)));
    if (operator === '*') return String(Number((a * b).toFixed(4)));
    if (operator === '/') {
      return b === 0 ? 'Cannot divide by zero' : String(Number((a / b).toFixed(4)));
    }
    return 'Unsupported operator';
  };

  const gradeResult = computeGradeResult();
  const arithmeticResult = computeArithmeticResult();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-white/10 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-400">03. Projects</p>
            <h2
              id="projects-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance"
            >
              Early learning builds &amp; practice code
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-300">
              Focused beginner Python projects built to strengthen logic, structure, and clean
              problem-solving.
            </p>
          </div>

          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center gap-2 self-start rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 transition-colors duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 whitespace-nowrap shrink-0"
          >
            <span>View GitHub Profile</span>
            <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {PROJECTS_DATA.map((project, idx) => {
            const isInProgress = project.status === 'In Progress';
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0C142B]/70 p-6 sm:p-8 backdrop-blur-md transition-colors duration-150 hover:border-blue-400/35"
              >
                <div>
                  {/* Quiet 1-line text metadata above title — zero pill enclosures */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-slate-400">{project.subtitle}</span>
                    <span
                      className={`font-medium ${
                        isInProgress ? 'text-amber-300' : 'text-blue-300'
                      }`}
                    >
                      Status: {project.status}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-bold text-white">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                    {project.description}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-xs font-medium text-slate-400">What I Practiced</p>
                    <ul className="mt-2.5 space-y-2 text-sm text-slate-200">
                      {project.learningOutcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 rounded-full bg-purple-400 shrink-0"
                          />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <p className="text-xs font-mono text-slate-400">
                    {project.stack.join(' · ')}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span>Inspect &amp; Test Logic</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Project Inspection & Interactive Logic Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#040711]/80 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveProject(null);
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0B1226] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-blue-300">
                  {activeProject.subtitle}
                  <span aria-hidden="true" className="mx-1.5 text-slate-500">·</span>
                  <span
                    className={
                      activeProject.status === 'In Progress'
                        ? 'text-amber-300'
                        : 'text-blue-300'
                    }
                  >
                    {activeProject.status}
                  </span>
                </p>
                <h3
                  id="modal-project-title"
                  className="mt-1.5 font-display text-2xl font-bold text-white"
                >
                  {activeProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {activeProject.description}
            </p>

            {/* Python Reference Snippet */}
            <div className="mt-6">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Code2 className="h-3.5 w-3.5 text-blue-400" />
                <span>Python Logic Reference</span>
              </div>
              <pre className="mt-2 overflow-x-auto rounded-xl border border-white/10 bg-[#060B18] p-4 font-mono text-xs leading-relaxed text-slate-200">
                <code>{activeProject.codeSnippet}</code>
              </pre>
            </div>

            {/* Interactive Client-Side Logic Tester */}
            <div className="mt-6 border-t border-white/10 pt-6">
              <h4 className="font-display text-sm font-semibold text-white">
                Interactive Logic Tester
              </h4>
              <p className="mt-1 text-xs text-slate-400">
                Runs locally in your browser to demonstrate the exact calculation logic.
              </p>

              {activeProject.id === 'grade-calculator' ? (
                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="marks-input"
                      className="block text-xs font-medium text-slate-300"
                    >
                      Subject Marks (0–100, comma-separated)
                    </label>
                    <input
                      id="marks-input"
                      type="text"
                      value={marksInput}
                      onChange={(e) => setMarksInput(e.target.value)}
                      placeholder="e.g., 85, 90, 78, 92"
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#060B18] px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                    />
                  </div>

                  {'error' in gradeResult ? (
                    <p className="text-xs font-medium text-amber-300">{gradeResult.error}</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
                      <div>
                        <p className="text-xs text-slate-400">Subjects</p>
                        <p className="mt-1 font-mono text-lg font-semibold text-white tabular-nums">
                          {gradeResult.count}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Average %</p>
                        <p className="mt-1 font-mono text-lg font-semibold text-blue-300 tabular-nums">
                          {gradeResult.average}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Grade</p>
                        <p className="mt-1 font-mono text-lg font-semibold text-purple-300">
                          {gradeResult.grade}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="calc-num-a"
                        className="block text-xs font-medium text-slate-300"
                      >
                        First Number
                      </label>
                      <input
                        id="calc-num-a"
                        type="number"
                        value={numA}
                        onChange={(e) => setNumA(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#060B18] px-3 py-2 font-mono text-sm text-white focus:border-blue-400 focus:outline-none tabular-nums"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="calc-op"
                        className="block text-xs font-medium text-slate-300"
                      >
                        Operation
                      </label>
                      <select
                        id="calc-op"
                        value={operator}
                        onChange={(e) =>
                          setOperator(e.target.value as '+' | '-' | '*' | '/')
                        }
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#060B18] px-3 py-2 font-mono text-sm text-white focus:border-blue-400 focus:outline-none"
                      >
                        <option value="+">+ (Add)</option>
                        <option value="-">- (Subtract)</option>
                        <option value="*">* (Multiply)</option>
                        <option value="/">/ (Divide)</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="calc-num-b"
                        className="block text-xs font-medium text-slate-300"
                      >
                        Second Number
                      </label>
                      <input
                        id="calc-num-b"
                        type="number"
                        value={numB}
                        onChange={(e) => setNumB(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#060B18] px-3 py-2 font-mono text-sm text-white focus:border-blue-400 focus:outline-none tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs text-slate-400">Result</p>
                    <p className="mt-1 font-mono text-xl font-semibold text-blue-300 tabular-nums">
                      {arithmeticResult}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
