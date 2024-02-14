import { withExtractedQueue } from "../../middleware";
import * as utils from '../../utils'

export const execute = withExtractedQueue((interaction, queue) => {
  if (!queue || !queue.player) {
    utils.reply(interaction, 'No audio playing')
    return
  }
  queue.next()
  utils.reply(interaction, "Skipping to next item")
})