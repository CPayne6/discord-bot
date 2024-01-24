import { TextBasedChannel } from 'discord.js'
import { Queue } from '../queue'

export function pause(channel: TextBasedChannel, queue?: Queue) {
  if (!queue || !queue.player) {
    channel.send('No audio playing')
    return
  }
  queue.pause()
}