import { Queue } from "./queue";

class QueueManager {
  queues: Record<string, Queue>

  constructor() {
    this.queues = {}
  }

  get(id: string | null) {
    if (!id) return undefined
    return this.queues[id]
  }

  add(queue: Queue, id: string) {
    this.queues[id] = queue
  }

  remove(id: string) {
    this.queues[id]?.destroy()
    delete this.queues[id]
  }

  /**
   * Disconnect all queues from voice calls and empty the queues
   */
  destroy() {
    Object.entries(this.queues).forEach(([key, queue]) => {
      queue.destroy()
    })
    this.queues = {}
  }
}

export const queueManager = new QueueManager()
