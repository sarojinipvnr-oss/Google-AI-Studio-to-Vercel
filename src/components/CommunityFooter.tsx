import { useState } from 'react';
import { Heart, Share2, Youtube, Hash, ExternalLink, Bookmark, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const TAGS = [
  "google ai studio", "google ai studio tutorial", "ai website", "ai website builder",
  "build ai website", "build website with ai", "ai generated website", "google ai studio website",
  "deploy website", "deploy website to vercel", "vercel tutorial", "github tutorial",
  "github", "vercel", "free website hosting", "host website for free", "deploy ai website",
  "google ai studio github", "google ai studio vercel", "ai web development", "website deployment",
  "html css javascript", "prompt to website", "ai coding", "vibe coding", "web development",
  "frontend development", "javascript tutorial", "coding tutorial", "web tech knowledge",
  "free hosting", "github pages alternative", "vercel deployment", "ai tools",
  "build website for free", "create website with ai", "google gemini ai", "gemini ai studio",
  "deploy website from github", "full tutorial", "beginners guide"
];

interface CommunityFooterProps {
  onTagClick?: (tag: string) => void;
}

export default function CommunityFooter({ onTagClick }: CommunityFooterProps) {
  const [likes, setLikes] = useState(1420);
  const [hasLiked, setHasLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [savedBookmark, setSavedBookmark] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    if (!isSubscribed) {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 } });
    }
  };

  const handleBookmark = () => {
    setSavedBookmark(!savedBookmark);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white pt-10 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Engagement Hero Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Full AI Web Development Masterclass</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              🔥 Perfect for developers, students, freelancers, and anyone who wants to create websites faster using AI.
            </h3>

            <p className="text-xs sm:text-sm text-slate-300">
              👍 If you found this tutorial helpful, don't forget to Like, Share, and Subscribe for more AI, web development, and programming tutorials.
            </p>

            {/* Engagement Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  hasLiked
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white' : ''}`} />
                <span>{hasLiked ? 'Liked!' : 'Like Tutorial'} ({likes.toLocaleString()})</span>
              </button>

              <button
                onClick={handleSubscribe}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSubscribed
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/30'
                }`}
              >
                <Youtube className="w-4 h-4" />
                <span>{isSubscribed ? 'Subscribed ✓' : 'Subscribe for More'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs font-semibold transition-all"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={handleBookmark}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  savedBookmark
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${savedBookmark ? 'fill-slate-950' : ''}`} />
                <span>{savedBookmark ? 'Saved to Bookmarks' : 'Bookmark Guide'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Official Ecosystem Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-slate-900 group-hover:text-blue-600">Google AI Studio</div>
              <div className="text-slate-500 mt-0.5">Build and prototype with Gemini 2.5/3</div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-slate-900 group-hover:text-blue-600">GitHub</div>
              <div className="text-slate-500 mt-0.5">Host code repositories with Git</div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
          </a>

          <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-slate-900 group-hover:text-blue-600">Vercel</div>
              <div className="text-slate-500 mt-0.5">Global edge deployment & automated CI/CD</div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
          </a>
        </div>

        {/* Tags cloud */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Hash className="w-3.5 h-3.5 text-blue-600" />
            <span>Tutorial Topics & SEO Keywords</span>
          </div>

          <div className="flex items-center flex-wrap gap-1.5">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick?.(tag)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 transition-colors border border-slate-200/60"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Built with Google AI Studio. Designed for modern web developers, students, and creators.
          </div>
          <div>
            Free & Open Source Learning Resource
          </div>
        </div>
      </div>
    </footer>
  );
}
