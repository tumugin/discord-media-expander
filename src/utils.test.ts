import { extractDiscordMessageUrl, isAttachmentMediaFile, isDiscordMessageUrlMessage } from './utils'
jest.mock('discord.js')
import { MessageAttachment } from 'discord.js'

describe('isDiscordMessageUrlMessage', () => {
  const baseURI = 'https://discord.com/channels/1234567/'
  test.each([
    [`${baseURI}12345/12345`, true],
    [`${baseURI}12345/`, false],
    [`${baseURI}`, false],
    [`${baseURI}aaaaaa12345/12345`, false],
  ])('正しくURLを判定出来る: %s', (testUrl, result) => {
    expect(isDiscordMessageUrlMessage(baseURI, testUrl)).toBe(result)
  })
})

describe('extractDiscordMessageUrl', () => {
  const baseURI = 'https://discord.com/channels/1234567/'
  test.each([[`${baseURI}12345/12345`, { channelId: '12345', messageId: '12345' }]])(
    '正しくURLを展開できる: %s',
    (testUrl, testObject) => {
      expect(extractDiscordMessageUrl(baseURI, testUrl)).toStrictEqual(testObject)
    }
  )
})

describe('isAttachmentMediaFile', () => {
  test.each([
    ['https://example.com/test.png', true],
    ['https://example.com/test.jpg', true],
    ['https://example.com/test.jpeg', true],
    ['https://example.com/test.bmp', true],
    ['https://example.com/test.gif', true],
    ['https://example.com/test.webp', true],
    ['https://example.com/test.exe', false],
  ])('正しくURLを判定出来る: %s', (testUrl, result) => {
    const MessageAttachmentMock = MessageAttachment as jest.Mock
    MessageAttachmentMock.mockImplementationOnce(() => {
      return {
        url: testUrl,
      }
    })
    const attachment = new MessageAttachmentMock()
    expect(isAttachmentMediaFile(attachment)).toBe(result)
  })
})
