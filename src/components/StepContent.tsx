import { useState } from 'react';
import { 
  Sparkles, 
  Code2, 
  GitBranch, 
  CloudLightning, 
  Rocket, 
  RefreshCw, 
  ShieldAlert, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Copy, 
  Check, 
  FileCode, 
  ExternalLink,
  Layers,
  Terminal as TerminalIcon,
  Globe,
  Zap,
  Info,
  Sliders
} from 'lucide-react';
import { TutorialStep } from '../types';
import { TUTORIAL_STEPS } from '../data/tutorialData';
import PromptLibrary from './PromptLibrary';
import TerminalSimulator from './TerminalSimulator';
import VercelDeploySimulator from './VercelDeploySimulator';
import DeploymentDoctor from './DeploymentDoctor';

interface StepContentProps {
  currentStep: TutorialStep;
  onNavigateStep: (stepId: string) => void;
  onOpenTab: (tab: string) => void;
}

export default function StepContent({ currentStep, onNavigateStep, onOpenTab }: StepContentProps) {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const currentIndex = TUTORIAL_STEPS.findIndex(s => s.id === currentStep.id);
  const prevStep = currentIndex > 0 ? TUTORIAL_STEPS[currentIndex - 1] : null;
  const nextStep = currentIndex < TUTORIAL_STEPS.length - 1 ? TUTORIAL_STEPS[currentIndex + 1] : null;

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Step Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                Step {currentStep.stepNumber} of {TUTORIAL_STEPS.length}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Est. Duration: {currentStep.duration}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentStep.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
              {currentStep.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {prevStep && (
              <button
                onClick={() => onNavigateStep(prevStep.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
            )}
            {nextStep && (
              <button
                onClick={() => onNavigateStep(nextStep.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <span>Next: {nextStep.shortTitle}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Step 1: Build with Google AI Studio */}
      {currentStep.id === 'ai-studio' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">State Boundaries</h4>
              <p className="text-xs text-slate-600">
                Clearly define the scope. Single-screen apps should never generate complex sidebars or unsolicited multi-screen tabs.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Design Archetype</h4>
              <p className="text-xs text-slate-600">
                Specify a distinctive aesthetic: warm slate neutrals, generous negative space, high contrast, and accessible WCAG AA colors.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Modular Architecture</h4>
              <p className="text-xs text-slate-600">
                Instruct Gemini to place types in <code className="text-blue-700">types.ts</code> and extract modular components to avoid token truncation.
              </p>
            </div>
          </div>

          {/* Embedded Prompt Library */}
          <PromptLibrary />
        </div>
      )}

      {/* Step 2: Generate Production-Ready Code */}
      {currentStep.id === 'clean-code' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              The 5 Pillars of Production-Ready Code from AI Studio
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>1. Working Build Script</span>
                </div>
                <p className="text-slate-600">
                  Verify <code className="bg-white px-1 py-0.5 rounded border border-slate-200">"build": "vite build"</code> in package.json. It compiles static assets to the <code className="text-blue-700">dist/</code> directory.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>2. Semantic HTML5 & Meta Tags</span>
                </div>
                <p className="text-slate-600">
                  Update <code className="bg-white px-1 py-0.5 rounded border border-slate-200">index.html</code> with proper <code className="text-blue-700">&lt;title&gt;</code>, viewport, and OpenGraph social tags.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>3. No Leaked Client API Keys</span>
                </div>
                <p className="text-slate-600">
                  Never put private keys (like Gemini or Stripe secret keys) in client code. Client variables must use <code className="text-blue-700">VITE_</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>4. Strict Case Matching for Linux</span>
                </div>
                <p className="text-slate-600">
                  Linux hosts (like Vercel) enforce strict case sensitivity. Import filenames must match the disk case exactly.
                </p>
              </div>
            </div>
          </div>

          {/* package.json reference */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
                <FileCode className="w-4 h-4 text-blue-600" />
                <span>Production package.json Standard</span>
              </div>
              <button
                onClick={() => handleCopyCode('pkg', `{
  "name": "my-ai-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}`)}
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                {copiedCodeId === 'pkg' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCodeId === 'pkg' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-4 bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
              <pre>{`{
  "name": "my-ai-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.546.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "tailwindcss": "^4.1.0",
    "typescript": "~5.8.0",
    "vite": "^6.2.0"
  }
}`}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Push Project to GitHub */}
      {currentStep.id === 'github-push' && (
        <div className="space-y-6">
          <TerminalSimulator />
        </div>
      )}

      {/* Step 4: Connect GitHub with Vercel */}
      {currentStep.id === 'vercel-connect' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">How to Link GitHub to Vercel (3 Steps)</h3>
            <ol className="space-y-3 text-xs sm:text-sm text-slate-700 list-decimal list-inside">
              <li>
                <span className="font-semibold text-slate-900">Sign Up / Log In: </span>
                Visit <a href="https://vercel.com/signup" target="_blank" rel="noreferrer" className="text-blue-600 underline font-medium">vercel.com</a> and choose <strong>"Continue with GitHub"</strong>.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Import Git Repository: </span>
                Click the <strong>"Add New... → Project"</strong> button on your dashboard. You will see your GitHub repositories listed.
              </li>
              <li>
                <span className="font-semibold text-slate-900">Click "Import": </span>
                Find the repository you just pushed from Google AI Studio and click <strong>"Import"</strong>.
              </li>
            </ol>
          </div>

          <VercelDeploySimulator />
        </div>
      )}

      {/* Step 5: Deploy Your Website for Free */}
      {currentStep.id === 'free-deploy' && (
        <div className="space-y-6">
          {/* Free Tier Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-1">
                <Zap className="w-4 h-4" />
                <span>Zero Cost ($0/mo)</span>
              </div>
              <p className="text-xs text-slate-600">
                100 GB global bandwidth, 100 deployments per day, and automated build caching included forever on the Hobby tier.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-1">
                <Globe className="w-4 h-4" />
                <span>Custom Domains</span>
              </div>
              <p className="text-xs text-slate-600">
                Easily point your own domain (e.g., <code className="text-blue-700">mywebsite.com</code>) by setting an A Record to <code className="text-blue-700">76.76.21.21</code>.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 text-purple-600 font-bold text-sm mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>Automated SSL</span>
              </div>
              <p className="text-xs text-slate-600">
                Every domain receives automatic Let's Encrypt TLS/SSL certificates that renew automatically without configuration.
              </p>
            </div>
          </div>

          {/* DNS Configuration Guide Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Custom Domain DNS Settings Reference</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400">
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 font-medium">Name / Host</th>
                    <th className="pb-2 font-medium">Value / Destination</th>
                    <th className="pb-2 font-medium">TTL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                  <tr>
                    <td className="py-2.5 font-bold text-blue-600">A</td>
                    <td className="py-2.5">@ (apex domain)</td>
                    <td className="py-2.5 text-slate-900 font-bold">76.76.21.21</td>
                    <td className="py-2.5">Automatic / 3600</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-purple-600">CNAME</td>
                    <td className="py-2.5">www (subdomain)</td>
                    <td className="py-2.5 text-slate-900 font-bold">cname.vercel-dns.com</td>
                    <td className="py-2.5">Automatic / 3600</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Step 6: Automatic Deployments (CI/CD) */}
      {currentStep.id === 'automatic-cicd' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Continuous Integration & Continuous Deployment (CI/CD) Explained
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Once Vercel is connected to your GitHub repository, you never have to manually run build commands again. Every time you push a commit or merge a pull request, Vercel initiates a fresh build on their edge cluster.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-900 mb-1">1. Git Push Trigger</div>
                <p className="text-xs text-slate-500">
                  Run <code className="bg-white px-1 py-0.5 rounded border">git push origin main</code> in your terminal. GitHub sends a secure webhook to Vercel.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-900 mb-1">2. Edge Build & Check</div>
                <p className="text-xs text-slate-500">
                  Vercel clones the latest commit, runs TypeScript checks, executes <code className="bg-white px-1 py-0.5 rounded border">vite build</code>, and optimizes assets.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-900 mb-1">3. Instant Zero-Downtime Swap</div>
                <p className="text-xs text-slate-500">
                  Global DNS routing atomically updates to the new build. If a build fails, the previous version remains online safely!
                </p>
              </div>
            </div>
          </div>

          {/* Rollback Guide */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span>Instant Rollbacks</span>
            </h4>
            <p className="text-xs text-slate-600">
              If you ever deploy a bug by accident, open your Vercel Dashboard, go to <strong>Deployments</strong>, click the three dots (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono">...</code>) on the last working deployment, and click <strong>"Instant Rollback"</strong>. It switches traffic immediately in under 1 second without re-running builds!
            </p>
          </div>
        </div>
      )}

      {/* Step 7: Common Deployment Issues & Fixes */}
      {currentStep.id === 'troubleshooting' && (
        <DeploymentDoctor />
      )}
    </div>
  );
}
