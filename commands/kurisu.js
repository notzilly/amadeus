const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kurisu')
        .setDescription('tina!'),
    async execute(interaction) {

        const kurisuEmbed = {
            title: '~TINA MO KINSHII!',
            image: {
                url: 'http://i.imgur.com/vtNaFDQ.gif',
            }
        }

        await interaction.reply({ embeds: [kurisuEmbed] })
    },
};
