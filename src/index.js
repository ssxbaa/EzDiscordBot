const { Client, IntentsBitField } = require('discord.js');
const { token } = require('./config.json')
const { CommandKit } = require('commandkit');
const path = require('path');

/*
    Hello There!

    Seba here. Don't touch this file, unless you know what you're doing.
    ONLY edit the ./config.json to config your bot and the ./events/ready/setPresence.js to edit the status.

    If you're looking how to remove the credits, please don't do it.
    You can change the Presence, but keep the /credits command.
    It supports me and it helps more people to know my project.

    Thank you! ❤
 */

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

new CommandKit({
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    devGuildIds: ['devGuildID'], // Your Guild's ID.
    skipBuiltInValidations: true,
    bulkRegister: true,
});

client.login(token);
