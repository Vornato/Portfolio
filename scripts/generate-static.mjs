// scripts/generate-static.cjs
// Create index.html + 404.html that load the client bundle on GitHub Pages.

import fs from "node:fs";
import path from "node:path";

const CLIENT_DIR = path.join(process.cwd(), "build", "client");
const ASSETS_DIR = path.join(CLIENT_DIR, "assets");
const MANIFEST_PATH = path.join(CLIENT_DIR, ".vite", "manifest.json");

/** Try manifest first, fall back to scanning /assets */
function getFiles() {
  let entryJs = null;
  let rootCss = null;

  try {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
    // Find the entry.client chunk
    const entryKey = Object.keys(manifest).find(k =>
      /entry\.client\.(t|j)sx?$/.test(k)
    );
    if (entryKey) {
      entryJs = manifest[entryKey].file; // e.g. assets/entry.client-XXXX.js
    }
    // Find a root-*.css (React Router builds emit it)
    const cssKey = Object.keys(manifest).find(k =>
      /root\.(t|j)sx?$/.test(k)
    );
    if (cssKey && manifest[cssKey].css && manifest[cssKey].css[0]) {
      rootCss = manifest[cssKey].css[0]; // e.g. assets/root-XXXX.css
    }
  } catch {
    // no-op; will scan below
  }

  const files = fs.readdirSync(ASSETS_DIR);

  if (!entryJs) {
    const e = files.find(f => /^entry\.client-.*\.js$/.test(f));
    if (e) entryJs = `assets/${e}`;
  }

  if (!rootCss) {
    const c = files.find(f => /^root-.*\.css$/.test(f));
    if (c) rootCss = `assets/${c}`;
  }

  if (!entryJs) {
    throw new Error("Could not find entry.client-*.js in build/client/assets");
  }
  return { entryJs, rootCss };
}

function makeHtml({ entryJs, rootCss }) {
  // Paths are relative to /Portfolio/ because these files sit at build/client/
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>VorNato — Portfolio</title>
  ${rootCss ? `<link rel="stylesheet" href="${rootCss}" />` : ""}
</head>
<body>
  <div id="root"></div>
  <script type="module" src="${entryJs}"></script>
</body>
</html>`;
}

const { entryJs, rootCss } = getFiles();
const html = makeHtml({ entryJs, rootCss });

// Write both files so GH Pages serves SPA and deep links
fs.writeFileSync(path.join(CLIENT_DIR, "index.html"), html);
fs.writeFileSync(path.join(CLIENT_DIR, "404.html"), html);

console.log("✅ Wrote build/client/index.html and 404.html");
