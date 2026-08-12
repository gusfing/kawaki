import { buildMetadata } from "@/lib/seo";
import { getBlogPosts } from "@/lib/mdx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BlogList } from "@/components/sections/BlogList";

export const metadata = buildMetadata({
  title: "Blog & Engineering Insights | Kawaki Studios",
  description: "B2B web development insights, SEO strategies, design system architectures, and Next.js performance deep dives.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      {/* Dark Sub-Hero Section */}
      <section className="w-full pt-32 pb-20 px-5 md:px-16 bg-ink-900 text-ink-inverse relative overflow-hidden">
        <div className="absolute top-20 left-0 right-0 h-px bg-line-inverse/40" aria-hidden />
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <Eyebrow label="Journal" className="mb-4" />
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink-inverse mb-6">
              Notes on building things well.
            </h1>
            <p className="font-body text-lg text-slate leading-[1.6]">
              A log of technical problems we solved, speed architectures we built,
              and design conventions we enforce. Straight technical details, no growth-hacking fluff.
            </p>
          </div>
        </div>
      </section>

      {/* Main Blog List Section */}
      <section className="w-full py-24 px-5 md:px-16 bg-paper">
        <div className="max-w-[1280px] mx-auto">
          <BlogList posts={posts} />
        </div>
      </section>
    </>
  );
}
