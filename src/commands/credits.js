const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { defaultColor } = require('../config.json')

module.exports = {
    data:
        new SlashCommandBuilder()
            .setName('credits')
            .setDescription(`Replies with the Bot's Credits!`)
    ,

    run: ({ interaction, client }) => {
        let embed = new EmbedBuilder()
            .setTitle(`My Credits!`)
            .addFields(
                { name: `My Dev`, value: `> <@1213198625610408046>`, inline: true },
                { name: `His GitHub`, value: `> [**My Dev's GitHub**](https://github.com/ssxbaa)`, inline: true },
                { name: `My Repository`, value: `> [**My Repository**](https://github.com/ssxbaa/EzDiscordBot)`, inline: true }
            )
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