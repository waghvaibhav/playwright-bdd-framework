// import { Given, When, Then } from '@cucumber/cucumber';
// import { RegistrationPage } from '../pages/RegistrationPage';
// import { CustomWorld } from '../support/custom-world';

// let registrationPage: RegistrationPage;

// Given('I am on the registration page', async function (this: CustomWorld) {
//   registrationPage = new RegistrationPage(this.page);
//   await registrationPage.open();
// });

// When(
//   'I register with name {string}, email {string}, password {string}, confirm password {string}',
//   async function (this: CustomWorld, name: string, email: string, password: string, confirmPassword: string) {
//     await registrationPage.fillForm(name, email, password, confirmPassword);
//     await registrationPage.submitForm();
//   }
// );

// Then('I should see the message {string}', async function (this: CustomWorld, expectedMessage: string) {
//   const success = await registrationPage.getSuccessMessage();
//   const error = await registrationPage.getErrorMessage();

//   if (success && success.trim() !== expectedMessage.trim()) {
//     throw new Error(`Expected success message "${expectedMessage}" but got "${success}"`);
//   } else if (error && error.trim() !== expectedMessage.trim()) {
//     throw new Error(`Expected error message "${expectedMessage}" but got "${error}"`);
//   } else if (!success && !error) {
//     throw new Error('No success or error message displayed');
//   }
// });


import { Given, When, Then } from '@cucumber/cucumber';
import { RegistrationPage } from '../pages/RegistrationPage';
import { CustomWorld } from '../support/custom-world';

let registrationPage: RegistrationPage;

Given('I am on the registration page', async function (this: CustomWorld) {
  registrationPage = new RegistrationPage(this.page);
  await registrationPage.open();
});

When(
  'I register with name {string}, email {string}, password {string}, confirm password {string}',
  async function (this: CustomWorld, name: string, email: string, password: string, confirmPassword: string) {
    await registrationPage.fillForm(name, email, password, confirmPassword);
    await registrationPage.submitForm();
  }
);

Then('I should see the message {string}', async function (this: CustomWorld, expectedMessage: string) {
  const success = await registrationPage.getSuccessMessage();
  const error = await registrationPage.getErrorMessage();

  if (success && success.trim() !== expectedMessage.trim()) {
    throw new Error(`Expected success message "${expectedMessage}" but got "${success}"`);
  } else if (error && error.trim() !== expectedMessage.trim()) {
    throw new Error(`Expected error message "${expectedMessage}" but got "${error}"`);
  } else if (!success && !error) {
    throw new Error('No success or error message displayed');
  }
});
