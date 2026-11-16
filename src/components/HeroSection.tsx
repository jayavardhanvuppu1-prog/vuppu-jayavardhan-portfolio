import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, User } from 'lucide-react';
import { GITHUB_HANDLE, GITHUB_PROFILE_URL, PROFILE_PHOTO_PATH } from '../data/portfolioData';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      {/* Ambient electric blue & purple backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 -z-10 h-[480px] w-[780px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-purple-600/20 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <p className="text-sm font-medium tracking-wide text-blue-300">
              First-Year B.Tech Computer Science Student
              <span aria-hidden="true" className="mx-2 text-slate-500">·</span>
              Aspiring AI Engineer
            </p>

            <h1
              id="hero-heading"
              className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08] text-balance"
            >
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Vuppu Jayavardhan
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              I&apos;m beginning my undergraduate journey in Computer Science with a strong
              curiosity for Artificial Intelligence, Python programming, and modern web
              development. I focus on building clean foundational projects and turning early
              concepts into working code.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/50 transition-all duration-150 hover:from-blue-500 hover:to-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur-md transition-colors duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 whitespace-nowrap shrink-0 cursor-pointer"
              >
                About My Journey
              </button>

              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 px-2 py-2 text-sm font-medium text-slate-300 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg whitespace-nowrap shrink-0"
              >
                <span>GitHub</span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
              </a>
            </div>
          </motion.div>

          {/* Right column: Circular Profile Photo with professional border & subtle shadow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative flex flex-col items-center">
              {/* Subtle radial glow behind portrait */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 scale-105 rounded-full bg-gradient-to-tr from-blue-500/25 via-indigo-500/15 to-purple-500/25 blur-2xl"
              />

              {/* Circular gradient border ring + shadow */}
              <div className="rounded-full bg-gradient-to-br from-blue-400/80 via-indigo-500/70 to-purple-500/80 p-[3px] shadow-[0_20px_50px_-12px_rgba(59,130,246,0.38)]">
                <div className="h-56 w-56 sm:h-68 sm:w-68 lg:h-80 lg:w-80 overflow-hidden rounded-full bg-[#0C142B] ring-4 ring-[#060B18]">
                  {!imageError ? (
                    <img
                      src={PROFILE_PHOTO_PATH}
                      alt="Portrait of Vuppu Jayavardhan, first-year B.Tech Computer Science student"
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                      className="h-full w-full rounded-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300">
                      <User className="h-14 w-14 text-blue-400/80" />
                      <span className="mt-2 text-xs font-medium text-slate-400">
                        Vuppu Jayavardhan
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width summary strip below Hero split */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10 pt-8">
          <div className="rounded-xl border border-white/10 bg-[#0C142B]/60 p-5 backdrop-blur-md">
            <p className="text-xs font-medium text-slate-400">Academic Status</p>
            <p className="mt-1.5 font-display text-base font-semibold text-white tabular-nums">
              1st-Year B.Tech CS
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0C142B]/60 p-5 backdrop-blur-md">
            <p className="text-xs font-medium text-slate-400">Career Direction</p>
            <p className="mt-1.5 font-display text-base font-semibold text-white">
              AI &amp; ML Engineering
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0C142B]/60 p-5 backdrop-blur-md">
            <p className="text-xs font-medium text-slate-400">Core Learning Stack</p>
            <p className="mt-1.5 font-display text-base font-semibold text-white">
              Python · HTML · CSS
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0C142B]/60 p-5 backdrop-blur-md">
            <p className="text-xs font-medium text-slate-400">GitHub Profile</p>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors truncate max-w-full"
            >
              <span className="truncate">@{GITHUB_HANDLE}</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
