// This command is only available to Admins.

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { defaultColor, modLogsChannelID, adminRoleID } = require('../config.json')

module.exports = {
    data:
        new SlashCommandBuilder()
            .setName('ban')
            .setDescription('Bans an User from the Server.')
            .addUserOption((option) =>
                option
                    .setName("user")
                    .setDescription("The user to ban.")
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName("reason")
                    .setDescription("The reason for the ban.")
                    .setRequired(false)
            )
    ,

    run: ({ interaction, client }) => {

        let user = interaction.options.getMember("user");
        let reason = interaction.options.getString("reason") || "Unspecified";
        let logsChannel = client.channels.cache.get(modLogsChannelID);

        if (!interaction.member.roles.cache.has(adminRoleID)) {
            return interaction.reply({ content: `You need the role <@&${adminRoleID}> to perform this operation.`, ephemeral: true });
        }

        if (user.roles.highest.position >= interaction.member.roles.highest.position) {
            return interaction.reply({ content: `You can't ban someone with higher or same position as you.`, ephemeral: true });
        }

        if (!user) {
            interaction.reply({ content: `User is not a member of the guild.`, ephemeral: true });
        }

        if (!user.bannable) {
            return interaction.reply({ content: `I can't ban this user. He might be above me in the role hierarchy.`, ephemeral: true });
        }

        if (user.id === interaction.user.id) {
            return interaction.reply({ content: `You can't ban yourself.`, ephemeral: true });
        }

        try {
            let embed = new EmbedBuilder()
                .setTitle(`User Banned!`)
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

            user.ban({ reason: reason }).then(() => {
                interaction.reply({ embeds: [embed] });
                logsChannel.send({ embeds: [embed] });
            });
        } catch (err) {
            interaction.reply({ content: `An Error Occurred. Error:\n${err}`, ephemeral: true });
        }
    },


    options: {
        devOnly: false
    }
}