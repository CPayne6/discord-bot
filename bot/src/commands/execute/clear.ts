import { withExtractedQueue } from "../../middleware";
import * as utils from '../../utils'

export const execute = withExtractedQueue((interaction, queue) => {
  if (!queue) {
    utils.reply(interaction, 'No queue exists')
    return
  }
  queue.clear()
  utils.reply(interaction, "Clearing the queue")
})