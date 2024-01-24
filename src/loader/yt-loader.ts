import ytdl from 'ytdl-core'
import { Loader } from './loader.types'

export class YTLoader implements Loader {
  load(link: string) {
    try {
      return ytdl(link, { filter: 'audioonly' })
    }
    catch (err) {
      console.error(err)
    }
  }
}
