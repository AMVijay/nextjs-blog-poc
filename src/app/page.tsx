import { getMarkdownFiles } from "./getMarkdownFiles";

export default function Home() {
  const mdFiles = getMarkdownFiles();
  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-start justify-start">
      <h1 className="text-2xl font-bold mb-8">VIJAYaraaghavan Manoharan</h1>
      <div className="w-full flex justify-start">
        <div className="max-w-md">
          <h2 className="text-lg font-bold mb-4 text-left">Blogs</h2>
          <ul className="list-disc pl-6 text-left">
            {mdFiles.length === 0 ? (
              <li>No markdown files found in blog/</li>
            ) : (
              mdFiles.map((file) => (
                <li key={file}>{file}</li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
