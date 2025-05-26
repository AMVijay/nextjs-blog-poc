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
  const files = fs.readdirSync(postsDirectory);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({ slug: file.replace(/\.md$/, "") }));
}

export default async function BlogPage({ params, }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(postsDirectory, `${slug}.md`);
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
