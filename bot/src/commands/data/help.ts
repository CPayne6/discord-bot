import { SlashCommandBuilder } from 'discord.js'

const commandName = 'help'
const description = 'Displays information about key commands'

export const data = new SlashCommandBuilder().setName(commandName).setDescription(description)
