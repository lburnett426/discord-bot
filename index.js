const Discord = require('discord.js');
const constants = require('./constants');

let bot = new Discord.Client();

bot.on('ready', function() {
  console.log('MyFirstDiscordBot is ready...');
  let availableChannels = bot.channels.map(x => x.name);
  let textChannels = bot.channels
    .filter(x => x.type === 'text')
    .map(x => x.name);
  let voiceChannels = bot.channels
    .filter(x => x.type === 'voice')
    .map(x => x.name);

  console.log('Available Channels: ' + availableChannels);
  console.log('Available Text Channels: ' + textChannels);
  console.log('Available Voice Channels: ' + voiceChannels);
});

bot.on('message', function(message) {
  if (message.author.equals(bot.user)) return;

  switch (message.content) {
    case 'hello':
      getWorld(message);
      break;
    case constants.KEYWORDS.RANDOM_BUZZWORD_DATA:
      getRandomBuzzwordData(message);
      break;
    default:
      return;
  }
});

function getRandomBuzzwordData(message) {
  const axios = require('axios');
  axios.get(constants.BUZZWORD_API).then(response => {
    let messageToSend = `Here's your list of random catch phrases!${'\n\n' +
      response.data.map(x => x.catchPhrase).join('\n')}`;
    message.channel.send(messageToSend);
  });
}

function getWorld(message) {
  message.channel.send('world!');
}

bot.login(constants.BOT_USER_TOKEN);
