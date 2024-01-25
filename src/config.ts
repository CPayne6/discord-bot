import dotenv from 'dotenv'
import fs from 'fs'
import play from 'play-dl'

if (process.env.NODE_ENV === 'development') {
  dotenv.config()
}
else {
  // load the secrets from the folder created by docker
  const secretsDirName = '/run/secrets'
  const secretNames = fs.readdirSync(secretsDirName)
  for(const name of secretNames) {
    process.env[name.toUpperCase()] = fs.readFileSync(`${secretsDirName}/${name}`).toString()
  }
}

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