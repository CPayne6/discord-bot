import { createReadStream } from 'fs'
import { Loader } from './loader.types'

export class LocalLoader implements Loader {
  async load(path: string) {
    try {
      const s = createReadStream(path)
      return s
    }
    catch (err) {
      console.error(err)
    }
  }
}
