import { useApi } from '../../hooks/useApi.js';
import { FileText, Copy, Sparkles, ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

interface TemplateLibraryProps {
  type: 'blog' | 'page';
  onSelectTemplate?: (content: string) => void;
}

export function TemplateLibrary({ type, onSelectTemplate }: TemplateLibraryProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const builtInTemplates = [
    {
      id: 'intro',
      name: 'Editorial Hook & Deep Dive',
      description: 'Opening hook with narrative overview, engineering analysis, and key takeaways.',
      preview: `# [Your Story Title Here]\n\n## Introduction\nStart with a compelling hook that captures attention.\n\n## The Architecture\nDescribe the engineering challenge or creative ambition.\n\n## Key Takeaways\n- Point 1\n- Point 2\n\n## Conclusion\nWrap up with a future-facing call-to-action.`,
    },
    {
      id: 'tutorial',
      name: 'Technical Case Study & Guide',
      description: 'Step-by-step breakdown with code snippets, architecture diagrams, and benchmark results.',
      preview: `# How We Built [System Name]\n\n## The Problem Statement\nHigh-level breakdown of requirements.\n\n## Technical Implementation\n\`\`\`typescript\n// Implementation code\n\`\`\`\n\n## Performance Impact\nMetrics and speedups achieved.`,
    },
    {
      id: 'listicle',
      name: 'Curated Principles & Standards',
      description: 'Top 10 / Best practices format tailored for studio design engineering standards.',
      preview: `# 10 Rules for Modern Web Architecture\n\n## 1. Zero Placeholders\nAlways generate production-grade UI assets.\n\n## 2. Micro-Interactions\nEnsure stateful responsiveness on every interactive component.`,
    },
  ];

  const handleCopy = (id: string, text: string) => {
    onSelectTemplate?.(text);
    setCopiedId(id);
    navigator.clipboard.writeText(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FC4625]/10 border border-[#FC4625]/20 flex items-center justify-center text-[#FC4625]">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="font-bold text-white font-display text-base">Editorial Templates</h3>
            <p className="text-xs text-zinc-400">Pre-structured formats to accelerate content creation</p>
          </div>
        </div>
      </div>

      <div className="space-y-3.5">
        {builtInTemplates.map((template) => (
          <div
            key={template.id}
            className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#FC4625]/30 hover:bg-white/[0.05] transition-all flex flex-col justify-between gap-3"
          >
            <div>
              <h4 className="font-bold text-sm text-zinc-100 font-display">{template.name}</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{template.description}</p>
            </div>

            <button
              onClick={() => handleCopy(template.id, template.preview)}
              className="btn-secondary text-xs py-1.5 px-3 self-start font-medium"
            >
              {copiedId === template.id ? (
                <>
                  <Check size={13} className="text-emerald-400" /> Copied to Clipboard
                </>
              ) : (
                <>
                  <Copy size={13} /> Copy Template
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
