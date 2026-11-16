import { useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EditProfileModal } from './components/EditProfileModal';
import { DEFAULT_EDITABLE_DETAILS } from './data/portfolioData';
import type { CertificateEntry, EditableProfileDetails } from './types/portfolio';

const DETAILS_STORAGE_KEY = 'jayavardhan_portfolio_details_v1';
const CERTS_STORAGE_KEY = 'jayavardhan_portfolio_certs_v1';
const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [details, setDetails] = useState<EditableProfileDetails>(() => {
    try {
      const saved = localStorage.getItem(DETAILS_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_EDITABLE_DETAILS, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore storage read issues
    }
    return DEFAULT_EDITABLE_DETAILS;
  });

  const [certificates, setCertificates] = useState<CertificateEntry[]>(() => {
    try {
      const saved = localStorage.getItem(CERTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage read issues
    }
    return [];
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-35% 0px -50% 0px',
      threshold: 0.05,
    });

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    observers.push(observer);
    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSaveDetails = useCallback((updated: EditableProfileDetails) => {
    setDetails(updated);
    try {
      localStorage.setItem(DETAILS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage write issues
    }
  }, []);

  const handleResetDetails = useCallback(() => {
    setDetails(DEFAULT_EDITABLE_DETAILS);
    try {
      localStorage.removeItem(DETAILS_STORAGE_KEY);
    } catch {
      // Ignore storage remove issues
    }
  }, []);

  const handleAddCertificate = useCallback((cert: Omit<CertificateEntry, 'id'>) => {
    const newEntry: CertificateEntry = {
      ...cert,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    };
    setCertificates((prev) => {
      const next = [newEntry, ...prev];
      try {
        localStorage.setItem(CERTS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage write issues
      }
      return next;
    });
  }, []);

  const handleRemoveCertificate = useCallback((id: string) => {
    setCertificates((prev) => {
      const next = prev.filter((c) => c.id !== id);
      try {
        localStorage.setItem(CERTS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage write issues
      }
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#060B18] text-slate-100">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main>
        <HeroSection onNavigate={handleNavigate} />
        <AboutSection details={details} onOpenEditor={() => setIsEditorOpen(true)} />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection
          certificates={certificates}
          onAddCertificate={handleAddCertificate}
          onRemoveCertificate={handleRemoveCertificate}
        />
        <ContactSection details={details} onOpenEditor={() => setIsEditorOpen(true)} />
      </main>

      <Footer onNavigate={handleNavigate} />

      <EditProfileModal
        isOpen={isEditorOpen}
        details={details}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveDetails}
        onReset={handleResetDetails}
      />
    </div>
  );
}
