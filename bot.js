require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  const kurisuEmbed = {
    title: '~TINA MO KINSHII!',
    image: {
        url: 'http://i.imgur.com/vtNaFDQ.gif',
    }
  }

  if (interaction.commandName === 'kurisu') {
    await interaction.reply({ embeds: [kurisuEmbed]})
  }
});

client.login(process.env.TOKEN);