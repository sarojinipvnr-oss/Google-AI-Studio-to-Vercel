import { useState } from 'react';
import { Sparkles, Copy, Check, Sliders, Wand2, Lightbulb, Code } from 'lucide-react';
import { PROMPT_TEMPLATES } from '../data/tutorialData';
import { PromptTemplate } from '../types';

export default function PromptLibrary() {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate>(PROMPT_TEMPLATES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom Prompt Builder state
  const [siteType, setSiteType] = useState('SaaS Product Landing Page');
  const [colorTheme, setColorTheme] = useState('Slate neutrals with indigo accents');
  const [keyFeatures, setKeyFeatures] = useState('Interactive pricing calculator, testimonials carousel, feature tabs, contact modal');
  const [targetAudience, setTargetAudience] = useState('Developers and Tech Founders');
  const [copiedCustom, setCopiedCustom] = useState(false);

  const customGeneratedPrompt = `Act as an expert frontend engineer. Build a responsive, production-ready website using React and Tailwind CSS for: "${siteType}".

Target Audience: ${targetAudience}
Color Palette & Aesthetic: ${colorTheme}

Essential Functional & UI Requirements:
1. Navigation: Clean header with logo, primary navigation links, responsive mobile hamburger drawer, and high-contrast call-to-action button.
2. Hero Section: Catchy value proposition headline, descriptive sub-headline, primary and secondary action buttons, and visual preview asset container.
3. Feature Breakdown: Include ${keyFeatures}.
4. Production Quality:
   - Full mobile responsiveness (375px to 1440px).
   - Semantic HTML5 elements (<header>, <main>, <section>, <article>, <footer>).
   - High accessibility contrast (WCAG AA compliant).
   - Zero console errors or undefined state references.
   - Interactive state handling (tabs switch content, forms validate inputs, modals open and close cleanly).`;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyCustom = () => {
    navigator.clipboard.writeText(customGeneratedPrompt);
    setCopiedCustom(true);
    setTimeout(() => setCopiedCustom(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-sky-600/10 border border-blue-200">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Google AI Studio Prompt Engineering System
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              High-performing prompts are specific, modular, and establish concrete technical boundaries. Choose from vetted production templates below or craft your custom prompt with the interactive builder.
            </p>
          </div>
        </div>
      </div>

      {/* Template Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROMPT_TEMPLATES.map((tmpl) => {
          const isSelected = tmpl.id === selectedTemplate.id;
          return (
            <div
              key={tmpl.id}
              onClick={() => setSelectedTemplate(tmpl)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/50 border-blue-400 ring-2 ring-blue-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {tmpl.category}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(tmpl.id, tmpl.promptText);
                  }}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  {copiedId === tmpl.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === tmpl.id ? 'Copied' : 'Copy Prompt'}</span>
                </button>
              </div>

              <h4 className="text-sm font-bold text-slate-900 mb-1">{tmpl.title}</h4>
              <p className="text-xs text-slate-500 mb-3">{tmpl.description}</p>

              <div className="flex items-center gap-1.5 flex-wrap">
                {tmpl.tags.map(t => (
                  <span key={t} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Template Detail & Copy Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Prompt Preview: {selectedTemplate.title}
            </h4>
          </div>

          <button
            onClick={() => handleCopy(selectedTemplate.id, selectedTemplate.promptText)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs"
          >
            {copiedId === selectedTemplate.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === selectedTemplate.id ? 'Copied to Clipboard!' : 'Copy Full Prompt'}</span>
          </button>
        </div>

        <div className="p-5 bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap">
          {selectedTemplate.promptText}
        </div>
      </div>

      {/* Interactive Custom Prompt Crafter */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-indigo-600" />
          <h4 className="text-base font-bold text-slate-900">Custom Website Prompt Crafter</h4>
        </div>
        <p className="text-xs text-slate-500">
          Adjust the parameters below to generate a tailored, prompt-engineered specification for Google AI Studio.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Website Type & Concept</label>
            <input
              type="text"
              value={siteType}
              onChange={(e) => setSiteType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Color Theme & Aesthetic</label>
            <input
              type="text"
              value={colorTheme}
              onChange={(e) => setColorTheme(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Key Features (comma-separated)</label>
            <input
              type="text"
              value={keyFeatures}
              onChange={(e) => setKeyFeatures(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleCopyCustom}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            {copiedCustom ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCustom ? 'Copied Custom Prompt!' : 'Copy Generated Custom Prompt'}</span>
          </button>
        </div>
      </div>

      {/* Pro Tips Card */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-amber-950">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Pro-Tip for Google AI Studio</span>
        </div>
        <p>
          Always ask the model to break large single-file codebases into clean modular components (<code className="bg-amber-100/80 px-1 py-0.5 rounded">src/components/*</code> and <code className="bg-amber-100/80 px-1 py-0.5 rounded">src/types.ts</code>). This prevents token-length truncation errors and makes your repo look professionally engineered on GitHub!
        </p>
      </div>
    </div>
  );
}
