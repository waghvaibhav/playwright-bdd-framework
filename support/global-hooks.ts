// support/global-hooks.ts
import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import fs from 'fs';

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  const isCI = !!process.env.CI;

  // Ensure report folders exist in CI
  fs.mkdirSync('reports/videos', { recursive: true });
  fs.mkdirSync('reports/traces', { recursive: true });
  fs.mkdirSync('allure-results', { recursive: true });
  fs.mkdirSync('reports/screenshots', { recursive: true });

  browser = await chromium.launch({
    headless: isCI ? true : false,
    args: isCI ? ['--no-sandbox', '--disable-dev-shm-usage'] : []
  });

  context = await browser.newContext({
    recordVideo: { dir: 'reports/videos/' },
    viewport: { width: 1280, height: 720 }
  });

  page = await context.newPage();

  (global as any).browser = browser;
  (global as any).context = context;
  (global as any).page = page;
});

AfterAll(async function () {
  await context?.close();
  await browser?.close();
});
