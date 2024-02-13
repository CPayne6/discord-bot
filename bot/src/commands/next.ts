import { SlashCommandBuilder } from "discord.js";
import { withExtractedQueue } from "../middleware";
import * as utils from '../utils'

const commandName = 'next'
const description = 'Moves to the next song in the queue'

export const data = new SlashCommandBuilder().setName(commandName).setDescription(description)

export const execute = withExtractedQueue((interaction, queue) => {
  if (!queue || !queue.player) {
    utils.reply(interaction, 'No audio playing')
    return
  }
  queue.next()
})