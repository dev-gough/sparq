/**
 * Lighthouse CI config for sparqsys lab baselines.
 *
 * Usage (from repo root, after `npm run build`):
 *   npx --yes @lhci/cli@0.14.0 autorun --config=scripts/perf/lighthouserc.js
 *
 * Or start server yourself:
 *   npm run start &
 *   npx --yes @lhci/cli@0.14.0 collect --config=scripts/perf/lighthouserc.js
 *   npx --yes @lhci/cli@0.14.0 assert  --config=scripts/perf/lighthouserc.js
 *
 * Fixed URL list (must stay stable for before/after comparisons).
 * Budgets are informational during the sweep; harden as CI gates post Phase B.
 */
// Prefer Playwright-bundled Chromium when system Chrome is absent (common on headless dev boxes).
const defaultChrome =
  process.env.CHROME_PATH ||
  process.env.LHCI_CHROME_PATH ||
  `${process.env.HOME}/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`

module.exports = {
  ci: {
    collect: {
      // startServerCommand runs from repo root when using autorun
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Ready|started server|Local:',
      startServerReadyTimeout: 120000,
      url: [
        'http://127.0.0.1:8080/',
        'http://127.0.0.1:8080/products/quad2',
        'http://127.0.0.1:8080/investors',
        'http://127.0.0.1:8080/resources/legal',
        'http://127.0.0.1:8080/resources/calculator',
      ],
      numberOfRuns: 5,
      chromePath: defaultChrome,
      // Required on many Linux hosts (AppArmor / no userns sandbox)
      chromeFlags: '--no-sandbox --disable-dev-shm-usage --headless=new',
      settings: {
        // Desktop lab profile; keep fixed across before/after runs
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttling: {
          rttMs: 40,
          throughputKbps: 10 * 1024,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        // Skip PWA/SEO noise for performance-focused sprint
        onlyCategories: ['performance'],
      },
    },
    assert: {
      // Soft during optimization sprint — track trends; tighten after Phase B
      assertions: {
        'categories:performance': ['warn', { minScore: 0.85 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
}
