import { getMarkdownFiles } from "./getMarkdownFiles";

export default function Home() {
  const mdFilesByFolder = getMarkdownFiles();
  const hasFiles =
    Object.keys(mdFilesByFolder).length > 0 &&
    Object.values(mdFilesByFolder).some((arr) => arr.length > 0);
  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-start justify-start">
      <h1 className="text-2xl font-bold mb-8">VIJAYaraaghavan Manoharan</h1>
      <div className="w-full flex justify-start">
        <div className="max-w-md">
          <h2 className="text-lg font-bold mb-4 text-left">Blogs</h2>
          {!hasFiles ? (
            <ul className="list-disc pl-6 text-left">
              <li>No markdown files found in blog/</li>
            </ul>
          ) : (
            Object.entries(mdFilesByFolder).map(([folder, files]) => (
              <div key={folder} className="mb-6">
                {folder !== "." && (
                  <h3 className="text-md font-semibold mb-2">{folder}</h3>
                )}
                <ul className="list-disc pl-6 text-left">
                  {files.map((file) => (
                    <li key={file}>
                        <a
                        href={`/blog/${folder}/${file.replace(/\.md$/, "")}`}
                        className="text-black hover:underline"
                        style={{ color: "black" }}
                        >
                        {file}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
