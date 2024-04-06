# ✨ • EzDiscordBot

EzDiscordBot is the free, private bot for your server!

# 📝 • Prerequisites

- NodeJS
- A Discord Bot (create it [here](https://discord.com/developers/applications))
- Activate the Developer Mode in Discord Settings. 

# ❓ • How to copy an ID?

- Activate the Developer Mode
- Right click on the Channel / Role and click "Copy ID"

![image](https://github.com/ssxbaa/EzDiscordBot/assets/145496446/01103ff6-63fb-4847-ac7b-fc1d69b69f3d)

# 💻 • Tutorial

- Create an application on the Discord Developer Portal, copy your token and paste it somewhere safe.
- Go to your Application -> OAuth2 -> Check "bot", "applications.commands" in the first box. and then "Administrator" in the second box.
- Copy your link and invite your Bot to your server.
- Create some channels now. Create a Welcome Channel and a Modlogs channel.
- Create two roles, a Staff Role, and an Admin Role. These roles are used to check if a user has the permission to use the commands. For example, mute and unmute commands can be used by Staff but ban and kick commands can be used only by Admins.
- Download the zip file, and unzip it. Navigate into the src folder and open "config.json".
- Here, you need to paste in your token, and replace all that it's in the quotes. You also need to put your channel IDs and role IDs.
- Once you're done, it will look something like this.

![image](https://github.com/ssxbaa/EzDiscordBot/assets/145496446/d0e52d05-b49f-4afe-8260-25ad40a8edac)

- If you want, you can even change the embeds' color by changing the defaultColor value to a [hex color](https://www.google.com/search?q=hex+color+picker).
- Copy your Server's ID by right clicking on your Server's icon.
- Open the index.js file and replace the 'devGuildID' in line 32 with your Server's ID.
- Open a Command Prompt in the Bot's Folder.
- Download the dependencies by running `npm install`.
- Keep the bot running with `node src/index.js`

# 🤖 • Expand the Bot
You can even expand the bot by yourself and put commands that are not there.
Read the [CommandKit Docs](https://commandkit.js.org/guide/installation) and you can use the `src/templateCommand.js` file, paste it into the commands folder and start making a new command.

# ⭐ • Star

Star the repo to keep my work going!

# 🎈 • Credits

Don't remove the credits in the code because they support me by making more people find out about my code.

# 💲 • Donations

If you feel generous and you wanna buy me a coffee, you can donate to these wallets:

BTC: bc1qxr7kjvypndqyqu0f6x5vwyt9mg0sw05dn7szuv

LTC: LUZ8i9ZGRrGXnJusEfN3uHKcLrrwA2mctR

SOL: 3cRUiT9UF2tS53wAnCFq3kRQSCvVExabyBuDfnNGGa8p

DOGE: D7cJZP9rE2yBugDUBT7SqR2teGc2FC4hN2
