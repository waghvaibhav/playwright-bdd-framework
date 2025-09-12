import { Given, When, Then } from '@cucumber/cucumber';
import { Browser, Page } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { Create_account_candidate } from '../pages/Create_account_candidate';
import { CustomWorld } from '../support/custom-world';


let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let create_account_candidate: Create_account_candidate;

Given('I am on the candidate create account page', async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.openLoginPage();
});

When('I select {string} and enter candidate fullname {string}', async function (this: CustomWorld, honorifictitle: string, fullname: string) {
  create_account_candidate = new Create_account_candidate(this.page);
  await create_account_candidate.fullname(honorifictitle, fullname);
});

When('I select DOB {string} {string} {string} via calender', { timeout: 30000 },
  async function (day: string, month: string, year: string) {
    await create_account_candidate.selectDOBViaCalendar(day, month, year);
  });

Then('the DOB field should contain {string}', { timeout: 30000 },
  async function (date: string, timeout = 30000) {
    await create_account_candidate.verifyDOB(date);
  });

When('I enter candidate email {string}', async function (this: CustomWorld, email: string) {
  await create_account_candidate.verifyemail(email);
});

When('I click on verify email button', async function (this: CustomWorld) {
  await create_account_candidate.clickverifyemailbutton();
});

When('I enter OTP {string} in email OTP field', async function (this: CustomWorld, otp: string) {
  await create_account_candidate.enterOTP(otp);
});

Then('I click on verify OTP button', async function (this: CustomWorld) {
  await create_account_candidate.clickverifyOTPbutton();
});

Then('I should see the message {string}', async function (this: CustomWorld, expectedMessage: string) {
  await create_account_candidate.assertSuccessMessage(expectedMessage);
});



