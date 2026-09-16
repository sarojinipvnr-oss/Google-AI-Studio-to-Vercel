import { useState } from 'react';
import { 
  CloudLightning, 
  CheckCircle2, 
  ExternalLink, 
  Globe, 
  ShieldCheck, 
  Loader2, 
  Settings2, 
  Sparkles, 
  Terminal,
  RotateCcw,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VercelDeploySimulator() {
  const [projectName, setProjectName] = useState('my-ai-website');
  const [framework, setFramework] = useState('Vite');
  const [buildCmd, setBuildCmd] = useState('npm run build');
  const [outputDir, setOutputDir] = useState('dist');
  const [deployState, setDeployState] = useState<'idle' | 'building' | 'success'>('idle');
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [deployedUrl, setDeployedUrl] = useState('');

  const handleDeploy = () => {
    setDeployState('building');
    setBuildLogs([
      'Retrieving repository metadata from GitHub...',
      'Installing build dependencies via npm (vite, react, tailwindcss)...',
      'Running build command: "npm run build"...',
      'vite v6.2.3 building for production...',
      '✓ 14 modules transformed.',
      'dist/index.html                   0.65 kB │ gzip: 0.38 kB',
      'dist/assets/index-DkE98L.css      4.12 kB │ gzip: 1.45 kB',
      'dist/assets/index-B7qP21.js      142.30 kB │ gzip: 46.12 kB',
      '✓ built in 820ms',
      'Deploying output to Vercel Global Edge Network (Hong Kong, Frankfurt, San Jose, Washington)...',
      'Provisioning automated Let\'s Encrypt SSL/TLS certificate...',
      'Domain assignment verified: Ready!'
    ]);

    setTimeout(() => {
      const generatedUrl = `https://${projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-')}.vercel.app`;
      setDeployedUrl(generatedUrl);
      setDeployState('success');
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 2200);
  };

  const handleReset = () => {
    setDeployState('idle');
    setBuildLogs([]);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Simulator Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">
            ▲
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Vercel Deployment Simulator</h3>
            <p className="text-xs text-slate-500">Experience the exact Vercel project import & global deployment flow.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Zap className="w-3 h-3 text-emerald-600" />
            100% Free Hobby Tier
          </span>
        </div>
      </div>

      {deployState === 'idle' && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Step 1: Repo Confirmation */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold">
                git
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Selected Repository</div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>github.com/developer/{projectName}</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono">main</span>
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Connected
            </span>
          </div>

          {/* Form Settings */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Will produce: https://{projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-') || 'website'}.vercel.app
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Framework Preset
                </label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                >
                  <option value="Vite">Vite (Recommended for AI Studio)</option>
                  <option value="Next.js">Next.js</option>
                  <option value="Create React App">Create React App</option>
                  <option value="Other">Other / Static HTML</option>
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Vercel automatically detects Vite configurations.
                </span>
              </div>
            </div>

            {/* Build & Output Settings Box */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Settings2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Build & Output Settings</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 mb-1 font-medium">Build Command</label>
                  <div className="font-mono bg-white px-3 py-2 rounded-md border border-slate-200 text-slate-800">
                    {buildCmd}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-medium">Output Directory</label>
                  <div className="font-mono bg-white px-3 py-2 rounded-md border border-slate-200 text-slate-800">
                    {outputDir}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deploy Action Button */}
          <div className="pt-2 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              No credit card required. Free tier includes 100 GB bandwidth & free SSL.
            </p>

            <button
              id="vercel-deploy-trigger-btn"
              onClick={handleDeploy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
            >
              <span>▲ Deploy</span>
            </button>
          </div>
        </div>
      )}

      {deployState === 'building' && (
        <div className="p-6 text-center space-y-4">
          <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600 animate-pulse">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">Building and Deploying to Global Edge...</h4>
            <p className="text-xs text-slate-500 mt-0.5">Estimated time: ~15 seconds in real world</p>
          </div>

          {/* Live Log Terminal Output */}
          <div className="text-left bg-slate-950 text-slate-300 p-4 rounded-xl font-mono text-xs max-h-56 overflow-y-auto space-y-1 shadow-inner">
            {buildLogs.map((log, i) => (
              <div key={i} className={log.startsWith('✓') ? 'text-emerald-400 font-medium' : log.includes('error') ? 'text-rose-400' : 'text-slate-300'}>
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {deployState === 'success' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-200/60 text-emerald-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                  Production Ready
                </div>
                <h4 className="text-base font-bold text-slate-900 mt-1">
                  Congratulations! Your Website is Live!
                </h4>
                <p className="text-xs text-slate-600">
                  Globally distributed across 300+ edge locations with automated HTTPS.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={deployedUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <span>Visit Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={handleReset}
                className="p-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                title="Test another deploy"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Deployment Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="text-[11px] text-slate-500 font-medium">Domain</div>
              <div className="font-mono text-xs font-bold text-blue-600 truncate mt-0.5">
                {deployedUrl.replace('https://', '')}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="text-[11px] text-slate-500 font-medium">SSL / Encryption</div>
              <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Automatic TLS 1.3
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="text-[11px] text-slate-500 font-medium">Continuous Deployment</div>
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Active on `git push`
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
