import dotenv from 'dotenv'
import play from 'play-dl'

if (process.env.NODE_ENV === 'development')
  dotenv.config()

play.getFreeClientID().then((id: string) => {
  play.setToken({
    soundcloud: {
      client_id: id
    }
  })
})


export const config = {
  TOKEN: process.env.TOKEN,
  VERSION: '1.0',
  PUBLIC_KEY: process.env.PUBLIC_KEY,
  APPLICATION_ID: process.env.APPLICATION_ID,
  IDLE_DURATION: 300000,
  COMMAND_CHAR: '?'
  // More here
}