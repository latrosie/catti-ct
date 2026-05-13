// todo list
// store uuids of possible nickers and when in lobby /syncnicks to match them with their /profile
// involve skins into ts

let do_denicklobby = false;
register('command', ign => {
  do_denicklobby = true;
  let packet = new net.minecraft.network.play.client.C14PacketTabComplete("/stats ");
  Client.sendPacket(packet);
}).setName('denicklobby');

const S3APacketTabComplete = net.minecraft.network.play.server.S3APacketTabComplete;
register('packetReceived', packet => {
  if(!do_denicklobby) return;
  do_denicklobby = false;

  const displaynames = World.getAllPlayers()
    .filter(p => p.getUUID().version() != 4)
    .map(p => p.getName());
    // .sort();
  console.log(displaynames);

  const completions = packet.func_149630_c(); // getChoices()
  
  const diff = displaynames.filter(e => !completions.includes(e));
  // if only 1 person nicked in lobby then storeuuid them i guess
  diff.forEach(e => ChatLib.chat(`[Nicked] ${e} -> ${denick(e) || '?'}`));
}).setFilteredClass(S3APacketTabComplete);

function storeUUID(dispn, ign) {
  if(!ign) {
    ChatLib.chat('ign is not given');
    return;
  }
  
  const plr = World.getPlayerByName(dispn);
  if(!plr) {
    ChatLib.chat('couldnt find that dispn in lobby');
    return;
  };
  
  let dat = JSON.parse(FileLib.read('Catti', 'dat/player_uuids.json'));
  dat[plr.getUUID().toString()] = ign;
  FileLib.write('Catti', 'dat/player_uuids.json', JSON.stringify(dat, null, 2));

  ChatLib.chat(`StoredUUID of ${plr.getName()} (${plr.getUUID().toString()})`);
}

function denick(ign) {
  const plr = World.getPlayerByName(ign);
  if(!plr) return;
  const dat = JSON.parse(FileLib.read('Catti', 'dat/player_uuids.json'));
  return dat[plr.getUUID().toString()] || false;
}

register('command', (dispn, ign) => {
  storeUUID(dispn, ign);
}).setName('storeuuid');

register('command', ign => {
  // could be improved
  ChatLib.chat(`[Nicked] ${ign} -> ${denick(ign) || '?/!nicked'}`);
}).setName('denick');