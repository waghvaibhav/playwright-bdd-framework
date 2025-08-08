import { Locator, Page } from 'playwright';
import { config } from '../config/config';
import { BasePage } from '../pages/BasePage';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
  private usernameField = '#username';
  private passwordField = '#password';
  private loginButton = '#submit';
  private getErrorMessageElement(expectedMessage: string): Locator { return this.page.locator(`//div[contains(text(),"${expectedMessage}")]`) ;}
  private welcomeMessage (expectedMessage: string): Locator { return this.page.locator(`//h1[contains(text(),"${expectedMessage}")]`);}
  

  constructor(page: Page) {
    super(page);
  }

  async openLoginPage() {
    await this.page.goto(`${config.baseURL}`);
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }

  async assertErrorMessage(expectedMessage: string): Promise<void> {
    const locator = this.getErrorMessageElement(expectedMessage);
    await expect(locator).toBeVisible();
    await expect(locator).toHaveText(expectedMessage);
  }

  async assertWelcomeMessage(expectedMessage: string): Promise<void> {
    const locator = this.welcomeMessage(expectedMessage);
    await expect(locator).toBeVisible();
    await expect(locator).toHaveText(expectedMessage);
  }

  async assertUrl(expectedURL: string): Promise<void> {
    const currentUrl = this.page.url();
    if (!currentUrl.includes(expectedURL)) {
      throw new Error(`Expected to be on the dashboard, but was on ${currentUrl}`);
    }
  }
}


// import { Page } from 'playwright';
// import { config } from '../config/config';
// import { BasePage } from './BasePage';

// export class LoginPage extends BasePage {
//   private usernameField = '#username';
//   private passwordField = '#password';
//   private loginButton = '#submit';
//   private dashboardSelector = '#dashboard';

//   constructor(page: Page) {
//     super(page);
//   }

//   async openLoginPage() {
//     await this.page.goto(`${config.baseURL}/`);
//   }

//   async login(username: string, password: string) {
//     await this.page.fill(this.usernameField, username);
//     await this.page.fill(this.passwordField, password);
//     await this.page.click(this.loginButton);
//   }

//   async isDashboardVisible(): Promise<boolean> {
//     await this.page.waitForSelector(this.dashboardSelector);
//     return this.page.isVisible(this.dashboardSelector);
//   }
// }
