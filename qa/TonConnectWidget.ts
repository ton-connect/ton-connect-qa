import { type Locator, type Page } from '@playwright/test'

export class TonConnectWidget {
  readonly page: Page
  readonly title: Locator
  readonly titleSecond: Locator
  readonly connectButton: Locator

  constructor(page: Page, connectButton: Locator) {
    this.page = page
    this.title = page.locator('#tc-widget-root h1')
    this.titleSecond = page.locator('#tc-widget-root h2')
    this.connectButton = connectButton
  }

  clickButton(name: string) {
    return this.page.getByRole('button', { name }).click()
  }

  async connectWallet(name: string) {
    await this.connect()
    await this.clickButton(name)
    await this.clickButton('Browser Extension')
  }

  connect() {
    return this.connectButton.click()
  }
}
