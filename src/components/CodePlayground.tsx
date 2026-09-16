import { useState } from 'react';
import { Layout, Code, Eye, Copy, Check, Download, Sparkles, Smartphone, Monitor } from 'lucide-react';

export default function CodePlayground() {
  const [selectedDemo, setSelectedDemo] = useState<'saas' | 'portfolio' | 'agency'>('saas');
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [screenSize, setScreenSize] = useState<'desktop' | 'mobile'>('desktop');

  const saasHtmlCode = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NexusFlow — Autonomous AI Workflows</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="bg-slate-900 text-slate-100 antialiased min-h-screen">
  <nav class="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">N</div>
        <span class="font-bold text-lg text-white">NexusFlow</span>
      </div>
      <div class="hidden md:flex items-center gap-6 text-sm text-slate-300">
        <a href="#features" class="hover:text-white">Features</a>
        <a href="#pricing" class="hover:text-white">Pricing</a>
        <a href="#docs" class="hover:text-white">Docs</a>
      </div>
      <a href="#trial" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-500/20">
        Start Free Trial
      </a>
    </div>
  </nav>

  <main class="max-w-5xl mx-auto px-6 py-20 text-center space-y-8">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
      <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
      Powered by Google Gemini 2.5
    </div>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
      Orchestrate Enterprise AI Workflows in Seconds
    </h1>
    <p class="text-lg text-slate-400 max-w-2xl mx-auto">
      Connect your existing APIs, vector databases, and enterprise datasets with automated multi-agent pipelines.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
      <button class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30">
        Get Started for Free →
      </button>
      <button class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700">
        Book Architecture Demo
      </button>
    </div>
  </main>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(saasHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([saasHtmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Playground Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
            <Layout className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Live Production-Ready Website Output
            </h3>
            <p className="text-xs text-slate-500">
              Sample output generated from the Google AI Studio prompt template.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'preview' ? 'bg-slate-900 text-white font-medium' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                viewMode === 'code' ? 'bg-slate-900 text-white font-medium' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-3 h-3" />
              <span>Code</span>
            </button>
          </div>

          {viewMode === 'preview' && (
            <div className="hidden sm:flex items-center bg-white p-1 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setScreenSize('desktop')}
                className={`p-1.5 rounded-md ${screenSize === 'desktop' ? 'bg-slate-100 text-slate-900' : 'text-slate-400'}`}
                title="Desktop view"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setScreenSize('mobile')}
                className={`p-1.5 rounded-md ${screenSize === 'mobile' ? 'bg-slate-100 text-slate-900' : 'text-slate-400'}`}
                title="Mobile view"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-6 bg-slate-100/70 flex justify-center">
        {viewMode === 'preview' ? (
          <div
            className={`transition-all duration-300 bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800 ${
              screenSize === 'mobile' ? 'w-[375px]' : 'w-full'
            }`}
          >
            {/* Mock browser top bar */}
            <div className="h-8 bg-slate-950 border-b border-slate-800 px-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              <span className="text-[10px] text-slate-400 font-mono ml-2">https://nexusflow-ai.vercel.app</span>
            </div>

            {/* Rendered Live Preview */}
            <div className="p-6 sm:p-10 text-slate-100 space-y-6 text-center">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs">
                <div className="flex items-center gap-2 font-bold text-white">
                  <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-xs">N</div>
                  <span>NexusFlow AI</span>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-slate-400">
                  <span>Features</span>
                  <span>Solutions</span>
                  <span>Pricing</span>
                </div>
                <span className="px-3 py-1 rounded-lg bg-blue-600 text-white font-semibold">
                  Get Started
                </span>
              </div>

              <div className="py-8 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  Generated via Google AI Studio
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Autonomous Multi-Agent AI Pipelines
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                  Build, test, and deploy resilient web apps connected to Gemini models in seconds.
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <span className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md">
                    Start Free Trial
                  </span>
                  <span className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-medium text-xs border border-slate-700">
                    Live Demo
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs max-h-96 overflow-y-auto">
            <pre>{saasHtmlCode}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
