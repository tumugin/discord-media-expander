import { MessageAttachment } from 'discord.js'

export function isDiscordMessageUrlMessage(baseUrl: string, message: string) {
  return message.startsWith(baseUrl) && validateUrl(baseUrl, message)
}

export function extractDiscordMessageUrl(baseUrl: string, url: string) {
  const splittedUrl = splitUrl(baseUrl, url)
  if (!validateUrl(baseUrl, url)) {
    throw new Error('不正なURLが渡されました')
  }
  return {
    channelId: splittedUrl[0],
    messageId: splittedUrl[1],
  }
}

function validateUrl(baseUrl: string, url: string) {
  const splittedUrl = splitUrl(baseUrl, url)
  return !(
    isNaN(parseInt(splittedUrl[0], 10)) ||
    !splittedUrl[0] ||
    isNaN(parseInt(splittedUrl[1], 10)) ||
    !splittedUrl[1]
  )
}

function splitUrl(baseUrl: string, url: string) {
  return url.replace(baseUrl, '').split('/')
}

export function isAttachmentMediaFile(attachment: MessageAttachment) {
  const attachmentUrl = attachment.url
  return attachmentUrl.match(/.*\.(png|jpg|jpeg|bmp|gif|webp)$/gim)?.length === 1
}
