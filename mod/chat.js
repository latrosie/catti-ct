import whereami from "../dep/tablist";

let chatChannel = 'a';
let whisperingTo = '';

const chatEmojis = {
  '<3': '❤'
};

function replaceEmojis(msg) {
  msg = msg.split(' ');
  for (let i = 0; i < msg.length; i++) if (Object.keys(chatEmojis).includes(msg[i])) msg[i] = chatEmojis[msg[i]];
  return msg.join(' ');
}

register('messageSent', (msg, e) => {
  // emojis
  // if(msg.startsWith('/pc ') || msg.startsWith('/w ') || msg.startsWith('/msg ') || msg.startsWith('/a ') || msg.startsWith('/r ')) {
  //   e.isCanceled(true);
  //   msg = replaceEmojis(msg);
  //   ChatLib.command(msg);
  //   return;
  // }

  if (msg.startsWith('/') || chatChannel == 'a') return;

  e.setCanceled(true);

  if (msg.startsWith('!!') && whereami().startsWith('bw-')) { ChatLib.command('shout ' + msg); return }
  if (msg.startsWith('!')) { ChatLib.say(msg.substring(1)); return }

  // msg = replaceEmojis(msg);

  // channels
  switch (chatChannel) {
    case 'p':
      break;
    case 'w':
      ChatLib.command(`w ${whisperingTo} ${msg}`);
      break;
    case 'S':
      if (whereami().startsWith('bw-')) ChatLib.command('shout ' + msg);
      else ChatLib.say(msg);
      break;
    // case 'a':
    //   ChatLib.say(msg);
    //   break;
  }
})

register('command', (channel, whisTo) => {
  if (!channel) {
    // too lazy to do anything else
    ChatLib.chat('&7Current chat channel: &r' + (chatChannel == 'w' ? `whisper (${whisperingTo})` : chatChannel == 'a' ? 'all' : channel == 'p' ? 'party' : 'SHOUT'));
    return;
  }

  switch (channel) {
    case 'a':
    case 'all':
      if (chatChannel === 'p') ChatLib.command('chat a');
      chatChannel = 'a';
      ChatLib.chat('&7Switched to chat channel: &rall');
      break;
    case 'p':
    case 'party':
      if (chatChannel !== 'p') ChatLib.command('chat p');
      chatChannel = 'p';
      ChatLib.chat('&7Switched to chat channel: &rparty');
      break;
    case 'w': case 'm':
    case 'msg':
      if (!whisTo) {
        ChatLib.chat('&cSpecify who to whisper to. /chat msg <player>');
        return;
      }

      if (chatChannel === 'p') ChatLib.command('chat a');
      chatChannel = 'w';
      whisperingTo = whisTo;
      ChatLib.chat(`&7Switched to chat channel: &rmsg (${whisperingTo})`);
      break;
    case 'S': case 's':
    case 'shout':
      if (chatChannel === 'p') ChatLib.command('chat a');
      chatChannel = 's'
      ChatLib.chat('&7Switched to chat channel: &rSHOUT');
      break;
    default:
      ChatLib.chat('&cInvalid channel. (all,party,msg,shout)');
  }
}).setTabCompletions('all', 'party', 'msg', 'shout').setName('chat', true);