import { withExtractedQueue } from "../../middleware";
import * as utils from '../../utils'

export const execute = withExtractedQueue((interaction) => {
  utils.reply(interaction,
    (`List of commands:
- "/play <link>" add youtube video or soundcloud song to queue and play
- "/play" resume song
- "/pause" pause the queue
- "/next" go to next song in queue
- "/clear" clear the queue`)
  )
})