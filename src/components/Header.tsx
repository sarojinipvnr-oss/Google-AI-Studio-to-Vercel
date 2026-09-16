import { useState } from 'react';
import { Sparkles, Heart, Share2, Youtube, CheckCircle, ExternalLink, BookmarkCheck, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ completedCount, totalCount, activeTab, setActiveTab }: HeaderProps) {
  const [likes, setLikes] = useState(1420);
  const [hasLiked, setHasLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const percent = Math.round((completedCount / totalCount) * 100);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.2 }
      });
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    if (!isSubscribed) {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.2 }
      });
    }
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-sm shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg truncate">
                  AI Studio <span className="text-slate-400">→</span> Vercel
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  Full Guide & Tools
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block truncate">
                Prompt to Production: Google AI Studio, GitHub, Vercel & CI/CD
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-medium">
            <button
              id="tab-guide"
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'guide'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Step-by-Step Guide
            </button>
            <button
              id="tab-terminal"
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'terminal'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Git Terminal
            </button>
            <button
              id="tab-simulator"
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'simulator'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vercel Simulator
            </button>
            <button
              id="tab-doctor"
              onClick={() => setActiveTab('doctor')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'doctor'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Deployment Doctor
            </button>
            <button
              id="tab-checklist"
              onClick={() => setActiveTab('checklist')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'checklist'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Checklist ({percent}%)
            </button>
          </nav>

          {/* Actions & Engagement Bar */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Like button */}
            <button
              id="action-like-btn"
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                hasLiked
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="Helpful tutorial? Give a like!"
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
              <span>{likes.toLocaleString()}</span>
            </button>

            {/* Subscribe toggle button */}
            <button
              id="action-subscribe-btn"
              onClick={handleSubscribe}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isSubscribed
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <Youtube className="w-3.5 h-3.5 text-red-400" />
              <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
            </button>

            {/* Share link button */}
            <button
              id="action-share-btn"
              onClick={handleCopyShare}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex lg:hidden overflow-x-auto py-2 border-t border-slate-100 gap-1 text-xs">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'guide' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Guide
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'terminal' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Git Terminal
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'simulator' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Vercel Simulator
          </button>
          <button
            onClick={() => setActiveTab('doctor')}
            className={`px-3 py-1 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'doctor' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Fix Issues
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3 py-1 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'checklist' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Checklist ({percent}%)
          </button>
        </div>
      </div>
    </header>
  );
}
