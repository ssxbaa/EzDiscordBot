const { welcomeChannelID } = require('../../config.json')

module.exports = ( member, handler, client ) => {
    async function welcomeSend() {
        let channel = await member.guild.channels.cache.get(welcomeChannelID)
        channel.send(`Welcome, ${member.user}!`)
    }
    welcomeSend()
}