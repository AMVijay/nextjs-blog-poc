import fs from "fs";
import path from "path";

export function getMarkdownFiles() {
  const blogDir = path.join(process.cwd(), "blog");
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"));
}
