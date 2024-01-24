import dotenv from 'dotenv'
dotenv.config()

export const config = {
  TOKEN: process.env.TOKEN,
  VERSION: '1.0',
  PUBLIC_KEY: process.env.PUBLIC_KEY,
  APPLICATION_ID: process.env.APPLICATION_ID,
  IDLE_DURATION: 300000
  // More here
}