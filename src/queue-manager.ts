import { VoiceConnectionStatus } from "@discordjs/voice";
import { Queue } from "./queue";

class QueueManager {
  queues: Record<string, Queue>

  constructor(){
    this.queues = {}
  }

  get(id: string | null){
    if(!id) return undefined
    return this.queues[id]
  }

  add(queue: Queue, id: string) {
    this.queues[id] = queue
  }

  remove(id: string){
    this.queues[id]?.destroy()
    delete this.queues[id]
  }
}

export const queueManager = new QueueManager()
