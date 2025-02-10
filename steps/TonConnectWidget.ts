import { type Locator, type Page } from '@playwright/test'

export class TonConnectWidget {
  readonly page: Page
  readonly title: Locator
  readonly titleSecond: Locator
  readonly connectButton: Locator
  readonly walletButton1: Locator
  readonly walletButton2: Locator
  readonly walletButton3: Locator
  readonly walletButton4: Locator
  readonly mainOptionButton: Locator
  readonly firstOptionButton: Locator
  readonly secondOptionButton: Locator

  constructor(page: Page) {
    this.page = page
    this.title = page.locator('#tc-widget-root h1')
    this.titleSecond = page.locator('#tc-widget-root h2')
    this.connectButton = page.locator('#ton-connect-button > div > tc-root > button > div')
    this.walletButton1 = page.locator(
      '#tc-widget-root > tc-root > div > div > div > div > ul > li:nth-child(1) > button',
    )
    this.walletButton2 = page.locator(
      '#tc-widget-root > tc-root > div > div > div > div > ul > li:nth-child(2) > button',
    )
    this.walletButton3 = page.locator(
      '#tc-widget-root > tc-root > div > div > div > div > ul > li:nth-child(3) > button',
    )
    this.walletButton4 = page.locator(
      '#tc-widget-root > tc-root > div > div > div > div > ul > button',
    )
    this.mainOptionButton = page.locator(
      '#tc-widget-root > tc-root > div > div > div.go1392445990.go3872688706 > div > div.go787781655 > button',
    )
    this.firstOptionButton = page.locator(
      '#tc-widget-root > tc-root > div > div > div.go1392445990.go3872688706 > div > div.go387286889.go1542592061 > button:nth-child(1)',
    )
    this.secondOptionButton = page.locator(
      '#tc-widget-root > tc-root > div > div > div.go1392445990.go3872688706 > div > div.go387286889.go1542592061 > button:nth-child(2)',
    )
  }

  async selectWallet(name: string) {
    // TODO use name and check
    this.walletButton2.click()
  }

  async selectOption(name: string) {
    // TODO use name and check
    this.firstOptionButton.click()
  }
}
