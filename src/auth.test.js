import { test } from 'node:test';
import assert from 'node:assert/strict';
import { login } from './auth.js';

test('login succeeds with valid credentials', () => {
  const result = login('admin@example.com', 'password123');

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.status, 200);
    assert.equal(typeof result.token, 'string');
    assert.ok(result.token.length > 0);
  }
});

test('login rejects invalid email format', () => {
  const result = login('not-an-email', 'password123');

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.status, 400);
  }
});

test('login rejects wrong password', () => {
  const result = login('admin@example.com', 'wrong-password');

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.status, 401);
  }
});

test('login rejects unknown email', () => {
  const result = login('unknown@example.com', 'password123');

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.status, 401);
  }
});

test('login rejects empty password', () => {
  const result = login('admin@example.com', '');

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.status, 400);
  }
});
