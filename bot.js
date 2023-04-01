require('dotenv').config();
const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

// Load up Amadeus
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Fetch all commands inside `commands` folder
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Login event => Amadeus ON
client.on(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}!`);
});

// All chat interactions go through here
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(`Error executing ${interaction.commandName}`);
		console.error(error);
	}
});

client.login(process.env.TOKEN);