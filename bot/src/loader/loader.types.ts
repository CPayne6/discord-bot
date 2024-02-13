import { Readable } from 'stream'

export interface Loader {
  load: (link: string) => Promise<Readable | undefined>
}
