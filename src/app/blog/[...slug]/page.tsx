import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";
import { marked } from "marked";
import { notFound } from "next/navigation";

interface FrontMatter {
  title: string;
  date: string;
  slug: string;
}

const postsDirectory = path.join(process.cwd(), "blog");

export async function generateStaticParams() {
  function walk(dir: string, parent: string[] = []): { slug: string[] }[] {
    let params: { slug: string[] }[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        params = params.concat(walk(path.join(dir, entry.name), [...parent, entry.name]));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const slugArr = [...parent, entry.name.replace(/\.md$/, "")];
        params.push({ slug: slugArr });
      }
    }
    return params;
  }
  return walk(postsDirectory);
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const slugArr = (await params).slug;
  const relPath = Array.isArray(slugArr) ? slugArr.join("/") : slugArr;
  const filePath = path.join(postsDirectory, `${relPath}.md`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);
  const frontMatter = data as FrontMatter;
  const htmlContent = marked(content);

  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-start justify-start">
      <h1 className="text-2xl font-bold mb-8">{frontMatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
    </div>
  );
}
