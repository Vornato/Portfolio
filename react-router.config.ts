// react-router.config.ts (root of the repo)
export default {
  // SPA build for GitHub Pages - no server runtime
  ssr: false,

  // DO NOT set "routes" here - setting it would force the CLI
  // to look for app/routes.ts and conflict with file-based routes.
};

