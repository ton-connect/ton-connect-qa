import { type BrowserContext, chromium, type Fixtures, type TestType } from '@playwright/test'
import { mergeTests, test as base } from '@playwright/test'
import { WalletExtension } from './WalletExtension'

export function launchPersistentContext(extensionPath: string, slowMo = 0) {
  const browserArgs = [
    `--disable-extensions-except=${extensionPath}`,
    `--load-extension=${extensionPath}`,
  ]
  if (process.env.HEADLESS) {
    browserArgs.push('--headless=new')

    if (slowMo > 0) {
      console.warn('[WARNING] Slow motion makes no sense in headless mode. It will be ignored!')
    }
  }
  return chromium.launchPersistentContext('', {
    headless: extensionPath === '',
    args: browserArgs,
    slowMo: process.env.HEADLESS ? 0 : slowMo,
  })
}

export function testWith<CustomFixtures extends Fixtures>(
  customFixtures: TestType<CustomFixtures, object>,
): TestType<CustomFixtures, object> {
  return mergeTests(base, customFixtures)
}

export type WalletFixture = {
  context: BrowserContext
  wallet: WalletExtension
}
