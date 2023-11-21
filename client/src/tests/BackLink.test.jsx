/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axios } from 'axios';

describe('true is truthy and false is falsy', () => {
  it('true is truthy', () => {
    expect(true).toBe(true);
  });

  it('false is falsy', () => {
    expect(false).toBe(false);
  });
});

describe('test connection', () => {
  test('test connection between frontend and backend', async () => {
    const response = await axios.get('/api/data');
    expect(response.status).toEqual(200);
  });
});
