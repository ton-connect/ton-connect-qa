import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

Given('I am open app {string}', async ({ page }, appUrl: string) => {
  await page.goto(appUrl);
});

When('I click on connect button', async ({ page }) => {
  await page.locator('#ton-connect-button > div > tc-root > button > div').click();
});

Then('I see widget with title {string}', async ({ page }, text: string) => {
  await expect(page.locator('#tc-widget-root h1')).toContainText([text]);
});

Then('I see in title {string}', async ({ page }, text: string) => {
  await expect(page).toHaveTitle(new RegExp(text));
});
