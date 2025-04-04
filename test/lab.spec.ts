// Import necessary modules and setup
import { TonConnectWidget, testWith, tonkeeperFixture } from '../qa'

// Create a test instance Tonkeeper fixtures
const test = testWith(tonkeeperFixture(process.env.WALLET_MNEMONIC!))

// Extract expect function from test
const { expect } = test

// Define a basic test case
test('lab', async ({ context, wallet }) => {
  // Navigate to the homepage
  const app = await context.newPage()
  await app.goto('https://ton-connect.github.io/demo-dapp-with-react-ui/')

  // Click the connect button
  const connectButton = app.getByRole('button', { name: 'Connect wallet to send the transaction' })

  // Connect Tonkeeper to the dapp
  const tonConnect = new TonConnectWidget(app, connectButton)
  await tonConnect.connectWallet('Tonkeeper')
  await wallet.connect()

  // Verify the connected account address
  const accountSelector = app.locator('div[data-tc-text]')
  await expect(accountSelector).toHaveText('0QAy…WfyR')

  // Sending transactions
  await app.getByRole('button', { name: 'Send transaction' }).click()
  await wallet.accept()
})
