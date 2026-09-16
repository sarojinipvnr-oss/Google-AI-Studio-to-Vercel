/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import StepNavigation from './components/StepNavigation';
import StepContent from './components/StepContent';
import TerminalSimulator from './components/TerminalSimulator';
import VercelDeploySimulator from './components/VercelDeploySimulator';
import DeploymentDoctor from './components/DeploymentDoctor';
import DeploymentChecklist from './components/DeploymentChecklist';
import CodePlayground from './components/CodePlayground';
import CommunityFooter from './components/CommunityFooter';
import { TUTORIAL_STEPS, INITIAL_CHECKLIST } from './data/tutorialData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('guide');
  const [currentStepId, setCurrentStepId] = useState<string>('ai-studio');
  const [completedChecklistCount, setCompletedChecklistCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ai_studio_vercel_checklist');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.filter((i: { completed: boolean }) => i.completed).length;
      }
    } catch {
      // ignore
    }
    return INITIAL_CHECKLIST.filter(i => i.completed).length;
  });

  const totalChecklistCount = INITIAL_CHECKLIST.length;

  const currentStep = TUTORIAL_STEPS.find(s => s.id === currentStepId) || TUTORIAL_STEPS[0];

  const handleSelectStep = (stepId: string) => {
    setCurrentStepId(stepId);
    setActiveTab('guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProgressChange = (completed: number, _total: number) => {
    setCompletedChecklistCount(completed);
  };

  const handleTagClick = (tag: string) => {
    const lower = tag.toLowerCase();
    if (lower.includes('github') || lower.includes('git')) {
      setActiveTab('terminal');
    } else if (lower.includes('vercel') || lower.includes('deploy')) {
      setActiveTab('simulator');
    } else if (lower.includes('ai studio') || lower.includes('gemini')) {
      setCurrentStepId('ai-studio');
      setActiveTab('guide');
    } else if (lower.includes('fix') || lower.includes('issue')) {
      setActiveTab('doctor');
    } else {
      setActiveTab('guide');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Global Sticky Header */}
      <Header
        completedCount={completedChecklistCount}
        totalCount={totalChecklistCount}
        activeTab={activeTab}
        setActiveTab={handleOpenTab}
      />

      {/* Step Navigator (Always visible in guide mode) */}
      {activeTab === 'guide' && (
        <StepNavigation
          currentStepId={currentStepId}
          onSelectStep={handleSelectStep}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'guide' && (
          <div className="space-y-8">
            <StepContent
              currentStep={currentStep}
              onNavigateStep={handleSelectStep}
              onOpenTab={handleOpenTab}
            />

            {/* If on Step 2 (Production Code), also showcase the Live Website Playground */}
            {currentStep.id === 'clean-code' && (
              <div className="pt-4">
                <CodePlayground />
              </div>
            )}
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Interactive Git & GitHub Terminal</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Run through every Git command to push your local Google AI Studio code to your remote GitHub repository.
              </p>
            </div>
            <TerminalSimulator />
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Vercel Deployment Simulator</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Connect your GitHub repository, configure Vite build options, and simulate real-time production edge deployment.
              </p>
            </div>
            <VercelDeploySimulator />
          </div>
        )}

        {activeTab === 'doctor' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Deployment Doctor & Issue Resolver</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Diagnose and fix SPA 404 routing errors, missing Vite binaries, client env variable leaks, and Git conflicts.
              </p>
            </div>
            <DeploymentDoctor />
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">10-Point Deployment Readiness Checklist</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Tick off each verification item to ensure 100% production readiness before sharing your website with users.
              </p>
            </div>
            <DeploymentChecklist
              onProgressChange={handleProgressChange}
              onNavigateToStep={handleSelectStep}
            />
          </div>
        )}
      </main>

      {/* Community Engagement & Tags Footer */}
      <CommunityFooter onTagClick={handleTagClick} />
    </div>
  );
}
