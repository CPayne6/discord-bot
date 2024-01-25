import {
  AudioPlayer,
  createAudioPlayer,
  NoSubscriberBehavior,
  AudioPlayerStatus,
  createAudioResource,
  VoiceConnection,
  joinVoiceChannel,
  VoiceConnectionStatus
} from '@discordjs/voice'
import { Loader } from './loader'
import { VoiceBasedChannel } from 'discord.js'
import { config } from './config'


export function connect(channel: VoiceBasedChannel) {
  return joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator
  })
}

export class Queue {
  queue: string[]
  player: AudioPlayer
  loader: Loader
  connection: VoiceConnection
  channelId: string
  emptyChannelTimeout?: NodeJS.Timeout
  idleTimeout?: NodeJS.Timeout

  constructor(
    loader: Loader,
    channel: VoiceBasedChannel,
    onIdle: () => void,
    idleDuration = config.IDLE_DURATION
  ) {
    this.queue = []
    this.player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Stop
      }
    })
    this.connection = connect(channel)
    this.loader = loader
    this.connection.subscribe(this.player)
    this.channelId = channel.id

    // Set listeners to destroy Queue
    this.connection.on('stateChange', (_, newState) => {
      if (newState.status === VoiceConnectionStatus.Destroyed) { onIdle() }
    })
    this.player.on('stateChange', (_, newState) => {
      if(newState.status === AudioPlayerStatus.Paused || newState.status === AudioPlayerStatus.Idle){
        this.idleTimeout = setTimeout(() => { onIdle() }, idleDuration)
      }
      else if(newState.status === AudioPlayerStatus.Playing){
        clearTimeout(this.idleTimeout)
      }
    })
  }

  async play(link: string) {
    const stream = await this.loader.load(link)
    if (!stream) {
      this.next()
      return false
    }

    stream.on('end', () => {
      this.next()
    })

    stream.on('error', (err) => {
      console.error(err)
      this.next()
    })

    try {
      const audio = createAudioResource(stream)
      this.player.play(audio)
      return true
    }
    catch (err) {
      return false
    }
  }

  unpause() {
    if (this.player.state.status === AudioPlayerStatus.Paused) {
      this.player.unpause()
    }
  }

  pause() {
    if (this.player.state.status === AudioPlayerStatus.Playing) {
      this.player.pause()
    }
  }

  next() {
    this.player.stop()
    const link = this.queue.shift()
    if (!link) {
      return false
    }
    this.play(link)
    return true
  }

  add(item: string) {
    this.queue.push(item)
  }

  clear() {
    this.player.stop()
    this.queue = []
  }

  isEmpty() {
    return this.queue.length === 0
  }

  isIdle() {
    return this.player.state.status === AudioPlayerStatus.Idle
  }

  isPaused() {
    return this.player.state.status === AudioPlayerStatus.Paused
  }

  destroy() {
    this.player.stop()
    this.connection.disconnect()
    this.queue = []
  }
}
