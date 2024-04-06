const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { defaultColor } = require('../config.json')

module.exports = {
    data:
        new SlashCommandBuilder()
            .setName('commandName')
            .setDescription(`commandDescription`)
    ,

    run: ({ interaction, client }) => {
        interaction.reply("interactionReply")
    },

    options: {
        devOnly: false
    }
}