import { test } from '@playwright/test'
import { type WalletFixture, launchPersistentContext } from '../test'
import { getExtensionId } from '../util'
import { tonkeeperExtension } from './tonkeeperExtension'
import { Tonkeeper } from './Tonkeeper'

export const tonkeeperFixture = (mnemonic?: string, slowMo = 0) => {
  return test.extend<WalletFixture>({
    context: async ({ context: _ }, use) => {
      const tonkeeperPath = await tonkeeperExtension()
      const context = await launchPersistentContext(tonkeeperPath, slowMo)
      await use(context)
      await context.close()
    },
    wallet: async ({ context }, use) => {
      const tonkeeper = new Tonkeeper(context, await getExtensionId(context))
      if (mnemonic) {
        await tonkeeper.importWallet(mnemonic)
      }
      await use(tonkeeper)
      await context.close()
    },
  })
}
