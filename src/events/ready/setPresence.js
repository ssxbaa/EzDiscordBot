const ActivityType = require('discord.js')

/*
    Status can be online, idle, dnd, and offline.
    ActivityType can be Watching, Playing, Competing, Streaming, Listening or Custom.
*/

module.exports = (bot, client, handler) => {
    client.user.setPresence({
        activities: [{
            name: `status`,
            state: `👨🏻‍💻 By ssxbaa on GitHub!`,
            type: 4
        }],
        status: 'online',
    });
};