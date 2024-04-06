// This command is only available to Admins.

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { defaultColor, adminRoleID } = require('../config.json')

module.exports = {
    data:
        new SlashCommandBuilder()
            .setName('giverole')
            .setDescription(`Gives someone a role!`)
            .addUserOption((option) =>
                option
                    .setName("user")
                    .setDescription("The User that you want to give a role to.")
                    .setRequired(true)
            )
            .addRoleOption((option) =>
                option
                    .setName("role")
                    .setDescription("The Role that you want to give.")
                    .setRequired(true)
            )
    ,

    run: async ({ interaction }) => {

    let user = interaction.options.getMember("user")
    let role = interaction.options.getRole("role")

    if (!interaction.member.roles.cache.has(adminRoleID)) {
        return interaction.reply({ content: `You need the role <@&${adminRoleID}> to perform this operation.`, ephemeral: true });
    }

    if (user.roles.cache.has(role.id)) {
        return interaction.reply({ content: `The member ${user.user} already has the role ${role}.`, ephemeral: true });
    }

    try {
        await user.roles.add(role.id);
        let embed = new EmbedBuilder()
            .setTitle(`Role Given!`)
            .addFields(
                { name: `Affected User`, value: `${user.user}`, inline: true},
                { name: `Role Given`, value: `${role}`, inline: true }
            )
            .setFooter({
                iconURL: interaction.user.avatarURL(),
                text: `Requested by ${interaction.user.username}.`
            })
            .setColor(defaultColor);
        interaction.reply({ embeds: [ embed ] });
    } catch (err) {
        interaction.reply({ content: `An Error Occurred. The role that you're trying to give might be above me in the role hierarchy.\nError:\n${err}`, ephemeral: true });
    }

    },

    options: {
        devOnly: false
    }
}