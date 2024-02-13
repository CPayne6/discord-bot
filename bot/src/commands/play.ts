import { APIInteractionGuildMember, GuildMember, SlashCommandBuilder, VoiceBasedChannel } from "discord.js";
import { withExtractedQueue } from "../middleware";
import { Queue } from "../queue";
import { YTLoader } from "../loader";
import { queueManager } from "../queue-manager";
import * as utils from '../utils'

function isGuildMember(member: GuildMember | APIInteractionGuildMember | null): member is GuildMember {
  return (member as GuildMember | null)?.id !== undefined
}

function createQueue(channel: VoiceBasedChannel) {
  return new Queue(new YTLoader(), channel, () => { queueManager.remove(channel.guildId) })
}

const commandName = 'play'
const description = 'Clears all items from the queue'

const stringOptionName = 'link'
const stringOptionDescription = 'The YouTube or SoundCloud link to play'

export const data = new SlashCommandBuilder()
  .setName(commandName)
  .setDescription(description)
  .addStringOption(
    option => option.setName(stringOptionName).setDescription(stringOptionDescription)
  )

export const execute = withExtractedQueue((
  interaction,
  queue
) => {
  let link: string | undefined
  if ('options' in interaction) {
    const extractedLink = interaction.options.get(stringOptionName)?.value
    if (typeof extractedLink === 'string') {
      link = extractedLink
    }
  }

  const member = interaction.member
  if (!isGuildMember(member)) {
    return
  }

  const voiceChannel = member.voice.channel
  if (!voiceChannel) {
    utils.reply(interaction, 'Must be in a voice channel')
    return
  }

  if (!queue) {
    if (!link) {
      utils.reply(interaction, 'Please send a link to play')
      return
    }
    queue = createQueue(voiceChannel)
    queueManager.add(queue, member.guild.id)
  }

  if (link) {
    queue.add(link)
  }

  if (queue.isIdle()) {
    queue.next()
  }
  else if (queue.isPaused()) {
    queue.unpause()
  }
})

