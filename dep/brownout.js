register('command', msg => ChatLib.simulateChat(`Party > ${Player.getName()}: ${msg}`)).setName('pc', true);
register('command', (who, msg) => ChatLib.chat(`[From Me to ${who}] ${msg}`)).setName('w', true).setAliases('msg');
register('command', msg => ChatLib.chat(`[From Me to ${who}] ${msg}`)).setName('a', true).setAliases('r');
ChatLib.chat('[CATTI] Brownout mode active!!');