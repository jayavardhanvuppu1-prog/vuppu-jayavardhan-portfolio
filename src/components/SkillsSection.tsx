import { useState } from 'react';
import { motion } from 'motion/react';
import { SKILLS_DATA } from '../data/portfolioData';
import type { SkillItem } from '../types/portfolio';

type FilterCategory = 'All' | SkillItem['category'];

const CATEGORIES: FilterCategory[] = [
  'All',
  'Programming',
  'Web Foundations',
  'AI & Prompting',
];

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');

  const visibleSkills =
    selectedCategory === 'All'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.category === selectedCategory);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-white/10 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-400">02. Skills</p>
            <h2
              id="skills-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance"
            >
              Foundational technical stack
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-300">
              An honest overview of the languages and concepts I am currently learning and applying
              in my first year.
            </p>
          </div>

          {/* Interactive Filter Tabs (functional button controls) */}
          <div
            role="tablist"
            aria-label="Filter skills by category"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#0C142B]/80 p-1 self-start"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {visibleSkills.map((skill, idx) => (
            <motion.article
              key={skill.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/10 bg-[#0C142B]/70 p-6 sm:p-7 backdrop-blur-md transition-colors duration-150 hover:border-blue-400/35"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-white">
                  {skill.name}
                </h3>
                <span className="text-xs font-medium text-blue-300 whitespace-nowrap shrink-0">
                  {skill.level}
                  <span aria-hidden="true" className="mx-1.5 text-slate-500">·</span>
                  <span className="text-slate-400">{skill.category}</span>
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {skill.summary}
              </p>

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-xs font-medium text-slate-400">Current Focus</p>
                <ul className="mt-2.5 space-y-1.5 text-sm text-slate-200">
                  {skill.currentFocus.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 rounded-full bg-blue-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
