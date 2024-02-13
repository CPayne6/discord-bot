import { Client, Channel, Interaction } from "discord.js";
import { queueManager } from '../queue-manager'
import * as utils from '../utils'
import { Queue } from "../queue";

type Handler = (interaction: Interaction, queue: Queue | undefined, channel: Channel) => void

export function withExtractedQueue(handler: Handler) {
  return function (interaction: Interaction) {
    const guildId = interaction.guildId
    if (!guildId) {
      utils.reply(interaction, 'Unable to process command, must be in server')
      return
    }

    const channel = interaction.channel
    if (!channel) {
      utils.reply(interaction, 'Unable to process command, must be in channel')
      return
    }
    const queue = queueManager.get(guildId)

    return handler(interaction, queue, channel)
  }
}
