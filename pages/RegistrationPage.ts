// import { Page } from 'playwright';
// import { config } from '../config/config';
// import { BasePage } from './BasePage';
// import { assert } from 'console';

// export class RegistrationPage extends BasePage {
//   private nameField = '#name';
//   private emailField = '#email';
//   private passwordField = '#password';
//   private confirmPasswordField = '#confirmPassword';
//   private submitButton = 'button[type="submit"]';
//   private successMessage = '#successMessage';
//   private errorMessage = '#errorMessage';

//   constructor(page: Page) {
//     super(page);
//   }

//   async open() {
//     await this.page.goto(`${config.baseURL}/register`);
//   }

//   async fillForm(name: string, email: string, password: string, confirmPassword: string) {
//     await this.page.fill(this.nameField, name);
//     await this.page.fill(this.emailField, email);
//     await this.page.fill(this.passwordField, password);
//     await this.page.fill(this.confirmPasswordField, confirmPassword);
//   }

//   async submitForm() {
//     await this.page.click(this.submitButton);
//     await this.page.waitForSelector(this.successMessage, { state: 'visible' });
//   }

//   async getSuccessMessage(): Promise<string> {
//     return this.getText(this.successMessage);
//   }

//   async getErrorMessage(): Promise<string> {
//     return this.getText(this.errorMessage);
//   }
// }


import { Page } from 'playwright';
import { config } from '../config/config';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
  private nameField = '#name';
  private emailField = '#email';
  private passwordField = '#password';
  private confirmPasswordField = '#confirmPassword';
  private submitButton = 'button[type="submit"]';
  private successMessage = '#successMessage';
  private errorMessage = '#errorMessage';

  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.goto(`${config.baseURL}/register`);
  }

  async fillForm(name: string, email: string, password: string, confirmPassword: string) {
    await this.page.fill(this.nameField, name);
    await this.page.fill(this.emailField, email);
    await this.page.fill(this.passwordField, password);
    await this.page.fill(this.confirmPasswordField, confirmPassword);
  }

  async submitForm() {
    await this.page.click(this.submitButton);
  }

  async getSuccessMessage(): Promise<string> {
    return this.getText(this.successMessage);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }
}
