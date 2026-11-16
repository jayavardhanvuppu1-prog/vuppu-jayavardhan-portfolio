import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Plus, Trash2 } from 'lucide-react';
import { MILESTONES_DATA } from '../data/portfolioData';
import type { CertificateEntry } from '../types/portfolio';

interface AchievementsSectionProps {
  certificates: CertificateEntry[];
  onAddCertificate: (cert: Omit<CertificateEntry, 'id'>) => void;
  onRemoveCertificate: (id: string) => void;
}

export function AchievementsSection({
  certificates,
  onAddCertificate,
  onRemoveCertificate,
}: AchievementsSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [year, setYear] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim() || !year.trim()) {
      setFormError('Please fill in the certificate title, issuer, and year.');
      return;
    }
    onAddCertificate({
      title: title.trim(),
      issuer: issuer.trim(),
      year: year.trim(),
    });
    setTitle('');
    setIssuer('');
    setYear('');
    setFormError('');
    setShowForm(false);
  };

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="border-t border-white/10 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-medium text-blue-400">04. Achievements</p>
          <h2
            id="achievements-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance"
          >
            Honest learning milestones &amp; future credentials
          </h2>
          <p className="mt-3 max-w-2xl text-base text-slate-300">
            Tracking genuine progress as a first-year student—with dedicated space reserved for
            verified certificates as I earn them.
          </p>
        </div>

        {/* Learning Milestones Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {MILESTONES_DATA.map((milestone, idx) => (
            <motion.article
              key={milestone.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/10 bg-[#0C142B]/70 p-6 backdrop-blur-md"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-lg font-semibold text-white">
                  <span className="mr-2 font-mono text-sm text-blue-400 tabular-nums">
                    {milestone.index}.
                  </span>
                  {milestone.title}
                </h3>
                <span className="text-xs font-medium text-slate-400 whitespace-nowrap shrink-0">
                  {milestone.timeframe}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {milestone.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Future Certifications Placeholder / Editable List */}
        <div className="mt-10 rounded-2xl border border-dashed border-white/15 bg-[#0C142B]/45 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Award className="mt-0.5 h-5 w-5 text-purple-400 shrink-0" />
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  Future Certifications &amp; Awards
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Space reserved for upcoming Python, Machine Learning, and Computer Science
                  certifications.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowForm((prev) => !prev)}
              className="inline-flex min-h-[40px] items-center gap-2 self-start rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 text-blue-400" />
              <span>{showForm ? 'Cancel' : 'Add Certificate'}</span>
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mt-6 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3"
            >
              <div>
                <label
                  htmlFor="cert-title"
                  className="block text-xs font-medium text-slate-300"
                >
                  Certificate / Award Name
                </label>
                <input
                  id="cert-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Python Fundamentals"
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#060B18] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="cert-issuer"
                  className="block text-xs font-medium text-slate-300"
                >
                  Issuing Organization
                </label>
                <input
                  id="cert-issuer"
                  type="text"
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  placeholder="e.g., Coursera / NPTEL"
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#060B18] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="cert-year"
                  className="block text-xs font-medium text-slate-300"
                >
                  Year Earned
                </label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    id="cert-year"
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2026"
                    className="w-full rounded-lg border border-white/15 bg-[#060B18] px-3 py-2 font-mono text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none tabular-nums"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:from-blue-500 hover:to-purple-500 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>

              {formError && (
                <p className="sm:col-span-3 text-xs font-medium text-amber-300">
                  {formError}
                </p>
              )}
            </form>
          )}

          {certificates.length === 0 ? (
            <div className="mt-6 border-t border-white/10 pt-6 text-sm text-slate-400">
              No certifications added yet. As a first-year B.Tech CS student, this section is
              intentionally kept empty until verified courses or awards are completed.
            </div>
          ) : (
            <ul className="mt-6 divide-y divide-white/10 border-t border-white/10">
              {certificates.map((cert) => (
                <li
                  key={cert.id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div>
                    <p className="font-display text-base font-semibold text-white">
                      {cert.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {cert.issuer}
                      <span aria-hidden="true" className="mx-1.5">·</span>
                      <span className="font-mono tabular-nums">{cert.year}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveCertificate(cert.id)}
                    aria-label={`Remove ${cert.title}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-rose-300 cursor-pointer shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
