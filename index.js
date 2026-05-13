export const config = JSON.parse(FileLib.read('Catti', 'config.jsonc').replace(/\/\/.*$/gm,''));
console.log(config);

import './mod/self_chat_bot';
import './dep/tablist';
import './mod/nick';
import './mod/chat';
import './mod/jumpresethud';

import './dep/update';

const metadata = JSON.parse(FileLib.read('Catti', 'metadata.json'));
register('command', () => {
  ChatLib.chat(ChatLib.getCenteredText('[CATTI]'));
  ChatLib.chat("&7Creator:&r Catrophie <3");
  ChatLib.chat("&7Version:&r " + metadata.version);
  ChatLib.chat("&7Modules:&r 3");
  ChatLib.chat(ChatLib.getCenteredText('[ITTAC]'));
}).setName('catti');
