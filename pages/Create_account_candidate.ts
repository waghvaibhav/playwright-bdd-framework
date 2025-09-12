import { Locator, Page } from 'playwright';
import { config } from '../config/config';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';


export class Create_account_candidate extends BasePage {
  private honorifictitle = '//div//p[contains(text(),"Select")]';
  private honorifictitleselect(expectedMessage: string): Locator { return this.page.locator(`//ul//li[contains(text(),"${expectedMessage}")]`); }
  private fullnamefield = '//input[@name="candidate_name"]';
  private expectedDate(date: string): Locator { return this.page.locator(`//input[@name='DOB' and @value="${date}"]`); }
  private enteremailfield = '//input[@name="email"]';



  // Calendar related locators & methods
  readonly dobInput: Locator;
  readonly popperRoot: Locator;
  readonly headerLabel: Locator;
  readonly switchToYearBtn: Locator;
  readonly prevBtn: Locator;
  readonly nextBtn: Locator;


  private readonly MONTHS = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];


  constructor(page: Page) {
    super(page);
    // Your input
    this.dobInput = this.page.locator('//label[contains(normalize-space(.),"Date of Birth")]/ancestor::div[contains(@class,"MuiStack-root")][1]    //div[contains(@class,"MuiFormControl-root")][1]//button[@aria-label="Choose date"]');

    // Calendar popper & common parts
    this.popperRoot = this.page.locator('.MuiPickersPopper-root').first();
    this.headerLabel = this.popperRoot.locator('.MuiPickersCalendarHeader-label');
    this.switchToYearBtn = this.popperRoot.getByRole('button', { name: /switch to year view/i });

    // Arrow buttons
    this.prevBtn = this.popperRoot.getByRole('button', { name: /previous month/i });
    this.nextBtn = this.popperRoot.getByRole('button', { name: /next month/i });
  }
  private monthIndex(name: string) {
    return this.MONTHS.indexOf(name.toLowerCase());
  }
  private parseHeader(headerText: string) {
    // e.g. "September 2007"
    const [monthName, yearStr] = headerText.trim().split(/\s+/);
    return {
      monthIdx: this.monthIndex(monthName),
      year: parseInt(yearStr, 10),
    };
  }

  private monthsBetween(aYear: number, aMonthIdx: number, bYear: number, bMonthIdx: number) {
    return (bYear - aYear) * 12 + (bMonthIdx - aMonthIdx);
  }

  private async clickYear(year: string) {
    // MUI Year view renders buttons (role=radio or button) with the year text
    const yearBtn =
      this.popperRoot.locator('.MuiYearCalendar-root button', { hasText: year }).first()
        .or(this.popperRoot.getByRole('radio', { name: year }))
        .or(this.popperRoot.getByRole('button', { name: year }));
    await yearBtn.scrollIntoViewIfNeeded();
    await yearBtn.click();
  }

  private async goToMonth(targetMonthIdx: number, targetYear: number) {
    // Read current header, then navigate using prev/next
    const text = (await this.headerLabel.textContent()) ?? '';
    const { monthIdx: curIdx, year: curYear } = this.parseHeader(text);
    let diff = this.monthsBetween(curYear, curIdx, targetYear, targetMonthIdx);

    while (diff !== 0) {
      if (diff > 0) {
        await this.nextBtn.click();
        diff--;
      } else {
        await this.prevBtn.click();
        diff++;
      }
      await expect(this.headerLabel).toBeVisible(); // small sync
    }
  }

  private pad2(n: number) {
    return n.toString().padStart(2, '0');
  }

  async openLoginPage() {
    await this.page.goto(`${config.baseURL}`);
  }

  async fullname(honorifictitle: string, fullname: string) {
    const locator = this.honorifictitleselect(honorifictitle);
    await this.page.click(this.honorifictitle);
    await expect(locator).toBeVisible();
    await expect(locator).toHaveText(honorifictitle);
    await locator.click();
    await this.page.fill(this.fullnamefield, fullname);
  }


  async selectDOBViaCalendar(day: string, monthName: string, year: string, timeout = 30000) {
    // 1) Open the calendar
    await this.dobInput.click();
    await expect(this.popperRoot).toBeVisible();

    // 2) Go to year view and choose the year
    await this.switchToYearBtn.click();
    await this.clickYear(year);

    // 3) Ensure correct month (use arrows; at most 11 clicks)
    const targetMonthIdx = this.monthIndex(monthName);
    if (targetMonthIdx < 0) {
      throw new Error(`Unknown month: ${monthName}`);
    }
    // After picking year, the day view stays on whichever month is currently shown.
    // Navigate to the desired month in that chosen year.
    await this.goToMonth(targetMonthIdx, parseInt(year, 10));

    // 4) Click the day (non-disabled day button inside day grid)
    const dayBtn = this.popperRoot.locator(
      'button.MuiPickersDay-root:not(.Mui-disabled)',
      { hasText: new RegExp(`^${day}$`) }
    ).first();
    await dayBtn.click();

  }

  async verifyDOB(date: string, timeout = 30000) {

    const locator = this.expectedDate(date);
    await expect(locator).toBeVisible();
    await expect(locator).toHaveValue(date);
  }

  async verifyemail(email: string) {

    const emailfield = this.enteremailfield;
    await expect(this.page.locator(emailfield)).toBeVisible();
    await this.page.fill(emailfield, email);
  }

  async clickverifyemailbutton() {
    const verifyemailbutton = '//button[contains(text(),"Verify Email")]';
    await expect(this.page.locator(verifyemailbutton)).toBeVisible();
    await this.page.click(verifyemailbutton);
  }

  async enterOTP(otp: string) {
    const otpfield = '//input[@name="emailOtp"]';
    await expect(this.page.locator(otpfield)).toBeVisible();
    await this.page.fill(otpfield, otp);
  }

  async clickverifyOTPbutton() {
    const verifyOTPbutton = '//button[contains(text(),"Verify OTP")]';
    await expect(this.page.locator(verifyOTPbutton)).toBeVisible();
    await this.page.click(verifyOTPbutton);
  }

  async assertSuccessMessage(expectedMessage: string): Promise<void> {
    const locator = this.page.locator(`//p[contains(text(),"${expectedMessage}")]`);
    await expect(locator).toBeVisible();
    await expect(locator).toHaveText(expectedMessage);
  }









}