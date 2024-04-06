const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { defaultColor } = require('../config.json')

module.exports = {
    data:
        new SlashCommandBuilder()
        .setName('ping')
        .setDescription(`Replies with the Bot's Ping!`)
    ,

    run: ({ interaction, client }) => {
       let embed = new EmbedBuilder()
           .setTitle(`Ping Pong!`)
           .setDescription(`My ping is **${client.ws.ping}** ms.`)
           .setFooter({
               iconURL: interaction.user.avatarURL(),
               text: `Requested by ${interaction.user.username}.`
           })
           .setColor(defaultColor)

        interaction.reply({ embeds: [ embed ]})
    },

    options: {
        devOnly: false
    }
}