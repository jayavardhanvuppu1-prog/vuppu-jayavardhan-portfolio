export interface EditableProfileDetails {
  collegeName: string;
  registrationNumber: string;
  email: string;
  linkedinUrl: string;
}

export interface CertificateEntry {
  id: string;
  title: string;
  issuer: string;
  year: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: string;
  category: 'Programming' | 'Web Foundations' | 'AI & Prompting';
  summary: string;
  currentFocus: string[];
}

export interface ProjectItem {
  id: 'grade-calculator' | 'basic-calculator';
  title: string;
  subtitle: string;
  status: 'Learning Project' | 'In Progress';
  stack: string[];
  description: string;
  learningOutcomes: string[];
  codeSnippet: string;
}

export interface MilestoneItem {
  id: string;
  index: string;
  title: string;
  timeframe: string;
  description: string;
}
