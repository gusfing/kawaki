import { useState } from 'react';
import { useApiMutation } from '../../hooks/useApi.js';
import { CheckCircle2, AlertCircle, Info, Search, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface SeoAnalysis {
  readability: number;
  wordCount: number;
  headingCount: number;
  linkCount: number;
  imageCount: number;
  keywordDensity: Record<string, number>;
  headingStructure: string;
  issues: string[];
  score: number;
}

export function SeoAnalyzer() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState<SeoAnalysis | null>(null);

  const { mutate: analyze, loading, error } = useApiMutation<
    { title: string; content: string },
    SeoAnalysis
  >('/seo/analyze');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Please enter both title and content');
      return;
    }

    try {
      const result = await analyze({ title, content });
      if (result) {
        setAnalysis(result);
      }
    } catch (err) {
      console.error('Failed to analyze:', err);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
          SEO Engine & Readability Analyzer
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Evaluate keyword distributions, heading architectures, readability indices, and Google search readiness.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAnalyze} className="card space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Story / Page Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Next.js 16 Architectural Performance Patterns"
            className="input text-base font-medium"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Content Body (Markdown Supported) *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your story draft or landing page markdown text to run an in-depth SEO audit..."
            className="input font-mono text-xs min-h-[180px] p-4 leading-relaxed"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-xs font-semibold tracking-wide disabled:opacity-50"
        >
          <Search size={15} />
          {loading ? 'Analyzing Content...' : 'Run In-Depth SEO Audit'}
        </button>
      </form>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="card relative overflow-hidden bg-gradient-to-br from-[#181824] to-[#111116] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
                  Audit Verdict
                </span>
                <h3 className="text-2xl font-extrabold font-display text-white mt-1">
                  Overall SEO Score
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {analysis.score >= 80
                    ? '🌟 Optimal for search indexing & reader engagement.'
                    : analysis.score >= 60
                      ? '⚡ Good foundation, minor keyword/heading tweaks suggested.'
                      : '⚠️ Requires optimization before publishing.'}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="text-5xl sm:text-6xl font-extrabold font-display text-[#FC4625] drop-shadow-[0_0_20px_rgba(252,70,37,0.4)]">
                  {analysis.score}
                </div>
                <span className="text-xs font-mono text-zinc-500 font-bold">/ 100</span>
              </div>
            </div>

            <div className="mt-6 bg-white/5 rounded-full h-3 w-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#FC4625] to-[#FF6B4A] h-3 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, Math.max(5, analysis.score))}%` }}
              />
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MetricCard label="Word Count" value={analysis.wordCount} />
            <MetricCard label="Readability" value={analysis.readability} suffix="%" />
            <MetricCard label="Headings" value={analysis.headingCount} />
            <MetricCard label="Images" value={analysis.imageCount} />
          </div>

          {/* Issues */}
          {analysis.issues && analysis.issues.length > 0 && (
            <div className="card border-yellow-500/30 bg-yellow-500/5 space-y-3">
              <h3 className="font-bold text-yellow-300 flex items-center gap-2 text-sm font-display">
                <AlertCircle size={16} /> Optimization Opportunities ({analysis.issues.length})
              </h3>
              <ul className="space-y-2 text-xs text-yellow-200/90">
                {analysis.issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Top Keywords */}
          {analysis.keywordDensity && Object.keys(analysis.keywordDensity).length > 0 && (
            <div className="card space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display flex items-center gap-2">
                <Info size={16} className="text-blue-400" /> Focus Keyword Distribution
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {Object.entries(analysis.keywordDensity)
                  .slice(0, 10)
                  .map(([keyword, density]) => (
                    <div
                      key={keyword}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-between"
                    >
                      <span className="text-xs font-mono text-zinc-300 truncate">{keyword}</span>
                      <span className="text-xs font-bold text-[#FC4625] font-mono mt-1">
                        {density.toFixed(2)}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MetricCard({
  label,
  value,
  suffix = '',
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="card p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">{label}</p>
      <p className="text-2xl font-extrabold font-display text-white mt-2 tracking-tight">
        {value}
        <span className="text-xs text-zinc-500 ml-0.5">{suffix}</span>
      </p>
    </div>
  );
}
