import { Client, GatewayIntentBits, GuildMember } from 'discord.js'
import { config } from './config'
import { queueManager } from './queue-manager'
import * as handlers from './handlers'

function isGuildMember(m: any): m is GuildMember {
  return m instanceof GuildMember
}

const bot = new Client({
  intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildVoiceStates]
});

bot.on('ready', () => {
  console.info(`bot is online, version: ${config.VERSION}`)
})

bot.on('error', (err) => {
  console.error(err)
})

bot.on('voiceStateUpdate', handlers.idle)

bot.on('messageCreate', (message) => {
  const channel = message.channel
  if (!channel) return
  const content = message.content.trim()
  if (content[0] !== '?') return
  const [command, link] = content.substring(1).split(' ')

  const member = message.member
  if (!isGuildMember(member)) {
    channel.send('Must be a server member')
    return
  }

  if (!member.voice.channel) {
    channel.send('Must be in a voice channel')
    return
  }

  if (!message.guildId) {
    channel.send('Must be in a server')
    return
  }

  let queue = queueManager.get(member.guild.id)
  switch (command) {
    case 'play':
      handlers.play(channel, member, queue, link)
      break
    case 'pause':
      handlers.pause(channel, queue)
      break;
    case 'skip':
      handlers.next(channel, queue)
      break;
    case 'clear':
      handlers.clear(channel, queue)
  }
})

bot.login(config.TOKEN)