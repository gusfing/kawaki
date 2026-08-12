import fs from "fs";
import path from "path";

export interface CaseStudyData {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  summary: string;
  year: string;
  results: { value: string; label: string }[];
  featured: boolean;
  image?: string;
  content: string;
}

export interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  topic: string;
  relatedServices: string[];
  content: string;
  readingTime: string;
}

export interface GuideData {
  slug: string;
  title: string;
  excerpt: string;
  updatedDate: string;
  relatedServices: string[];
  content: string;
}

type Frontmatter = Record<string, unknown>;

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

// Simple frontmatter parser
function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) return { data: {} as Frontmatter, content: fileContent };

  const frontmatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const data: Frontmatter = {};

  frontmatterBlock.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      let val = line.slice(colonIndex + 1).trim();

      // Clean string quotes
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      } else if (val.startsWith("'") && val.endsWith("'")) {
        val = val.slice(1, -1);
      }

      if (val.startsWith("[") && val.endsWith("]")) {
        try {
          data[key] = JSON.parse(val.replace(/'/g, '"'));
        } catch {
          data[key] = val
            .slice(1, -1)
            .split(",")
            .map((s) => s.trim().replace(/^["']|["']$/g, ""));
        }
      } else if (val === "true") {
        data[key] = true;
      } else if (val === "false") {
        data[key] = false;
      } else {
        data[key] = val;
      }
    }
  });

  return { data, content };
}

function getReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getCaseStudies(): CaseStudyData[] {
  const dir = path.join(CONTENT_DIR, "case-studies");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(dir, file);
    const rawContent = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = parseFrontmatter(rawContent);

    let resultsList: { value: string; label: string }[] = [];
    if (data.results) {
      if (Array.isArray(data.results)) {
        resultsList = data.results.map((r: unknown) => {
          if (typeof r === "object" && r !== null) {
            const result = r as Record<string, unknown>;
            return {
              value: asString(result.value, asString(result.metric)),
              label: asString(result.label),
            };
          }
          if (typeof r === "string") {
            const colonIndex = r.indexOf(":");
            if (colonIndex > -1) {
              return {
                value: r.slice(0, colonIndex).trim(),
                label: r.slice(colonIndex + 1).trim()
              };
            }
            return { value: r, label: "" };
          }
          return { value: "", label: "" };
        });
      }
    }

    return {
      slug,
      title: asString(data.title),
      client: asString(data.client),
      industry: asString(data.industry),
      services: asStringArray(data.services),
      summary: asString(data.summary),
      year: asString(data.year),
      results: resultsList,
      featured: data.featured === true,
      image: typeof data.image === 'string' ? data.image : undefined,
      content,
    };
  });
}

export function getBlogPosts(): BlogPostData[] {
  const dir = path.join(CONTENT_DIR, "blog");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(dir, file);
    const rawContent = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = parseFrontmatter(rawContent);

    return {
      slug,
      title: asString(data.title),
      excerpt: asString(data.excerpt),
      date: asString(data.date),
      author: asString(data.author, "Kawaki Team"),
      topic: asString(data.topic, "General"),
      relatedServices: asStringArray(data.relatedServices),
      content,
      readingTime: getReadingTime(content),
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getGuides(): GuideData[] {
  const dir = path.join(CONTENT_DIR, "guides");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".mdx"));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(dir, file);
    const rawContent = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = parseFrontmatter(rawContent);

    return {
      slug,
      title: asString(data.title),
      excerpt: asString(data.excerpt),
      updatedDate: asString(data.updatedDate),
      relatedServices: asStringArray(data.relatedServices),
      content,
    };
  });
}
