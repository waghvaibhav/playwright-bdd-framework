import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Given('I am on the login page', async function (this: CustomWorld) {
   loginPage = new LoginPage(this.page);
  await loginPage.openLoginPage();
});

When('I enter username {string} and password {string}', async function (this: CustomWorld, username: string, password: string) {
  await loginPage.login(username, password);
});


Then('I should see an error message {string}', async function (this: CustomWorld, expectedMessage: string) {
  await loginPage.assertErrorMessage(expectedMessage);
});

Then('I should be redirected to the dashboard {string} url', async function (this: CustomWorld, expected_url: string ) {
  await loginPage.assertUrl(expected_url);
});

Then('I should see a welcome message {string}', async function (this: CustomWorld, expectedMessage: string) {
  await loginPage.assertWelcomeMessage(expectedMessage);
});




// import { Given, When, Then } from '@cucumber/cucumber';
// import { LoginPage } from '../pages/LoginPage';
// import { CustomWorld } from '../support/custom-world';

// let loginPage: LoginPage;

// Given('I am on the login page', async function (this: CustomWorld) {
//   loginPage = new LoginPage(this.page);
//   await loginPage.openLoginPage();
// });

// When('I enter username {string} and password {string}', async function (this: CustomWorld, username: string, password: string) {
//   await loginPage.login(username, password);
// });

// Then('I should be redirected to the dashboard {string} url', async function (this: CustomWorld, expectedUrl: string) {
//   await this.page.waitForURL(expectedUrl, { timeout: 5000 });
//   const actualUrl = this.page.url();
//   if (actualUrl !== expectedUrl) {
//     throw new Error(`Expected URL: ${expectedUrl}, but got: ${actualUrl}`);
//   }
// });

