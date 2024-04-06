// This command is only available to Admins.

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { defaultColor, modLogsChannelID, adminRoleID } = require('../config.json')

module.exports = {
    data:
        new SlashCommandBuilder()
            .setName('unban')
            .setDescription('Unbans an User from the Server.')
            .addIntegerOption((option) =>
                option
                    .setName("id")
                    .setDescription("The ID of the banned user.")
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName("reason")
                    .setDescription("The reason for the unban.")
                    .setRequired(false)
            )
    ,

    run: ({ interaction, guild, client }) => {

        let user = interaction.options.getMember("user");
        let reason = interaction.options.getString("reason") || "Unspecified";
        let logsChannel = client.channels.cache.get(modLogsChannelID);

        if (!interaction.member.roles.cache.has(adminRoleID)) {
            return interaction.reply({ content: `You need the role <@&${adminRoleID}> to perform this operation.`, ephemeral: true });
        }

        try {
            let embed = new EmbedBuilder()
                .setTitle(`User Unbanned!`)
                .setColor(defaultColor)
                .addFields(
                    { name: `User Affected`, value: `${user.user}`, inline: true },
                    { name: `Staff Member`, value: `${interaction.user}`, inline: true },
                    { name: `Reason`, value: `${reason}` }
                )
                .setFooter({
                    iconURL: interaction.user.avatarURL(),
                    text: `Requested by ${interaction.user.username}.`
                });

            guild.members.unban(user.id).then(
                interaction.reply({ embeds: [ embed ] }),
                logsChannel.send({ embeds: [ embed ] })
            )
        } catch (err) {
            interaction.reply({ content: `An Error Occurred. Error:\n${err}`, ephemeral: true });
        }
    },


    options: {
        devOnly: false
    }
}