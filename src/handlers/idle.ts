import { VoiceState } from 'discord.js'
import { queueManager } from '../queue-manager'
import { config } from '../config'

export function idle(oldState: VoiceState, newState: VoiceState) {
  const queue = queueManager.get(oldState.guild.id)

  // If queue does not exist or the change does not concern this channel
  if (!queue || !(queue.channelId !== oldState.channelId || queue.channelId !== newState.channelId)) {
    return
  }

  const isOldChannel = oldState.channelId === queue.channelId
  const isNewChannel = newState.channelId === queue.channelId

  // If the event is someone leaving the channel and the bot is the only one left
  if (isOldChannel && oldState.channel?.members.size === 1) {
    queue.emptyChannelTimeout = setTimeout(() => {
      queueManager.remove(newState.guild.id)
    }, config.IDLE_DURATION)
  }
  // If the event is someone entering the channel
  else if (isNewChannel && newState.channel?.members.size && newState.channel.members.size > 0) {
    clearTimeout(queue.emptyChannelTimeout)
  }
}
