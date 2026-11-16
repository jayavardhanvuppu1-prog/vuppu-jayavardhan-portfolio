import { useEffect, useState } from 'react';
import { RotateCcw, Save, X } from 'lucide-react';
import type { EditableProfileDetails } from '../types/portfolio';

interface EditProfileModalProps {
  isOpen: boolean;
  details: EditableProfileDetails;
  onClose: () => void;
  onSave: (updated: EditableProfileDetails) => void;
  onReset: () => void;
}

export function EditProfileModal({
  isOpen,
  details,
  onClose,
  onSave,
  onReset,
}: EditProfileModalProps) {
  const [formState, setFormState] = useState<EditableProfileDetails>(details);

  useEffect(() => {
    setFormState(details);
  }, [details, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      collegeName: formState.collegeName.trim(),
      registrationNumber: formState.registrationNumber.trim(),
      email: formState.email.trim(),
      linkedinUrl: formState.linkedinUrl.trim(),
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#040711]/80 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#0B1226] p-6 sm:p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              id="edit-profile-title"
              className="font-display text-xl font-bold text-white"
            >
              Edit Profile Placeholders
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Fill in your personal academic and contact details. Saved locally in your browser.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="edit-college"
              className="block text-xs font-medium text-slate-300"
            >
              College / University Name
            </label>
            <input
              id="edit-college"
              type="text"
              value={formState.collegeName}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, collegeName: e.target.value }))
              }
              placeholder="Enter your institution name"
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#060B18] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="edit-reg"
              className="block text-xs font-medium text-slate-300"
            >
              Registration Number
            </label>
            <input
              id="edit-reg"
              type="text"
              value={formState.registrationNumber}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, registrationNumber: e.target.value }))
              }
              placeholder="Enter your student registration number"
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#060B18] px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="edit-email"
              className="block text-xs font-medium text-slate-300"
            >
              Email Address
            </label>
            <input
              id="edit-email"
              type="email"
              value={formState.email}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="your.email@example.com"
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#060B18] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="edit-linkedin"
              className="block text-xs font-medium text-slate-300"
            >
              LinkedIn Profile URL
            </label>
            <input
              id="edit-linkedin"
              type="url"
              value={formState.linkedinUrl}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, linkedinUrl: e.target.value }))
              }
              placeholder="https://linkedin.com/in/your-profile"
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#060B18] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear Placeholders</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[40px] rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:from-blue-500 hover:to-purple-500 cursor-pointer"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Details</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
