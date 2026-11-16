import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, Edit3, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import { GITHUB_HANDLE, GITHUB_PROFILE_URL } from '../data/portfolioData';
import type { EditableProfileDetails } from '../types/portfolio';

interface ContactSectionProps {
  details: EditableProfileDetails;
  onOpenEditor: () => void;
}

export function ContactSection({ details, onOpenEditor }: ContactSectionProps) {
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [formNotice, setFormNotice] = useState('');

  const handleCopyDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setFormNotice('Write a brief message first before copying or sending.');
      return;
    }

    const formatted = [
      senderName.trim() ? `From: ${senderName.trim()}` : 'From: Portfolio Visitor',
      subject.trim() ? `Subject: ${subject.trim()}` : 'Subject: Portfolio Inquiry',
      '',
      message.trim(),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setFormNotice(
        details.email
          ? 'Message copied to clipboard. You can also send directly via your email client.'
          : 'Message copied to clipboard. Add an email address in Contact Details to enable direct mail links.'
      );
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setFormNotice('Could not access clipboard automatically. Please select and copy your message.');
    }
  };

  const hasValidLinkedin =
    details.linkedinUrl.trim().startsWith('http://') ||
    details.linkedinUrl.trim().startsWith('https://');

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-white/10 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-400">05. Contact</p>
            <h2
              id="contact-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance"
            >
              Connect &amp; follow my work
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-300">
              Open to connecting with fellow computer science students, mentors, and developers
              exploring Python and AI.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenEditor}
            className="inline-flex min-h-[40px] items-center gap-2 self-start rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 transition-colors duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Edit3 className="h-3.5 w-3.5 text-blue-400" />
            <span>Edit Email &amp; LinkedIn</span>
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Direct Profiles & Placeholders */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0C142B]/70 p-6 sm:p-8 backdrop-blur-md space-y-6"
          >
            {/* GitHub (real URL) */}
            <div className="pb-5 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Github className="h-4 w-4 text-blue-400" />
                <span>GitHub</span>
              </div>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-mono text-sm font-medium text-white hover:text-blue-300 transition-colors break-all"
              >
                <span>github.com/{GITHUB_HANDLE}</span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              </a>
            </div>

            {/* Email (editable placeholder) */}
            <div className="pb-5 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Mail className="h-4 w-4 text-purple-400" />
                <span>Email</span>
              </div>
              {details.email ? (
                <a
                  href={`mailto:${details.email}`}
                  className="mt-2 block text-sm font-medium text-white hover:text-blue-300 transition-colors break-all"
                >
                  {details.email}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onOpenEditor}
                  className="mt-2 block text-left text-sm italic text-slate-400 underline decoration-dashed underline-offset-4 hover:text-blue-300 transition-colors cursor-pointer"
                >
                  [Add your email address placeholder]
                </button>
              )}
            </div>

            {/* LinkedIn (editable placeholder) */}
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Linkedin className="h-4 w-4 text-blue-400" />
                <span>LinkedIn</span>
              </div>
              {details.linkedinUrl ? (
                hasValidLinkedin ? (
                  <a
                    href={details.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-blue-300 transition-colors break-all"
                  >
                    <span>{details.linkedinUrl}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  </a>
                ) : (
                  <p className="mt-2 text-sm font-medium text-white break-all">
                    {details.linkedinUrl}
                  </p>
                )
              ) : (
                <button
                  type="button"
                  onClick={onOpenEditor}
                  className="mt-2 block text-left text-sm italic text-slate-400 underline decoration-dashed underline-offset-4 hover:text-blue-300 transition-colors cursor-pointer"
                >
                  [Add your LinkedIn profile URL placeholder]
                </button>
              )}
            </div>
          </motion.div>

          {/* Functional Message Draft Composer */}
          <motion.form
            onSubmit={handleCopyDraft}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0C142B]/70 p-6 sm:p-8 backdrop-blur-md space-y-5"
          >
            <div>
              <h3 className="font-display text-lg font-semibold text-white">
                Draft a Message
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Compose a note to copy to your clipboard or launch in your mail app once an email
                is added.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium text-slate-300"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#060B18] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-medium text-slate-300"
                >
                  Topic
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Python study collaboration"
                  className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#060B18] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-medium text-slate-300"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#060B18] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none resize-y"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:from-blue-500 hover:to-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied Message</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Message</span>
                  </>
                )}
              </button>

              {details.email && (
                <a
                  href={`mailto:${details.email}?subject=${encodeURIComponent(
                    subject || 'Portfolio Inquiry'
                  )}&body=${encodeURIComponent(message)}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 whitespace-nowrap shrink-0"
                >
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>Open Email App</span>
                </a>
              )}
            </div>

            {formNotice && (
              <p className="text-xs text-blue-300" role="status">
                {formNotice}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
