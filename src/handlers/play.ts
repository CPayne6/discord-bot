import { GuildMember, TextBasedChannel, VoiceBasedChannel } from 'discord.js'
import { Queue } from '../queue'
import { queueManager } from '../queue-manager'
import { YTLoader } from '../loader'

function createQueue(channel: VoiceBasedChannel) {
  return new Queue(new YTLoader(), channel, () => { queueManager.remove(channel.guildId) })
}

export function play(
  channel: TextBasedChannel,
  member: GuildMember,
  queue?: Queue,
  link?: string) {
  const voiceChannel = member.voice.channel
  if (!voiceChannel) {
    channel.send('Must be in a voice channel')
    return
  }

  if (!queue) {
    if (!link) {
      channel.send('Please send a link to play')
      return
    }
    queue = createQueue(voiceChannel)
    queueManager.add(queue, member.guild.id)
  }

  if (link) {
    queue.add(link)
  }

  if (queue.isIdle()) {
    queue.next()
  }
  else if (queue.isPaused()) {
    queue.unpause()
  }
}

