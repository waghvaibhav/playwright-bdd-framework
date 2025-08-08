import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { config } from '../config/config';

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  console.log('Running on ENV:', process.env.ENV || 'qa', '| BaseURL:', config.baseURL);
  browser = await chromium.launch({ headless: false });
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
  await context.close();
  await browser.close();
});
