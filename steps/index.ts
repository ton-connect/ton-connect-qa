import { expect } from '@playwright/test'
import { Given, When, Then } from './fixtures'
import { TonConnectWidget } from '../qa/TonConnectWidget'

Given('I am open app {string}', async ({ page }, appUrl: string) => {
  await page.goto(appUrl)
})

When('I click on connect wallet {string}', async ({ page, wallet }, name: string) => {
  const connectButton = page.getByRole('button', { name: 'Connect wallet to send the transaction' })
  await new TonConnectWidget(page, connectButton).connectWallet(name)
  await wallet.connect()
})

When('I click on connect button', async ({ page }) => {
  const connectButton = page.getByRole('button', { name: 'Connect wallet to send the transaction' })
  await new TonConnectWidget(page, connectButton).connect()
})

When('I select wallet {string}', async ({ page }, name: string) => {
  const connectButton = page.getByRole('button', { name: 'Connect wallet to send the transaction' })
  await new TonConnectWidget(page, connectButton).clickButton(name)
})

When('I select option {string}', async ({ page }, name: string) => {
  const connectButton = page.getByRole('button', { name: 'Connect wallet to send the transaction' })
  await new TonConnectWidget(page, connectButton).clickButton(name)
})

Then('I see widget with title {string}', async ({ page }, text: string) => {
  const connectButton = page.getByRole('button', { name: 'Connect wallet to send the transaction' })
  const widget = new TonConnectWidget(page, connectButton)
  await expect(widget.title).toContainText([text])
})

Then('I see account {string}', async ({ page }, text: string) => {
  const accountSelector = page.locator('div[data-tc-text]')
  await expect(accountSelector).toHaveText(text)
})

Then('I see widget with second title {string}', async ({ page }, text: string) => {
  const connectButton = page.getByRole('button', { name: 'Connect wallet to send the transaction' })
  const widget = new TonConnectWidget(page, connectButton)
  await expect(widget.titleSecond).toContainText([text])
})

Then('I see in title {string}', async ({ page }, text: string) => {
  await expect(page).toHaveTitle(new RegExp(text))
})
