import { Client } from 'discord.js'
import { loadConfig } from './config'
import { onReciveMessage } from './message-event'

// discord.jsをモンキーパッチする(闇)
require('discord-reply')

const config = loadConfig()

const client = new Client()
client.login(config.apiKey)
client.on('message', async (message) => onReciveMessage(client, message))
