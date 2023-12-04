import { test, expect } from '@playwright/test';

test('Navigate through pages', async ({ page }) => {
  // visitor goes to the home page (/)
  await page.goto('http://localhost:5173/')
  // visitor visits presses edit button
  await page.getByRole('button').nth(1).click()
  const url = page.url()
  // assert wether the routing works
  expect(url).toBe('http://localhost:5173/edit')
})
