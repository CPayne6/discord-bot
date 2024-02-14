import { SlashCommandBuilder } from 'discord.js'

const commandName = 'clear'
const description = 'Clears all items from the queue'

export const data = new SlashCommandBuilder().setName(commandName).setDescription(description)
