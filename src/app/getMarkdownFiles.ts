import fs from "fs";
import path from "path";

export function getMarkdownFiles() {
  const blogDir = path.join(process.cwd(), "blog");
  if (!fs.existsSync(blogDir)) return {};
  const result: Record<string, string[]> = {};

  // Get all entries in blogDir
  const entries = fs.readdirSync(blogDir, { withFileTypes: true });

  // Top-level .md files
  const topLevelFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name);
  if (topLevelFiles.length > 0) {
    result["."] = topLevelFiles;
  }

  // Subfolders and their .md files, sorted in descending order by folder name
  entries
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name)) // ascending order
    .forEach((dir) => {
      const subDir = path.join(blogDir, dir.name);
      const subFiles = fs
        .readdirSync(subDir)
        .filter((file) => file.endsWith(".md"));
      if (subFiles.length > 0) {
        result[dir.name] = subFiles;
      }
    });

  return result;
}
