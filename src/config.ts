import dotenv from 'dotenv'

export interface Config {
  apiKey: string
  discordBaseUrl: string
}

export function loadConfig(): Config {
  dotenv.config()
  return {
    apiKey: process.env.API_KEY ?? notFoundConfig('API_KEY'),
    discordBaseUrl: process.env.BASE_URL ?? notFoundConfig('BASE_URL'),
  }
}

function notFoundConfig(configName: string): never {
  throw new Error(`必要なコンフィグがありません: ${configName}`)
}
