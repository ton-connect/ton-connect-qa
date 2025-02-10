import { expect } from '@playwright/test'
import { Given, When, Then } from './fixtures'
import { TonConnectWidget } from './TonConnectWidget'

Given('I am open app {string}', async ({ page }, appUrl: string) => {
  await page.goto(appUrl)
})

When('I click on connect button', async ({ page }) => {
  const widget = new TonConnectWidget(page)
  await widget.connectButton.click()
})

When('I select wallet {string}', async ({ page }, name: string) => {
  await new TonConnectWidget(page).selectWallet(name)
})

When('I select option {string}', async ({ page }, name: string) => {
  await new TonConnectWidget(page).selectOption(name)
})

Then('I see widget with title {string}', async ({ page }, text: string) => {
  const widget = new TonConnectWidget(page)
  await expect(widget.title).toContainText([text])
})

Then('I see widget with second title {string}', async ({ page }, text: string) => {
  const widget = new TonConnectWidget(page)
  await expect(widget.titleSecond).toContainText([text])
})

Then('I see in title {string}', async ({ page }, text: string) => {
  await expect(page).toHaveTitle(new RegExp(text))
})
