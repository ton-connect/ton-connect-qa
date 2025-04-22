import { WalletExtension } from '../WalletExtension'

/**
 * Tonkeeper class for interacting with the Tonkeeper extension in Playwright tests
 *
 * This class provides methods to perform various operations on the Tonkeeper extension,
 * such as importing wallets, switching networks, confirming transactions, and more.
 *
 * @class
 * @extends WalletExtension
 */
export class Tonkeeper extends WalletExtension {
  get onboardingPage() {
    return 'chrome-extension://' + this.extensionId + '/index.html'
  }

  async importWallet(seedPhrase: string): Promise<void> {
    const pages = this.context.pages()
    let extension = pages[pages.length - 1] // return last tab
    if (!extension) {
      extension = await this.context.newPage()
    }
    await extension.goto(this.onboardingPage)
    const getStartedButton = extension.locator('#root button')
    await getStartedButton.click()
    const modalDialogSelector = '#react-portal-modal-container .dialog-content'
    const modalTitleSelector = `${modalDialogSelector} h2`
    const modalButtonSelector = `${modalDialogSelector} button`
    const modalFormInputSelector = (n: number) => `${modalDialogSelector} input[tabindex="${n}"]`
    await extension.waitForSelector(modalTitleSelector, { state: 'visible' })
    const testnetAccountButton = extension.locator(
      '#react-portal-modal-container button:nth-child(4)',
    )
    const [recoveryPhrasePage] = await Promise.all([
      this.context.waitForEvent('page'),
      testnetAccountButton.click(),
    ])
    // TODO maybe can use open app `chrome-extension://${extensionId}/index.html?add_wallet=testnet`
    await recoveryPhrasePage.waitForSelector(modalTitleSelector, { state: 'visible' })
    const seedPhraseWords = seedPhrase.split(' ')
    for (const [n, word] of seedPhraseWords.entries()) {
      const input = recoveryPhrasePage.locator(modalFormInputSelector(n + 1))
      await input.fill(word)
    }
    await recoveryPhrasePage.locator(modalButtonSelector).click()
    await recoveryPhrasePage.waitForSelector(modalTitleSelector, { state: 'visible' })
    // TODO add wallet select it need if wallet not init
    await recoveryPhrasePage.locator(modalButtonSelector).click()
    await recoveryPhrasePage.locator('#create-password').fill(this.password)
    await recoveryPhrasePage.locator('#create-password-confirm').fill(this.password)
    await recoveryPhrasePage.getByRole('button', { name: 'Continue' }).click()
    await recoveryPhrasePage.getByRole('button', { name: 'Save' }).click()
  }

  async connect(confirm?: boolean): Promise<void> {
    const acceptPage = await this.context.waitForEvent('page')
    await acceptPage.getByRole('button', { name: 'Connect wallet' }).click()
    await acceptPage.locator('#unlock-password').fill(this.password)
    if (confirm !== false) {
      await acceptPage.getByRole('button', { name: 'Confirm' }).click()
    } else {
      await acceptPage.getByRole('button', { name: 'Cancel' }).click()
    }
  }

  async accept(confirm?: boolean): Promise<void> {
    const acceptPage = await this.context.waitForEvent('page')
    await acceptPage.getByRole('button', { name: 'Confirm' }).click()
    await acceptPage.locator('#unlock-password').fill(this.password)
    if (confirm !== false) {
      await acceptPage.getByRole('button', { name: 'Confirm' }).click()
    } else {
      await acceptPage.getByRole('button', { name: 'Cancel' }).click()
    }
  }
}
