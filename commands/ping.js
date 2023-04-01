const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pongs you back!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
