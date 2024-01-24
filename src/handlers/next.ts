import { TextBasedChannel } from "discord.js";
import { Queue } from "../queue";

export function next(channel: TextBasedChannel, queue?: Queue){
  if (!queue || !queue.player) {
    channel.send('No audio playing')
    return
  }
  queue.next()
}
