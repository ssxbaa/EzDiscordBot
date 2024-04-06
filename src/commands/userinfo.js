// This command is only available to Staff Members.

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { defaultColor, staffRoleID } = require('../config.json')
const moment = require('moment');

module.exports = {
    data:
        new SlashCommandBuilder()
            .setName('userinfo')
            .setDescription('Displays a User\'s information.')
            .addUserOption((option) =>
                option
                    .setName("user")
                    .setDescription("The User that you want to check on.")
            )
    ,

    run: async ({ interaction, guild, client }) => {
        let user = interaction.options.getUser('user') || interaction.user;
        let member = interaction.guild.members.cache.get(user.id);
        let rolesList = member ? member.roles.cache.map(role => role.name).join(', ') : "Not in the Server";
        let joinedServerAt = member ? moment(user.joinedAt).format('MMMM Do YYYY') : "Not in the Server";

        let embed = new EmbedBuilder()
            .setTitle(`${user.username}'s Informations`)
            .setColor(defaultColor)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: `Global Name`, value: user.globalName || "Undefined", inline: true },
                { name: `ID`, value: user.id, inline: true },
                { name: `Joined Discord at`, value: moment(user.createdAt).format('MMMM Do YYYY'), inline: true },
                { name: `Joined Server at`, value: joinedServerAt, inline: true },
                { name: `Is a Bot`, value: user.bot ? "Yes" : "No", inline: true },
                { name: `Roles`, value: rolesList }
            )
            .setFooter({
                iconURL: interaction.user.avatarURL(),
                text: `Requested by ${interaction.user.username}.`
            })

        if (interaction.member.roles.cache.has(staffRoleID)) {
            interaction.reply({ embeds: [ embed ] })
        } else {
            interaction.reply({ content: `You need the role <@&${staffRoleID}> to perform this operation.`, ephemeral: true })
        }
    },

    options: {
        devOnly: false
    }
}