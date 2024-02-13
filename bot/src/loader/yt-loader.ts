import { stream } from 'play-dl'
import { Loader } from './loader.types'

export class YTLoader implements Loader {
  async load(link: string) {
    try {
      const s = await stream(link, { 
        discordPlayerCompatibility: true,
        quality: 0
      })
      return s.stream
    }
    catch (err) {
      console.error(err)
    }
  }
}
