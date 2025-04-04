declare global {
  namespace NodeJS {
    interface ProcessEnv {
      WALLET_MNEMONIC: string
    }
  }
}

export {}
