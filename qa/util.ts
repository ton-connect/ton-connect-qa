import type { BrowserContext } from '@playwright/test'

export async function getExtensionId(context: BrowserContext) {
  let [background] = context.serviceWorkers()
  if (!background) {
    background = await context.waitForEvent('serviceworker')
  }
  const extensionId = background.url().split('/')[2]
  if (!extensionId) {
    throw new Error('Can not getting extensionId')
  }
  return extensionId
}
