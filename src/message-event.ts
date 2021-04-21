import { Message, Client, TextChannel } from 'discord.js'
import { extractDiscordMessageUrl, isAttachmentMediaFile, isDiscordMessageUrlMessage } from './utils'

export async function onReciveMessage(client: Client, message: Message) {
  if (message.author.id === client.user?.id) {
    return
  }
  if (!isDiscordMessageUrlMessage(message.content)) {
    return
  }
  const parsedMessage = extractDiscordMessageUrl(message.content)
  const channel = client.channels.cache.get(parsedMessage.channelId) as TextChannel
  const fetchedMessageCollection = await channel.messages.fetch({ around: parsedMessage.messageId, limit: 1 })
  const firstMessage = fetchedMessageCollection.first()
  if (!firstMessage) {
    return
  }
  const attachments = [...firstMessage.attachments.values()]
  const firstAttachement = attachments[0]
  if (!firstAttachement) {
    return
  }
  if (isAttachmentMediaFile(firstAttachement)) {
    message.lineReplyNoMention({
      embed: {
        author: {
          name: message.author.username,
          iconURL: message.author.avatarURL() ?? undefined,
        },
        title: message.content,
        url: message.content,
        color: 7506394,
        timestamp: message.createdTimestamp,
        footer: {
          iconURL: client.user?.avatarURL() ?? undefined,
          text: 'この投稿は次の時間に行われました',
        },
        image: {
          url: firstAttachement.url,
        },
      },
    })
  } else {
    message.lineReplyNoMention(firstAttachement.url)
  }
}
