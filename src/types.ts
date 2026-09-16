export interface TutorialStep {
  id: string;
  stepNumber: number;
  title: string;
  shortTitle: string;
  tagline: string;
  duration: string;
  badge: string;
  icon: string;
  summary: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'Portfolio' | 'SaaS Landing' | 'Agency' | 'Dashboard' | 'E-commerce';
  description: string;
  promptText: string;
  tags: string[];
  features: string[];
}

export interface TroubleshootingIssue {
  id: string;
  title: string;
  category: 'Build' | 'Routing' | 'Git' | 'Environment' | 'Vercel';
  symptom: string;
  cause: string;
  solution: string;
  codeSnippet?: string;
  fileName?: string;
  tags: string[];
}

export interface ChecklistItem {
  id: string;
  category: 'AI Studio' | 'Code Prep' | 'GitHub' | 'Vercel' | 'Post-Launch';
  title: string;
  description: string;
  completed: boolean;
}

export interface TerminalCommand {
  command: string;
  output: string;
  explanation: string;
  optional?: boolean;
}
