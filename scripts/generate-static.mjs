// scripts/generate-static.mjs
import fs from "node:fs";
import path from "node:path";

const manifestPath = path.join("build", "client", ".vite", "manifest.json");
if (!fs.existsSync(manifestPath)) {
  console.error("❌ Manifest not found at:", manifestPath);
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

const entry = Object.values(manifest).find((m) =>
  String(m.file || "").includes("entry.client")
);
const css = [];
if (entry?.css) css.push(...entry.css);
for (const v of Object.values(manifest)) {
  if (v && v.file?.includes("root-") && Array.isArray(v.css)) {
    css.push(...v.css);
  }
}

const base = "/Portfolio/";
const cssLinks = css
  .map((c) => `<link rel="stylesheet" href="${base}${c}">`)
  .join("\n    ");
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1"
    />
    <title>Portfolio</title>
    ${cssLinks}
  </head>
  <body>
    <div id="root"></div>
    <script>
      // make sure GH Pages paths behave like a SPA
      (function() {
        var base = "${base}".replace(/\\/$/, "/");
        if (!location.pathname.startsWith(base)) {
          location.replace(base);
        }
      })();
    </script>
    <script type="module" src="${base}${entry.file}"></script>
  </body>
</html>`;

const out404 = path.join("build", "client", "404.html");
fs.writeFileSync(out404, html);
console.log("✅ Wrote", out404);
