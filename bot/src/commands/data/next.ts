import { SlashCommandBuilder } from "discord.js"

const commandName = 'next'
const description = 'Moves to the next song in the queue'

export const data = new SlashCommandBuilder().setName(commandName).setDescription(description)
