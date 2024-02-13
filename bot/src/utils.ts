import { Interaction } from "discord.js";

export function reply(interaction: Interaction, message: string) {
  if (interaction.isRepliable()) {
    interaction.reply(message)
  }
}
