import { initializeApp } from 'firebase-admin';
import { beforeAll } from 'vitest';

beforeAll(() => {
  console.log('initializing app');
  initializeApp();
});
