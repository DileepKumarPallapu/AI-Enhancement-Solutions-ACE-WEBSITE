import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface MarkdownViewProps {
  content: string;
  className?: string;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({ content, className = '' }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Parse code blocks (```lang ... ```)
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let blockIndex = 0;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const textChunk = content.substring(lastIndex, match.index);
      parts.push(renderTextChunk(textChunk, `text-${blockIndex}`));
    }

    const lang = match[1] || 'code';
    const codeText = match[2].trim();
    const currentBlockIdx = blockIndex;

    parts.push(
      <div key={`code-${currentBlockIdx}`} className="my-3 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-200 shadow-md">
        <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-purple-400">
            <Terminal className="w-3.5 h-3.5" /> {lang}
          </span>
          <button
            onClick={() => handleCopy(codeText, currentBlockIdx)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-slate-800 transition-colors text-[10px]"
          >
            {copiedIndex === currentBlockIdx ? (
              <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> Copied</span>
            ) : (
              <span className="flex items-center gap-1"><Copy className="w-3 h-3" /> Copy</span>
            )}
          </button>
        </div>
        <pre className="p-3.5 text-xs font-mono overflow-x-auto leading-relaxed text-purple-200">
          <code>{codeText}</code>
        </pre>
      </div>
    );

    lastIndex = match.index + match[0].length;
    blockIndex++;
  }

  if (lastIndex < content.length) {
    parts.push(renderTextChunk(content.substring(lastIndex), `text-${blockIndex}`));
  }

  return <div className={`space-y-2 leading-relaxed ${className}`}>{parts}</div>;
};

function renderTextChunk(text: string, keyPrefix: string): React.ReactNode {
  const lines = text.split('\n');

  return (
    <div key={keyPrefix} className="space-y-1.5">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="font-extrabold text-sm text-slate-900 dark:text-white pt-2 pb-0.5 border-b border-slate-200/60 dark:border-slate-800/60">
              {formatInlineFormatting(trimmed.substring(4))}
            </h4>
          );
        }

        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="font-black text-base text-slate-900 dark:text-white pt-2 pb-0.5">
              {formatInlineFormatting(trimmed.substring(3))}
            </h3>
          );
        }

        if (trimmed.startsWith('#### ')) {
          return (
            <h5 key={idx} className="font-bold text-xs text-brand-600 dark:text-brand-400 pt-1">
              {formatInlineFormatting(trimmed.substring(5))}
            </h5>
          );
        }

        if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 text-slate-700 dark:text-slate-300">
              <span className="text-brand-600 font-bold mt-0.5 text-xs">•</span>
              <span className="flex-1">{formatInlineFormatting(trimmed.substring(2))}</span>
            </div>
          );
        }

        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 text-slate-700 dark:text-slate-300">
              <span className="font-mono font-bold text-brand-600 text-xs mt-0.5">{numMatch[1]}.</span>
              <span className="flex-1">{formatInlineFormatting(numMatch[2])}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="text-slate-800 dark:text-slate-200">
            {formatInlineFormatting(line)}
          </p>
        );
      })}
    </div>
  );
}

function formatInlineFormatting(text: string): React.ReactNode[] {
  const tokenRegex = /(`[^`]+`)|(\*[^*]+\*)|(\*\*[^*]+\*\*)/g;
  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  let k = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.substring(lastIdx, match.index));
    }

    const token = match[0];
    if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={k++} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 font-mono text-[11px] font-bold border border-slate-200 dark:border-slate-700">
          {token.substring(1, token.length - 1)}
        </code>
      );
    } else if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={k++} className="font-extrabold text-slate-900 dark:text-white">
          {token.substring(2, token.length - 2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={k++} className="italic text-slate-700 dark:text-slate-300">
          {token.substring(1, token.length - 1)}
        </em>
      );
    }

    lastIdx = match.index + token.length;
  }

  if (lastIdx < text.length) {
    parts.push(text.substring(lastIdx));
  }

  return parts;
}
