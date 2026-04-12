import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  body: string;
};

const blogDir = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(fileContent: string) {
  if (!fileContent.startsWith("---\n")) {
    throw new Error("Blog post is missing frontmatter.");
  }

  const endIndex = fileContent.indexOf("\n---\n", 4);

  if (endIndex === -1) {
    throw new Error("Blog post frontmatter is not closed.");
  }

  const rawFrontmatter = fileContent.slice(4, endIndex).trim();
  const body = fileContent.slice(endIndex + 5).trim();
  const fields = rawFrontmatter.split("\n");
  const data: Record<string, string> = {};

  for (const field of fields) {
    const separatorIndex = field.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = field.slice(0, separatorIndex).trim();
    const value = field.slice(separatorIndex + 1).trim();
    data[key] = value;
  }

  return { data, body };
}

function normalizeString(value: string | undefined, fallback: string) {
  return value?.replace(/^['"]|['"]$/g, "").trim() || fallback;
}

function normalizeTags(value: string | undefined) {
  const normalized = value?.replace(/^\[|\]$/g, "").trim();

  if (!normalized) {
    return [];
  }

  return normalized
    .split(",")
    .map((tag) => tag.replace(/^['"]|['"]$/g, "").trim())
    .filter(Boolean);
}

function readPost(slug: string): BlogPost {
  const filePath = path.join(blogDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, body } = parseFrontmatter(fileContent);

  return {
    slug,
    title: normalizeString(data.title, slug),
    description: normalizeString(data.description, ""),
    date: normalizeString(data.date, ""),
    author: normalizeString(data.author, "Termio"),
    tags: normalizeTags(data.tags),
    body,
  };
}

export function getAllPosts() {
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => readPost(file.replace(/\.md$/, "")))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string) {
  return readPost(slug);
}

export function getAllPostSlugs() {
  return getAllPosts().map((post) => post.slug);
}

export function slugifyTag(tag: string) {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

export function tagFromSlug(
  slug: string,
  allTags: string[],
): string | undefined {
  return allTags.find((tag) => slugifyTag(tag) === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}
