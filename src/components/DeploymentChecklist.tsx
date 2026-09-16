import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, RotateCcw, Sparkles, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChecklistItem } from '../types';
import { INITIAL_CHECKLIST } from '../data/tutorialData';

interface DeploymentChecklistProps {
  onProgressChange?: (completed: number, total: number) => void;
  onNavigateToStep?: (stepId: string) => void;
}

export default function DeploymentChecklist({ onProgressChange, onNavigateToStep }: DeploymentChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('ai_studio_vercel_checklist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_CHECKLIST;
  });

  const completedCount = items.filter(i => i.completed).length;
  const totalCount = items.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  useEffect(() => {
    try {
      localStorage.setItem('ai_studio_vercel_checklist', JSON.stringify(items));
    } catch {
      // ignore
    }
    if (onProgressChange) {
      onProgressChange(completedCount, totalCount);
    }
  }, [items, completedCount, totalCount, onProgressChange]);

  const toggleItem = (id: string) => {
    setItems(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
      const newCompleted = updated.filter(i => i.completed).length;
      if (newCompleted === totalCount) {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.4 }
        });
      }
      return updated;
    });
  };

  const handleReset = () => {
    setItems(INITIAL_CHECKLIST.map(i => ({ ...i, completed: false })));
  };

  const handleCheckAll = () => {
    setItems(prev => prev.map(i => ({ ...i, completed: true })));
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.4 }
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header with Progress Ring / Bar */}
      <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
              <Trophy className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Interactive Production Deployment Checklist
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track your journey from Google AI Studio prompt creation to live zero-downtime Vercel deployment.
          </p>
        </div>

        {/* Progress & Quick Actions */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-bold text-slate-900">{completedCount} of {totalCount} Done</div>
            <div className="text-[11px] text-slate-500">{percent}% Complete</div>
          </div>

          <div className="w-20 bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                percent === 100 ? 'bg-emerald-600' : 'bg-blue-600'
              }`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            title="Reset Checklist"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {percent === 100 && (
        <div className="mx-6 mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border border-emerald-300 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-emerald-900 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Outstanding! You have mastered the full Google AI Studio to Vercel deployment pipeline!</span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shrink-0">
            100% Certified
          </span>
        </div>
      )}

      {/* Checklist items */}
      <div className="p-4 sm:p-6 divide-y divide-slate-100">
        {items.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`py-3.5 px-3 rounded-xl flex items-start gap-3.5 cursor-pointer transition-colors ${
              item.completed ? 'bg-emerald-50/40 text-slate-700' : 'hover:bg-slate-50 text-slate-900'
            }`}
          >
            <button
              type="button"
              className="mt-0.5 shrink-0 focus:outline-hidden"
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
            >
              {item.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300 hover:text-slate-400" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  item.category === 'AI Studio' ? 'bg-blue-100 text-blue-800' :
                  item.category === 'Code Prep' ? 'bg-purple-100 text-purple-800' :
                  item.category === 'GitHub' ? 'bg-slate-800 text-white' :
                  item.category === 'Vercel' ? 'bg-black text-white' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  {item.category}
                </span>
                <span className={`text-xs sm:text-sm font-semibold ${item.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                  {idx + 1}. {item.title}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Helper */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Progress is automatically saved to your browser local storage.</span>
        <button
          onClick={handleCheckAll}
          className="font-semibold text-blue-600 hover:text-blue-800"
        >
          Check All (Simulate 100%)
        </button>
      </div>
    </div>
  );
}
