import * as data from './data'
import * as execute from './execute'

export default {
  play: { data: data.play, execute: execute.play.execute },
  pause: { data: data.pause, execute: execute.pause.execute },
  clear: { data: data.clear, execute: execute.clear.execute },
  next: { data: data.next, execute: execute.next.execute },
  help: { data: data.help, execute: execute.help.execute },
}
