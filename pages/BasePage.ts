// import { Page } from 'playwright';

// export class BasePage {
//   constructor(protected page: Page) {}

//   async waitForSelector(locator: string, timeout: number = 5000) {
//     await this.page.waitForSelector(locator, { timeout });
//   }

//   async click(selector: string) {
//     await this.page.click(selector);
//   }

//   async type(selector: string, text: string) {
//     await this.page.fill(selector, text);
//   }

//   async navigateTo(path: string) {
//     await this.page.goto(path);
//   }

//   async getText(selector: string): Promise<string> {
//     return (await this.page.textContent(selector)) ?? '';
//   }

//   async isVisible(selector: string): Promise<boolean> {
//     return this.page.isVisible(selector);
//   }

//   async close() {
//     await this.page.close();
//   }

//   async assertElementVisible(selector: string): Promise<void> {
//     const isVisible = await this.page.isVisible(selector);
//     if (!isVisible) {
//       throw new Error(`Element with selector "${selector}" is not visible`);
//     }
//   }

//   async assertElementText(selector: string, expectedText: string): Promise<void> {
//     const text = await this.getText(selector);
//     if (text !== expectedText) {
//       throw new Error(`Expected text "${expectedText}" but found "${text}" in element with selector "${selector}"`);
//     }
//   }

//   async assertUrl(expectedUrl: string): Promise<void> {
//     const currentUrl = this.page.url();
//     if (currentUrl !== expectedUrl) {
//       throw new Error(`Expected URL "${expectedUrl}" but found "${currentUrl}"`);
//     }
//   }

//   async assertElementCount(selector: string, expectedCount: number): Promise<void> {
//     const count = await this.page.locator(selector).count();
//     if (count !== expectedCount) {
//       throw new Error(`Expected ${expectedCount} elements with selector "${selector}" but found ${count}`);
//     }
//   }

//   async assertElementContainsText(selector: string, expectedText: string): Promise<void> {
//     const text = await this.getText(selector);
//     if (!text.includes(expectedText)) {
//       throw new Error(`Expected element with selector "${selector}" to contain text "${expectedText}" but found "${text}"`);
//     }
//   }

//   async assertElementAttribute(selector: string, attribute: string, expectedValue: string): Promise<void> {
//     const value = await this.page.getAttribute(selector, attribute);
//     if (value !== expectedValue) {
//       throw new Error(`Expected attribute "${attribute}" of element with selector "${selector}" to be "${expectedValue}" but found "${value}"`);
//     }
//   }

//   async assertElementNotVisible(selector: string): Promise<void> {
//     const isVisible = await this.page.isVisible(selector);
//     if (isVisible) {
//       throw new Error(`Element with selector "${selector}" is visible but it should not be`);
//     }
//   }

//   async assertElementNotPresent(selector: string): Promise<void> {
//     const isPresent = await this.page.$(selector) !== null;
//     if (isPresent) {
//       throw new Error(`Element with selector "${selector}" is present but it should not be`);
//     }
//   }

//   async assertElementEnabled(selector: string): Promise<void> {
//     const isEnabled = await this.page.isEnabled(selector);
//     if (!isEnabled) {
//       throw new Error(`Element with selector "${selector}" is not enabled`);
//     }
//   }

//   async assertElementDisabled(selector: string): Promise<void> {
//     const isDisabled = await this.page.isDisabled(selector);
//     if (isDisabled) {
//       throw new Error(`Element with selector "${selector}" is enabled but it should be disabled`);
//     }
//   }

//   async assertElementValue(selector: string, expectedValue: string): Promise<void> {
//     const value = await this.page.inputValue(selector);
//     if (value !== expectedValue) {
//       throw new Error(`Expected value "${expectedValue}" but found "${value}" in element with selector "${selector}"`);
//     }
//   }

//   async assertElementContainsAttribute(selector: string, attribute: string, expectedValue: string): Promise<void> {
//     const value = await this.page.getAttribute(selector, attribute);
//     if (!value || !value.includes(expectedValue)) {
//       throw new Error(`Expected attribute "${attribute}" of element with selector "${selector}" to contain "${expectedValue}" but found "${value}"`);
//     }
//   }

//   async assertElementNotContainsText(selector: string, unexpectedText: string): Promise<void> {
//     const text = await this.getText(selector);
//     if (text.includes(unexpectedText)) {
//       throw new Error(`Expected element with selector "${selector}" not to contain text "${unexpectedText}" but found "${text}"`);
//     }
//   }

//   async assertElementHasClass(selector: string, className: string): Promise<void> {
//     const hasClass = await this.page.locator(selector).evaluate((el, cls) => el.classList.contains(cls), className);
//     if (!hasClass) {
//       throw new Error(`Element with selector "${selector}" does not have class "${className}"`);
//     }
//   }

//   async assertElementNotHasClass(selector: string, className: string): Promise<void> {
//     const hasClass = await this.page.locator(selector).evaluate((el, cls) => el.classList.contains(cls), className);
//     if (hasClass) {
//       throw new Error(`Element with selector "${selector}" has class "${className}" but it should not`);
//     }
//   }

//   async assertElementPosition(selector: string, expectedX: number, expectedY: number): Promise<void> {
//     const box = await this.page.locator(selector).boundingBox();
//     if (!box || box.x !== expectedX || box.y !== expectedY) {
//       throw new Error(`Expected element with selector "${selector}" to be at position (${expectedX}, ${expectedY}) but found at (${box?.x}, ${box?.y})`);
//     }
//   }

//   async assertElementSize(selector: string, expectedWidth: number, expectedHeight: number): Promise<void> {
//     const box = await this.page.locator(selector).boundingBox();
//     if (!box || box.width !== expectedWidth || box.height !== expectedHeight) {
//       throw new Error(`Expected element with selector "${selector}" to have size (${expectedWidth}, ${expectedHeight}) but found (${box?.width}, ${box?.height})`);
//     }
//   }

//   async assertElementContainsClass(selector: string, className: string): Promise<void> {
//     const hasClass = await this.page.locator(selector).evaluate((el, cls) => el.classList.contains(cls), className);
//     if (!hasClass) {
//       throw new Error(`Element with selector "${selector}" does not contain class "${className}"`);
//     }
//   }

//   async assertElementNotContainsClass(selector: string, className: string): Promise<void> {
//     const hasClass = await this.page.locator(selector).evaluate((el, cls) => el.classList.contains(cls), className);
//     if (hasClass) {
//       throw new Error(`Element with selector "${selector}" contains class "${className}" but it should not`);
//     }
//   }

//   async assertElementHasAttribute(selector: string, attribute: string): Promise<void> {
//     const value = await this.page.getAttribute(selector, attribute);
//     if (value === null) {
//       throw new Error(`Element with selector "${selector}" does not have attribute "${attribute}"`);
//     }
//   }

//   async assertElementNotHasAttribute(selector: string, attribute: string): Promise<void> {
//     const value = await this.page.getAttribute(selector, attribute);
//     if (value !== null) {
//       throw new Error(`Element with selector "${selector}" has attribute "${attribute}" but it should not`);
//     }
//   }

// }

import { Page } from 'playwright';

export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async type(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string> {
    return (await this.page.textContent(selector)) || '';
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.isVisible(selector);
  }
}



