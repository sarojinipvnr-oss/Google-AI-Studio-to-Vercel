import { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Copy, 
  Check, 
  Download, 
  AlertTriangle, 
  FileCode, 
  HelpCircle,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { TROUBLESHOOTING_ISSUES, VERCEL_JSON_TEMPLATE } from '../data/tutorialData';

export default function DeploymentDoctor() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [copiedVercelJson, setCopiedVercelJson] = useState(false);

  const categories = ['All', 'Routing', 'Build', 'Git', 'Environment', 'Vercel'];

  const filteredIssues = TROUBLESHOOTING_ISSUES.filter(issue => {
    const matchesCategory = selectedCategory === 'All' || issue.category === selectedCategory;
    const matchesSearch = 
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.symptom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownloadVercelJson = () => {
    const blob = new Blob([VERCEL_JSON_TEMPLATE], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vercel.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyVercelJson = () => {
    navigator.clipboard.writeText(VERCEL_JSON_TEMPLATE);
    setCopiedVercelJson(true);
    setTimeout(() => setCopiedVercelJson(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Tool */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/10 border border-amber-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Deployment Doctor & Issue Resolver</h3>
                <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  Instant Fixes
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                Encountering an error during Vercel deployment or Git push? Select your symptom below to get the verified fix and configuration file.
              </p>
            </div>
          </div>

          {/* Quick vercel.json generator action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyVercelJson}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
            >
              {copiedVercelJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedVercelJson ? 'Copied vercel.json' : 'Copy vercel.json'}</span>
            </button>
            <button
              onClick={handleDownloadVercelJson}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download vercel.json</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search symptoms (e.g., 404, vite not found, VITE_ env, git remote)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all overflow-hidden"
          >
            <div className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                    issue.category === 'Routing' ? 'bg-purple-100 text-purple-700' :
                    issue.category === 'Build' ? 'bg-rose-100 text-rose-700' :
                    issue.category === 'Git' ? 'bg-blue-100 text-blue-700' :
                    issue.category === 'Environment' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {issue.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {issue.title}
                  </h4>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {issue.tags.map(t => (
                    <span key={t} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Symptom & Cause */}
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 text-rose-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-rose-950">Symptom: </span>
                    <span>{issue.symptom}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Root Cause: </span>
                    <span>{issue.cause}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-900 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-950">Resolution: </span>
                    <span>{issue.solution}</span>
                  </div>
                </div>
              </div>

              {/* Code Snippet if applicable */}
              {issue.codeSnippet && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-mono">
                    <span className="flex items-center gap-1">
                      <FileCode className="w-3.5 h-3.5" />
                      {issue.fileName || 'Configuration'}
                    </span>
                    <button
                      onClick={() => handleCopyCode(issue.id, issue.codeSnippet!)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-sans font-medium"
                    >
                      {copiedIndex === issue.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedIndex === issue.id ? 'Copied!' : 'Copy snippet'}</span>
                    </button>
                  </div>
                  <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs overflow-x-auto">
                    <pre>{issue.codeSnippet}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredIssues.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
            <p className="text-sm font-semibold text-slate-700">No issues found matching "{searchTerm}"</p>
            <p className="text-xs mt-1">Try searching for keywords like "404", "vite", "git", or select another category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
