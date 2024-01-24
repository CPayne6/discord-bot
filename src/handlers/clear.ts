import { TextBasedChannel } from "discord.js";
import { Queue } from '../queue'

export function clear(channel: TextBasedChannel, queue?: Queue){
  if(!queue){
    channel.send('No queue exists')
    return
  }
  queue.clear()
}