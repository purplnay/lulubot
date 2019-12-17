const Discord = require('discord.js');
const { LuluBot } = require('./bot');
const credentials = require('./credentials.json');
const{removeMentions}=require('./bot').utils;
const client = new Discord.Client();
const lulu = new LuluBot();

client.on('ready', () => {
  console.log(`Connected as ${client.user.tag}.`);
});

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.isMentioned(client.user) && message.channel.type !== 'dm') return;
  if (message.content.length === 0) return;

  // Reply if message author is not bot and if lulubot is mentionned or in dm channel.
  message.channel.send(lulu.reply(message.content));
});

// Save corpus every 10 minutes
setInterval(() => {
  lulu.corpus.saveCorpus().then(() => {
    console.log('Success saving corpus.');
  }).catch(e => console.error('Failed saving corpus:', e.message));
}, 600_000);

client.login(credentials.token);
