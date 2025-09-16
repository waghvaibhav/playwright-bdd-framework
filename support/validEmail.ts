// support/validEmail.ts
import { faker } from '@faker-js/faker';

/**
 * Generate a validator-friendly, unique email.
 * - local part: starts with a letter, only [a-z0-9.] (no '+', no underscores)
 * - length-safe (local <= 30)
 * - unique via base36 timestamp + 4-char suffix
 * - domain defaults to TEST_EMAIL_DOMAIN or 'gmail.com'
 *
 * If your env forbids public domains, set: TEST_EMAIL_DOMAIN=yourcorp.test
 */
export function generateValidEmail(domain?: string): string {
  const chosenDomain =
    (domain && domain.includes('.')) ? domain.toLowerCase()
    : (process.env.TEST_EMAIL_DOMAIN || 'gmail.com').toLowerCase();

  // Build a short, safe local part
  // Use faker names but sanitize heavily
  const first = safeChunk(faker.person.firstName());
  const last  = safeChunk(faker.person.lastName());

  const stamp = Date.now().toString(36).slice(-6);               // compact time
  const rnd   = faker.string.alphanumeric({ length: 4 }).toLowerCase();

  // Start with a letter prefix to satisfy strict validators
  let local = `${first}.${last}.${stamp}${rnd}`;                 // e.g. john.smith.k4n3f0ab
  local = sanitizeLocal(local);

  // Enforce length & edges
  if (local.length > 30) local = local.slice(0, 30);
  local = trimDots(local);
  if (!/^[a-z]/.test(local)) local = `qa${local}`;               // ensure starts with letter
  if (local.length < 5) local = `qa${stamp}${rnd}`.slice(0, 10);

  const email = `${local}@${chosenDomain}`;

  // Final lightweight validation (very conservative)
  if (!/^[a-z][a-z0-9.]{3,29}@[a-z0-9.-]+\.[a-z]{2,24}$/.test(email)) {
    // regenerate once if something odd slips through
    return generateValidEmail(chosenDomain);
  }
  return email;
}

function safeChunk(s: string) {
  return (s || 'qa').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8) || 'qa';
}

function sanitizeLocal(s: string) {
  // allow only letters, digits, and single dots
  let out = s.toLowerCase().replace(/[^a-z0-9.]/g, '');
  out = out.replace(/\.+/g, '.'); // collapse consecutive dots
  return out;
}

function trimDots(s: string) {
  return s.replace(/^\.+/, '').replace(/\.+$/, '');
}
