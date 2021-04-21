import dotenv from 'dotenv'

export function loadConfig() {
  dotenv.config()
  return {
    apiKey: process.env.API_KEY ?? notFoundConfig('API_KEY'),
  }
}

function notFoundConfig(configName: string): never {
  throw new Error(`必要なコンフィグがありません: ${configName}`)
}
