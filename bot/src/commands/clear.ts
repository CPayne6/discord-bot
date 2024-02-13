import { SlashCommandBuilder } from "discord.js";
import { withExtractedQueue } from "../middleware";
import * as utils from '../utils'

const commandName = 'clear'
const description = 'Clears all items from the queue'

export const data = new SlashCommandBuilder().setName(commandName).setDescription(description)

export const execute = withExtractedQueue((interaction, queue) => {
  if (!queue) {
    utils.reply(interaction, 'No queue exists')
    return
  }
  queue.clear()
})