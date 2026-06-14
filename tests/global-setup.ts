import type { FullConfig } from '@playwright/test';

/**
 * Records which build of the application is under test into the Playwright report
 * metadata (rendered in the HTML report header) and prints it to the run log.
 *
 * Sources, in order of authority:
 *  - API version: queried live from GET /openapi.json -> info.version.
 *  - Build identifiers the test process cannot self-discover (git SHA, image digest,
 *    CI build id) are passed in via environment variables, set by the orchestrator
 *    (CI workflow or local Makefile). They are recorded as "unknown" when absent.
 */
async function globalSetup(config: FullConfig): Promise<void> {
  const api = process.env.API_BASE_URL ?? 'http://localhost:8000';

  let apiVersion = 'unknown';
  try {
    const res = await fetch(`${api}/openapi.json`);
    if (res.ok) {
      const spec = (await res.json()) as { info?: { version?: string; title?: string } };
      apiVersion = spec.info?.version ?? 'unknown';
    }
  } catch {
    // App not reachable at setup time; leave apiVersion as 'unknown'.
  }

  const build = {
    appApiVersion: apiVersion,
    appGitSha: process.env.APP_GIT_SHA ?? 'unknown',
    appBackendImage: process.env.APP_BACKEND_IMAGE ?? 'unknown',
    appFrontendImage: process.env.APP_FRONTEND_IMAGE ?? 'unknown',
    ciBuildId: process.env.GITHUB_RUN_ID ?? process.env.BUILD_ID ?? 'local',
    testedAt: new Date().toISOString(),
  };

  // Surface in the HTML report header (FullConfig.metadata is mutable here).
  Object.assign(config.metadata, build);

  // Also surface in the run log so it is visible without opening the report.
  console.log('Build under test:', JSON.stringify(build));
}

export default globalSetup;
