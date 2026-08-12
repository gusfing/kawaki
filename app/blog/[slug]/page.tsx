import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPosts } from "@/lib/mdx";
import { SERVICES } from "@/lib/data/services";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { CTASection } from "@/components/sections/CTASection";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPosts().find((p) => p.slug === slug);
  if (!post) return {};

  return buildMetadata({
    title: `${post.title} | Kawaki Studios Blog`,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const allPosts = getBlogPosts();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Resolve related services
  const resolvedServices = post.relatedServices.map((serviceSlug) => {
    const s = SERVICES.find((service) => service.slug === serviceSlug);
    return { slug: serviceSlug, name: s ? s.name : serviceSlug };
  });

  // Build JSON-LD structured data
  const jsonLd = articleJsonLd({
    title: post.title,
    description: post.excerpt,
    datePublished: post.date,
    authorName: post.author,
    url: `https://kawaki.co.in/blog/${slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Sub-Hero Header */}
      <section className="w-full pt-32 pb-20 px-5 md:px-16 bg-ink-900 text-ink-inverse relative overflow-hidden">
        <div className="absolute top-20 left-0 right-0 h-px bg-line-inverse/40" aria-hidden />
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <Eyebrow label={`${post.topic} — ${post.date}`} className="mb-4" />
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink-inverse mb-6">
              {post.title}
            </h1>
            <div className="font-mono text-xs uppercase tracking-[0.08em] text-slate">
              By {post.author} &bull; {post.readingTime}
            </div>
          </div>
        </div>
      </section>

      {/* Article Prose */}
      <section className="w-full py-24 px-5 md:px-16 bg-paper border-b border-line">
        <div className="max-w-[800px] mx-auto">
          <article className="prose font-body text-base text-slate leading-relaxed space-y-8 [&>h1]:font-display [&>h1]:font-semibold [&>h1]:text-2xl [&>h1]:text-ink [&>h1]:pt-4 [&>h2]:font-display [&>h2]:font-semibold [&>h2]:text-xl [&>h2]:text-ink">
            <MDXRemote source={post.content} />
          </article>

          {/* Related Services */}
          {resolvedServices.length > 0 && (
            <div className="mt-16 pt-12 border-t border-line">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-slate mb-4 block">
                Related Capabilities
              </span>
              <div className="flex flex-wrap gap-2">
                {resolvedServices.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`}>
                    <Tag className="hover:bg-accent hover:text-accent-ink transition-colors cursor-pointer">
                      {s.name}
                    </Tag>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-line mt-16 pt-12 flex justify-between items-center">
            <Button href="/blog" variant="secondary">← Back to all posts</Button>
            <Button href="/contact">Discuss a project</Button>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <CTASection
        heading="Need help with this?"
        subhead="Let's review your codebase and design system to identify performance and compliance issues. Technical scoping is always free."
        primaryButtonText="Discuss your project"
        primaryButtonHref="/contact"
      />
    </>
  );
}
