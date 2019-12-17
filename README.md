# LuluBot

A chatbot learning to speak from Discord messages.
Mention it @<bot_tag> to chat with it.

Requires a recent version of [Node.js](https://nodejs.org/).

Before using it, make sure to create a file *credentials.json* containing your Discord bot's token.
The file should follow this format:
`{ "token": "YOUR_TOKEN_HERE" }`

You can put the bot to sleep (pauses its learning process) by mentionning it and typing the !stop command.
To wake up the bot, use the !start command in the same way, and the !status command to check the bot's status
