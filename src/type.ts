declare module 'discord.js' {
  interface Message {
    lineReplyNoMention(param: string | { embed: Partial<MessageEmbed> }): void
  }
}
