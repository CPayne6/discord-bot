import { VoiceState, Client } from 'discord.js'
import { queueManager } from '../queue-manager'
import { config } from '../config'

export function stateChange(this: Client, oldState: VoiceState, newState: VoiceState) {
  const queue = queueManager.get(oldState.guild.id)
  const botId = this.user?.id

  // If queue does not exist or the change does not concern this channel
  if (!queue || !botId || (queue.channelId !== oldState.channelId && queue.channelId !== newState.channelId)) {
    return
  }

  const isOldChannel = oldState.channelId === queue.channelId
  const isNewChannel = newState.channelId === queue.channelId

  // Check if bot is still in voice channel it should be in
  const isDisconnected = (isOldChannel && oldState.channel?.members.find((member) => member.id === botId) === undefined) ||
    (isNewChannel && newState.channel?.members.find((member) => member.id === botId) === undefined)

  if (isDisconnected) {
    queueManager.remove(oldState.guild.id)
    return
  }

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
