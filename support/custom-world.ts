import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  data: Record<string, any> = {};

  constructor(options: IWorldOptions) {
    super(options);
    this.browser = (global as any).browser;
    this.context = (global as any).context;
    this.page = (global as any).page;
  }
}

setWorldConstructor(CustomWorld);
