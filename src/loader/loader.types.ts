import { Readable } from 'stream'

export interface Loader {
  load: (link: string) => Readable | undefined
}
