import { useMemo } from 'react';

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const html = useMemo(() => {
    return parseMarkdown(content);
  }, [content]);

  return (
    <div className="prose prose-sm max-w-none">
      <div
        className="bg-white rounded-lg p-6 text-gray-900"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function parseMarkdown(markdown: string): string {
  let html = markdown;

  // Headings
  html = html.replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong class="font-bold">$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.+?)_/g, '<em class="italic">$1</em>');

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 rounded overflow-x-auto mb-3"><code>$1</code></pre>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded my-4" />');

  // Lists
  html = html.replace(/^\* (.*?)$/gm, '<li class="ml-4">$1</li>');
  html = html.replace(/^\- (.*?)$/gm, '<li class="ml-4">$1</li>');
  html = html.replace(/^(\d+)\. (.*?)$/gm, '<li class="ml-4">$2</li>');

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p class="mb-3">');
  html = `<p class="mb-3">${html}</p>`;

  // Blockquotes
  html = html.replace(/^&gt; (.*?)$/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic mb-3">$1</blockquote>');

  // Clean up empty paragraphs
  html = html.replace(/<p class="mb-3"><\/p>/g, '');

  return html;
}
