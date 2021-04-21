import { MessageAttachment } from 'discord.js'

const baseURI = 'https://discord.com/channels/590565947581005864/'

export function isDiscordMessageUrlMessage(message: string) {
  return message.startsWith(baseURI)
}

export function extractDiscordMessageUrl(url: string) {
  const splittedUrl = url.replace(baseURI, '').split('/')
  if (isNaN(parseInt(splittedUrl[0], 10)) || isNaN(parseInt(splittedUrl[1], 10))) {
    throw new Error('不正なURLが渡されました')
  }
  return {
    channelId: splittedUrl[0],
    messageId: splittedUrl[1],
  }
}

export function isAttachmentMediaFile(attachment: MessageAttachment) {
  const attachmentUrl = attachment.url
  return attachmentUrl.match(/.*\.(png|jpg|jpeg|bmp|gif|webp)$/gim)
}
