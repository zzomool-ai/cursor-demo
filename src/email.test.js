import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  extractEmails,
  isValidEmail,
  getValidEmails,
  uniqueValidEmails,
  normalizeEmail,
  parseEmail,
} from './email.js';

test('extractEmails returns empty array for non-array input', () => {
  assert.deepEqual(extractEmails(null), []);
  assert.deepEqual(extractEmails('not-an-array'), []);
});

test('extractEmails maps user emails', () => {
  const users = [{ email: 'a@b.com' }, { email: 'c@d.org' }];
  assert.deepEqual(extractEmails(users), ['a@b.com', 'c@d.org']);
});

test('isValidEmail rejects non-string values', () => {
  assert.equal(isValidEmail(null), false);
  assert.equal(isValidEmail(123), false);
});

test('isValidEmail validates email format', () => {
  assert.equal(isValidEmail('user@example.com'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail('missing@domain'), false);
});

test('isValidEmail accepts RFC 5322 addr-spec examples', () => {
  assert.equal(isValidEmail('user+tag@example.com'), true);
  assert.equal(isValidEmail('"quoted.local"@example.com'), true);
  assert.equal(isValidEmail('user@[192.168.0.1]'), true);
});

test('isValidEmail rejects invalid IP domain literals', () => {
  assert.equal(isValidEmail('user@[256.1.2.3]'), false);
  assert.equal(isValidEmail('user@[00.1.2.3]'), false);
});

test('isValidEmail enforces RFC 3696 local-part length', () => {
  assert.equal(isValidEmail('a'.repeat(64) + '@example.com'), true);
  assert.equal(isValidEmail('a'.repeat(65) + '@example.com'), false);
});

test('getValidEmails returns only valid emails', () => {
  const users = [
    { email: 'good@example.com' },
    { email: 'bad-email' },
    { email: 'also@valid.io' },
    { email: null },
  ];

  assert.deepEqual(getValidEmails(users), [
    'good@example.com',
    'also@valid.io',
  ]);
});

test('getValidEmails returns empty array for non-array input', () => {
  assert.deepEqual(getValidEmails(undefined), []);
});

test('uniqueValidEmails removes duplicate valid emails', () => {
  const users = [
    { email: 'a@example.com' },
    { email: 'b@example.com' },
    { email: 'a@example.com' },
    { email: 'bad-email' },
  ];

  assert.deepEqual(uniqueValidEmails(users), [
    'a@example.com',
    'b@example.com',
  ]);
});

test('uniqueValidEmails returns empty array for non-array input', () => {
  assert.deepEqual(uniqueValidEmails(null), []);
});

test('normalizeEmail trims whitespace and lowercases', () => {
  assert.equal(normalizeEmail('  User@Example.COM  '), 'user@example.com');
});

test('normalizeEmail returns null for invalid input', () => {
  assert.equal(normalizeEmail(null), null);
  assert.equal(normalizeEmail('   '), null);
});

test('parseEmail returns normalized valid email', () => {
  assert.equal(parseEmail('  User@Example.COM  '), 'user@example.com');
});

test('parseEmail returns null for invalid or malformed email', () => {
  assert.equal(parseEmail(null), null);
  assert.equal(parseEmail('not-an-email'), null);
  assert.equal(parseEmail('   '), null);
});
