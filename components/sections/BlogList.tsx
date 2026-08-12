"use client";

import { useState } from "react";
import { BlogPostData } from "@/lib/mdx";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface BlogListProps {
  posts: BlogPostData[];
}

export function BlogList({ posts }: BlogListProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("all");

  const topics = Array.from(new Set(posts.map((p) => p.topic)));

  const filteredPosts = posts.filter((post) => {
    return selectedTopic === "all" || post.topic === selectedTopic;
  });

  return (
    <div className="space-y-12">
      {/* Filter Bar */}
      <div className="flex flex-col gap-2 border-b border-line pb-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate">Filter by Topic</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTopic("all")}
            className={cn(
              "px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] border rounded-[2px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal",
              selectedTopic === "all"
                ? "bg-ink border-ink text-ink-inverse"
                : "border-line bg-field text-slate hover:text-ink hover:border-ink"
            )}
          >
            All Topics
          </button>
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={cn(
                "px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] border rounded-[2px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal",
                selectedTopic === topic
                  ? "bg-ink border-ink text-ink-inverse"
                  : "border-line bg-field text-slate hover:text-ink hover:border-ink"
              )}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <div key={post.slug} className="h-full">
            <Card
              meta={`${post.topic} — ${post.date}`}
              title={post.title}
              description={
                <div className="flex flex-col h-full justify-between items-start">
                  <p className="font-body text-base text-slate leading-relaxed flex-1">{post.excerpt}</p>
                  <span className="font-mono text-[10px] text-slate mt-4">{post.readingTime}</span>
                </div>
              }
              href={`/blog/${post.slug}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
