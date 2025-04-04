import { test as base, createBdd } from 'playwright-bdd'
import {
  type WalletFixture,
  launchPersistentContext,
  tonkeeperExtension,
  Tonkeeper,
  getExtensionId,
} from '../qa'

export const test = base.extend<WalletFixture>({
  context: async ({ $tags, context: _ }, use) => {
    let tonkeeperPath = ''
    if ($tags.includes('@tonkeeper')) {
      tonkeeperPath = await tonkeeperExtension()
    }
    const context = await launchPersistentContext(tonkeeperPath)
    await use(context)
    await context.close()
  },
  wallet: async ({ $tags, context }, use) => {
    let tonkeeper = new Tonkeeper(context, '')
    if ($tags.includes('@tonkeeper')) {
      tonkeeper = new Tonkeeper(context, await getExtensionId(context))
      const mnemonic = process.env.WALLET_MNEMONIC!
      await tonkeeper.importWallet(mnemonic)
    }
    await use(tonkeeper)
    await context.close()
  },
})

export const { Given, When, Then } = createBdd(test)
