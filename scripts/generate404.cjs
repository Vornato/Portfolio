// scripts/generate404.cjs
// Create build/client/404.html for GitHub Pages SPA fallback.

const fs = require("fs");
const path = require("path");

const clientDir = path.resolve(process.cwd(), "build/client");
const viteDir = path.join(clientDir, ".vite");
const assetsDir = path.join(clientDir, "assets");

// Try both possible manifest locations
const candidates = [
  path.join(viteDir, "manifest.json"),
  path.join(clientDir, "manifest.json"),
];

let manifest;
let entry = null;

// 1) Try to read a Vite manifest
for (const p of candidates) {
  if (fs.existsSync(p)) {
    try {
      const json = JSON.parse(fs.readFileSync(p, "utf-8"));
      const entries = Object.values(json);
      entry = entries.find((e) => e && e.isEntry);
      manifest = json;
      console.log("✅ Using manifest at:", p);
      break;
    } catch (e) {
      console.warn("⚠️ Failed reading manifest at:", p, e.message);
    }
  }
}

// 2) Fallback: scan /assets for entry + css if no manifest
let jsSrc = "";
let cssFiles = [];
if (!entry) {
  console.warn("⚠️ Manifest not found. Falling back to scanning /assets…");

  if (!fs.existsSync(assetsDir)) {
    console.error("❌ assets directory not found:", assetsDir);
    try {
      console.log("clientDir contents:", fs.readdirSync(clientDir));
    } catch {}
    process.exit(1);
  }

  const files = fs.readdirSync(assetsDir);
  const js = files.find((f) => /^entry\.client-.*\.js$/.test(f)) || files.find((f) => f.endsWith(".js"));
  const css = files.filter((f) => /^root-.*\.css$/.test(f) || f.endsWith(".css"));

  if (!js) {
    console.error("❌ Couldn’t locate entry.client*.js in:", assetsDir);
    console.log("Found files:", files);
    process.exit(1);
  }

  jsSrc = `./assets/${js}`;
  cssFiles = css.map((f) => `./assets/${f}`);
} else {
  jsSrc = entry.file ? `./${entry.file}` : "";
  cssFiles = Array.isArray(entry.css) ? entry.css.map((c) => `./${c}`) : [];
}

// 3) Write 404.html
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Portfolio</title>
    ${cssFiles.map((href) => `<link rel="stylesheet" href="${href}">`).join("\n    ")}
  </head>
  <body>
    <div id="root"></div>
    ${jsSrc ? `<script type="module" src="${jsSrc}"></script>` : ""}
  </body>
</html>
`;

const outPath = path.join(clientDir, "404.html");
fs.writeFileSync(outPath, html);
console.log("✅ Wrote", outPath);
