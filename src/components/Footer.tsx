import { GITHUB_PROFILE_URL } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#050914] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-sm font-semibold text-white">
            Vuppu Jayavardhan
          </p>
          <p className="mt-0.5 text-xs text-slate-400">
            First-Year B.Tech Computer Science Student · Aspiring AI Engineer
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-5 text-xs text-slate-400">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Projects
          </button>
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
