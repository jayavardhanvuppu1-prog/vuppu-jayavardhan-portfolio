import { motion } from 'motion/react';
import { Edit3, GraduationCap, Target, Compass } from 'lucide-react';
import type { EditableProfileDetails } from '../types/portfolio';

interface AboutSectionProps {
  details: EditableProfileDetails;
  onOpenEditor: () => void;
}

export function AboutSection({ details, onOpenEditor }: AboutSectionProps) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-white/10 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-400">01. About Me</p>
            <h2
              id="about-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance"
            >
              Education, curiosity, and engineering goals
            </h2>
          </div>

          <button
            type="button"
            onClick={onOpenEditor}
            className="inline-flex min-h-[40px] items-center gap-2 self-start rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 transition-colors duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Edit3 className="h-3.5 w-3.5 text-blue-400" />
            <span>Edit Academic Placeholders</span>
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Narrative & Interests */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0C142B]/70 p-6 sm:p-8 backdrop-blur-md"
          >
            <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
              <Compass className="h-4 w-4 text-blue-400" />
              <span>Who I Am &amp; What Drives Me</span>
            </div>

            <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-300">
              <p>
                I&apos;m <strong className="font-semibold text-white">Vuppu Jayavardhan</strong>,
                a first-year B.Tech Computer Science student building a disciplined foundation in
                software engineering and artificial intelligence.
              </p>
              <p>
                My primary interests lie in <strong className="font-semibold text-white">Python programming</strong>,{' '}
                <strong className="font-semibold text-white">Artificial Intelligence &amp; Machine Learning</strong>,
                and <strong className="font-semibold text-white">web development</strong>. Right now,
                I am focused on mastering fundamentals—writing clear logic, understanding how web
                interfaces are structured with HTML and CSS, and exploring how Generative AI works
                under the hood.
              </p>
              <p>
                Rather than rushing into complex frameworks before understanding the basics, I
                prefer learning step by step through small, honest projects and steady practice.
              </p>
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
                <Target className="h-4 w-4 text-purple-400" />
                <span>Career Goals</span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                Grow into an AI Engineer capable of designing reliable machine learning systems and
                thoughtful user-facing applications—starting by strengthening my computer science
                fundamentals, data structures, and Python problem-solving across my B.Tech years.
              </p>
            </div>
          </motion.div>

          {/* Education Card with Editable Placeholders */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0C142B]/70 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-white">
                <GraduationCap className="h-4 w-4 text-blue-400" />
                <span>Education Details</span>
              </div>

              <dl className="mt-6 divide-y divide-white/10">
                <div className="pb-4">
                  <dt className="text-xs font-medium text-slate-400">Degree Program</dt>
                  <dd className="mt-1 text-base font-semibold text-white">
                    B.Tech in Computer Science
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs font-medium text-slate-400">Academic Year</dt>
                  <dd className="mt-1 text-base font-medium text-slate-200 tabular-nums">
                    First Year (Undergraduate)
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs font-medium text-slate-400">College / University</dt>
                  <dd className="mt-1">
                    {details.collegeName ? (
                      <span className="text-base font-medium text-white">
                        {details.collegeName}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={onOpenEditor}
                        className="text-left text-sm italic text-slate-400 underline decoration-dashed underline-offset-4 hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        [Add your college or university name]
                      </button>
                    )}
                  </dd>
                </div>

                <div className="pt-4">
                  <dt className="text-xs font-medium text-slate-400">Registration Number</dt>
                  <dd className="mt-1">
                    {details.registrationNumber ? (
                      <span className="font-mono text-sm font-medium text-white tabular-nums">
                        {details.registrationNumber}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={onOpenEditor}
                        className="text-left font-mono text-xs italic text-slate-400 underline decoration-dashed underline-offset-4 hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        [Add your registration number]
                      </button>
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            <p className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-400">
              Placeholder fields are stored locally in your browser when edited—no institutional
              details are pre-filled or invented.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
