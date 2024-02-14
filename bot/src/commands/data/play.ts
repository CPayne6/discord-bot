import { SlashCommandBuilder } from "discord.js"

const commandName = 'play'
const description = 'Clears all items from the queue'

export const stringOptionName = 'link'
const stringOptionDescription = 'The YouTube or SoundCloud link to play'

export const data = new SlashCommandBuilder()
  .setName(commandName)
  .setDescription(description)
  .addStringOption(
    option => option.setName(stringOptionName).setDescription(stringOptionDescription)
  )