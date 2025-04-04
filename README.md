# TON-Connect QA

This guide provides a quick setup process for Playwright to automate tests for TON Dapps, note that this is a basic configuration

## Prerequisites

- Node.js v18+
- Playwright and TypeScript knowledge

## Installation

1. Install Playwright and its dependencies:

```bash
npm init playwright@latest
```

Follow the prompts to complete the installation


2. Install dev dependency:

```bash
npm install --save-dev @tonconnect/qa
```

## Setup

1. Create or update your Playwright configuration file (e.g., `playwright.config.ts`):

```typescript
import 'dotenv/config'
import { defineConfig, devices } from '@playwright/test'

// Define Playwright configuration
export default defineConfig({
 testDir: './test',
 fullyParallel: true,
 forbidOnly: !!process.env.CI,
 retries: process.env.CI ? 2 : 0,
 workers: process.env.CI ? 1 : undefined,
 reporter: 'html',
 use: {
   // Set base URL for tests
   baseURL: 'http://localhost:3000',
   trace: 'on-first-retry',
 },
 projects: [
   {
     name: 'chromium',
     use: { ...devices['Desktop Chrome'] },
   },
 ],
})
```

2. Create a test file (e.g., `tests/example.spec.ts`):

```typescript
// Import necessary modules and setup
import { TonConnectWidget, testWith, tonkeeperFixture } from '@tonconnect/qa'

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
```

## Running Tests

To run your Playwright tests with Tonkeeper:

1. Start your local development server (if testing against a local app).

2. Run the tests:

```bash
npx playwright test --config playwright-test.config.ts
```

This will execute your tests using Playwright with Tonkeeper integration


## BDD
### QA

Write scenarios in folder [features](features) see [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/) and [Cucumber Anti-Patterns](https://www.thinkcode.se/blog/2016/06/22/cucumber-antipatterns)

### SE

Describe step in folder [steps](steps)

## Develop

```shell
pnpm install
pnpm lint
pnpm format
pnpm playwright install
pnpm test # simple bdd test from features/*.feature
# for test with tonkeeper setup WALLET_MNEMONIC=".." in file .env
pnpm tonkeeper
```

## Techstack

- [Gherkin](https://cucumber.io/docs/gherkin/) — language used for describe acceptance scenarios 
  - [Cucumber Anti-Patterns](https://www.thinkcode.se/blog/2016/06/22/cucumber-antipatterns)
- [Node.js](https://nodejs.org/) — main platform for automation implementation
- [Playwright](https://playwright.dev/) + [BDD](https://vitalets.github.io/playwright-bdd/) — framework browser automation used for implementation steps uses in scenarios

## TODO research

- https://www.browserstack.com/
  - https://vitalets.github.io/playwright-bdd/#/guides/usage-with-browserstack
- https://saucelabs.com/
  - https://vitalets.github.io/playwright-bdd/#/guides/usage-with-saucelabs
- https://nx.dev/
  - https://vitalets.github.io/playwright-bdd/#/guides/usage-with-nx
- IDE integration
  - Intellij IDE / Aqua https://vitalets.github.io/playwright-bdd/#/guides/ide-integration?id=intellij-ide-aqua
  - VS Code https://vitalets.github.io/playwright-bdd/#/guides/ide-integration?id=vs-code
