import { TUTORIAL_STEPS } from '../data/tutorialData';
import { 
  Sparkles, 
  Code2, 
  GitBranch, 
  CloudLightning, 
  Rocket, 
  RefreshCw, 
  ShieldAlert,
  Clock
} from 'lucide-react';

interface StepNavigationProps {
  currentStepId: string;
  onSelectStep: (stepId: string) => void;
}

const ICON_MAP: Record<string, typeof Sparkles> = {
  Sparkles,
  Code2,
  GitBranch,
  CloudLightning,
  Rocket,
  RefreshCw,
  ShieldAlert
};

export default function StepNavigation({ currentStepId, onSelectStep }: StepNavigationProps) {
  return (
    <div className="bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
          {TUTORIAL_STEPS.map((step) => {
            const Icon = ICON_MAP[step.icon] || Sparkles;
            const isActive = step.id === currentStepId;

            return (
              <button
                key={step.id}
                id={`step-nav-btn-${step.id}`}
                onClick={() => onSelectStep(step.id)}
                className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-left transition-all shrink-0 border ${
                  isActive
                    ? 'bg-blue-50/80 border-blue-200 text-blue-900 shadow-xs'
                    : 'bg-white border-slate-200/80 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold whitespace-nowrap">
                      {step.shortTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{step.duration}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
