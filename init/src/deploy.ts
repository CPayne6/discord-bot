import { REST, Routes } from "discord.js";
import dotenv from 'dotenv';
import * as commands from './commands'
import * as fs from 'fs'

// Configure secrets
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '../.env' })
}
else {
  // load the secrets from the folder created by docker
  const secretsDirName = '/run/secrets'
  const secretNames = fs.readdirSync(secretsDirName)
  for (const name of secretNames) {
    process.env[name.toUpperCase()] = fs.readFileSync(`${secretsDirName}/${name}`).toString()
  }
}

const token = process.env.TOKEN
if (typeof token !== 'string') {
  console.error('Client token required')
  process.exit(1)
}
const clientId = process.env.APPLICATION_ID
if (typeof clientId !== 'string') {
  console.error('Client token required')
  process.exit(1)
}

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${commandsData.length} application (/) commands.`);

    await rest.put(
      Routes.applicationCommands(clientId),
      {
        body: commandsData,
      }
    );

    console.log(`Successfully reloaded ${commandsData.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})()