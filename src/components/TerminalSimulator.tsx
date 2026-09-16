import { useState } from 'react';
import { Terminal as TerminalIcon, Copy, Check, Play, RotateCcw, ArrowRight, GitBranch, ShieldCheck } from 'lucide-react';
import { GIT_TERMINAL_STEPS, GITIGNORE_TEMPLATE } from '../data/tutorialData';

export default function TerminalSimulator() {
  const [username, setUsername] = useState('developer');
  const [repoName, setRepoName] = useState('my-ai-website');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [executedLogs, setExecutedLogs] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: '# Welcome to the Interactive Git Deployment Terminal', output: 'Type or click below to simulate pushing your AI Studio project to GitHub.' }
  ]);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedGitignore, setCopiedGitignore] = useState(false);
  const [activeTab, setActiveTab] = useState<'terminal' | 'gitignore'>('terminal');

  const repoUrl = `https://github.com/${username}/${repoName}.git`;

  const getCustomizedCommand = (rawCmd: string) => {
    return rawCmd.replace('https://github.com/YOUR_USERNAME/my-ai-website.git', repoUrl);
  };

  const handleExecuteNext = () => {
    if (currentStepIndex < GIT_TERMINAL_STEPS.length) {
      const step = GIT_TERMINAL_STEPS[currentStepIndex];
      const customCmd = getCustomizedCommand(step.command);
      setExecutedLogs(prev => [
        ...prev,
        { cmd: `$ ${customCmd}`, output: step.output }
      ]);
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setExecutedLogs([
      { cmd: '# Welcome to the Interactive Git Deployment Terminal', output: 'Type or click below to simulate pushing your AI Studio project to GitHub.' }
    ]);
  };

  const handleCopyAll = () => {
    const script = [
      '# Git Push Script for Google AI Studio Web Project',
      'git init',
      'git add .',
      'git commit -m "feat: initial website generated via Google AI Studio"',
      'git branch -M main',
      `git remote add origin ${repoUrl}`,
      'git push -u origin main'
    ].join('\n');

    navigator.clipboard.writeText(script);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopyGitignore = () => {
    navigator.clipboard.writeText(GITIGNORE_TEMPLATE);
    setCopiedGitignore(true);
    setTimeout(() => setCopiedGitignore(false), 2000);
  };

  const currentStep = GIT_TERMINAL_STEPS[currentStepIndex];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Configuration Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <TerminalIcon className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">Git Terminal & GitHub Push Simulator</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Test and run the exact terminal sequence required to link your project to GitHub.
          </p>
        </div>

        {/* GitHub Repository Inputs */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-mono">github.com/</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
              placeholder="username"
              className="w-24 font-mono font-medium text-slate-800 focus:outline-hidden bg-transparent"
              title="Your GitHub username"
            />
            <span className="text-slate-400 font-mono">/</span>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
              placeholder="repo-name"
              className="w-28 font-mono font-medium text-slate-800 focus:outline-hidden bg-transparent"
              title="Your repository name"
            />
          </div>

          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors font-medium shadow-2xs"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedAll ? 'Copied Script!' : 'Copy Shell Script'}</span>
          </button>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center gap-4 px-5 pt-3 border-b border-slate-200 bg-slate-50/40 text-xs font-semibold text-slate-500">
        <button
          onClick={() => setActiveTab('terminal')}
          className={`pb-2.5 transition-colors border-b-2 ${
            activeTab === 'terminal' ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-slate-800'
          }`}
        >
          Interactive Terminal Session
        </button>
        <button
          onClick={() => setActiveTab('gitignore')}
          className={`pb-2.5 transition-colors border-b-2 ${
            activeTab === 'gitignore' ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-slate-800'
          }`}
        >
          Production .gitignore File
        </button>
      </div>

      {activeTab === 'terminal' ? (
        <div>
          {/* Terminal Window Box */}
          <div className="bg-slate-950 text-slate-100 p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[260px] max-h-[380px] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="ml-2 text-slate-400 font-sans">bash — 80x24</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">Step {Math.min(currentStepIndex, GIT_TERMINAL_STEPS.length)} of {GIT_TERMINAL_STEPS.length}</span>
                <button
                  onClick={handleReset}
                  className="text-slate-400 hover:text-white p-1 rounded-sm hover:bg-slate-800 transition-colors"
                  title="Reset Terminal"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {executedLogs.map((log, idx) => (
                <div key={idx} className="space-y-1">
                  <div className={log.cmd.startsWith('$') ? 'text-emerald-400 font-medium' : 'text-slate-400'}>
                    {log.cmd}
                  </div>
                  {log.output && (
                    <div className="text-slate-300 whitespace-pre-wrap pl-3 text-xs text-slate-300/90 font-mono">
                      {log.output}
                    </div>
                  )}
                </div>
              ))}

              {/* Cursor / Active prompt */}
              {currentStepIndex < GIT_TERMINAL_STEPS.length ? (
                <div className="pt-2">
                  <span className="text-sky-400">user@workspace</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-amber-300">~/my-ai-website</span>
                  <span className="text-slate-500"> (main)</span>
                  <span className="text-emerald-400"> $ </span>
                  <span className="text-white font-bold animate-pulse">
                    {getCustomizedCommand(currentStep.command)}
                  </span>
                </div>
              ) : (
                <div className="pt-3 pb-1 text-emerald-400 font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Success! Your code is now published to GitHub at {repoUrl}</span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Action Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              {currentStepIndex < GIT_TERMINAL_STEPS.length ? (
                <div>
                  <span className="font-semibold text-slate-800">Next Command Explanation: </span>
                  <span>{currentStep.explanation}</span>
                </div>
              ) : (
                <div className="text-emerald-700 font-medium">
                  All Git steps completed! Next step is connecting this GitHub repository to Vercel.
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {currentStepIndex < GIT_TERMINAL_STEPS.length ? (
                <button
                  id="terminal-run-next-btn"
                  onClick={handleExecuteNext}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Simulate: {currentStep.command.split(' ')[1] || 'Execute'}</span>
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Run Again</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Command Reference Grid */}
          <div className="p-4 border-t border-slate-200/80 bg-white">
            <div className="text-xs font-bold text-slate-700 mb-2">Step-by-Step Command Sequence:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {GIT_TERMINAL_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border text-xs transition-all ${
                    idx < currentStepIndex
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      : idx === currentStepIndex
                      ? 'bg-blue-50 border-blue-300 text-blue-900 font-medium ring-1 ring-blue-400/40'
                      : 'bg-slate-50/50 border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-500">Step {idx + 1}</span>
                    {idx < currentStepIndex && <span className="text-emerald-600 font-bold text-[10px]">DONE</span>}
                  </div>
                  <code className="font-mono text-[11px] block truncate text-slate-800">
                    {getCustomizedCommand(step.command)}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Gitignore Viewer & Exporter */
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Recommended .gitignore for AI Studio & Vite Apps</h4>
              <p className="text-xs text-slate-500">Never commit node_modules, .env secrets, or build folders.</p>
            </div>
            <button
              onClick={handleCopyGitignore}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
            >
              {copiedGitignore ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedGitignore ? 'Copied!' : 'Copy .gitignore'}</span>
            </button>
          </div>

          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs max-h-[300px] overflow-y-auto leading-relaxed">
            <pre>{GITIGNORE_TEMPLATE}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
