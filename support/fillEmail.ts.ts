// support/fillEmail.ts
import { expect, Page, Frame, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

export function generateEmail(provider = 'gmail.com', allowPlus = true) {
  const first = faker.person.firstName().toLowerCase().replace(/[^a-z0-9]/g, '');
  const last  = faker.person.lastName().toLowerCase().replace(/[^a-z0-9]/g, '');
  const tag   = faker.string.alphanumeric({ length: 6 }).toLowerCase();
  const stamp = Date.now().toString(36);
  const local = `${first}.${last}`;
  const alias = allowPlus ? `${local}+${stamp}${tag}` : `${local}${stamp}${tag}`;
  return `${alias}@${provider}`;
}

export async function smartFillEmail(page: Page, email: string) {
  // Try on main page first with several robust locators
  const candidates: Locator[] = [
    page.getByLabel(/^\s*e-?mail\s*$/i),
    page.getByLabel(/email/i),
    page.getByPlaceholder(/email/i),
    page.getByRole('textbox', { name: /email/i }),
    page.locator('input[type="email"]'),
    page.locator('input[name*="email" i]'),
    page.locator('input[id*="email" i]'),
  ];

  const filled = await tryFillFromLocators(candidates, email);
  if (filled) return;

  // If not found on main page, scan iframes
  for (const frame of page.frames()) {
    const ok = await tryFillInFrame(frame, email);
    if (ok) return;
  }

  throw new Error('Email input not found or could not be filled on page or in iframes.');
}

async function tryFillInFrame(frame: Frame, email: string) {
  const locators: Locator[] = [
    frame.getByLabel(/^\s*e-?mail\s*$/i),
    frame.getByLabel(/email/i),
    frame.getByPlaceholder(/email/i),
    frame.getByRole('textbox', { name: /email/i }),
    frame.locator('input[type="email"]'),
    frame.locator('input[name*="email" i]'),
    frame.locator('input[id*="email" i]'),
  ];
  return tryFillFromLocators(locators, email);
}

async function tryFillFromLocators(locs: Locator[], value: string) {
  for (const loc of locs) {
    const count = await loc.count();
    if (!count) continue;

    // prefer a single, visible, enabled element
    const target = loc.filter({ hasNot: loc.page().locator('[aria-hidden="true"]') }).first();

    try {
      await target.scrollIntoViewIfNeeded();
      await expect(target).toBeVisible({ timeout: 3000 });
      await expect(target).toBeEditable({ timeout: 3000 }).catch(() => {}); // some inputs lack 'editable' state

      // Strategy A: normal fill
      await target.click({ force: true });
      await target.fill('');
      await target.fill(value);
      await target.blur();

      if ((await safeValue(target)) === value) return true;

      // Strategy B: type (fires key events some frameworks need)
      // Use pressSequentially if available; otherwise fallback to keyboard.type
      if ((target as any).pressSequentially) {
        await target.fill('');
        await (target as any).pressSequentially(value, { delay: 10 });
      } else {
        await target.fill('');
        await target.click();
        await target.page().keyboard.type(value, { delay: 5 });
      }
      await target.blur();
      if ((await safeValue(target)) === value) return true;

      // Strategy C: force set + input/change events (for stubborn controlled inputs)
      await target.evaluate((el, v) => {
        const input = el as HTMLInputElement;
        const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
        if (set) set.call(input, v as string);
        else input.value = v as string;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }, value);
      await target.blur();
      if ((await safeValue(target)) === value) return true;
    } catch {
      // try next locator
    }
  }
  return false;
}

async function safeValue(loc: Locator) {
  try { return await loc.inputValue(); } catch { return ''; }
}
