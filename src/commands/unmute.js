// This command is only available to Staff Members.

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { defaultColor, staffRoleID, modLogsChannelID } = require('../config.json')
const ms = require('ms');

module.exports = {
    data:
        new SlashCommandBuilder()
            .setName('unmute')
            .setDescription('Unmutes a guild in the User.')
            .addUserOption((option) =>
                option
                    .setName("user")
                    .setDescription("The User that you want to unmute.")
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName("reason")
                    .setDescription("The reason for the unmute.")
                    .setRequired(false)
            )
    ,

    run: async ({ interaction, guild, client }) => {
        let user = interaction.options.getMember('user');
        let reason = interaction.options.getString("reason") || "Unspecified";
        let logsChannel = client.channels.cache.get(modLogsChannelID)

        if (!interaction.member.roles.cache.has(staffRoleID)) {
            return interaction.reply({ content: `You need the role <@&${staffRoleID}> to perform this operation.`, ephemeral: true });
        }

        if (user.roles.highest.position >= interaction.member.roles.highest.position) {
            return interaction.reply({ content: `You can't unmute someone with higher or same position as you.`, ephemeral: true });
        }

        if (!user) {
            interaction.reply({ content: `User is not a member of the guild.`, ephemeral: true });
        }

        if (!user.moderatable) {
            return interaction.reply({ content: `I can't unmute this user. He might be above me in the role hierarchy.`, ephemeral: true });
        }

        if (user.id === interaction.user.id) {
            return interaction.reply({ content: `You can't unmute yourself.`, ephemeral: true });
        }

        try {
            let embed = new EmbedBuilder()
                .setTitle(`User Unmuted!`)
                .setColor(defaultColor)
                .setThumbnail(user.user.displayAvatarURL())
                .addFields(
                    { name: `User Affected`, value: `${user.user}`, inline: true },
                    { name: `Staff Member`, value: `${interaction.user}`, inline: true },
                    { name: `Reason`, value: `${reason}` }
                )
                .setFooter({
                    iconURL: interaction.user.avatarURL(),
                    text: `Requested by ${interaction.user.username}.`
                });
            user.timeout(null).then(
                interaction.reply({ embeds: [ embed ] }),
                logsChannel.send({ embeds: [ embed ] })
            )
        } catch(err) {
            interaction.reply({ content: `An Error Occurred. Error:\n${err}`, ephemeral: true });
        }
    },

    options: {
        devOnly: false
    }
}