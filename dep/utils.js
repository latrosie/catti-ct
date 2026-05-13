// get rank from a "[MVP++] Catrophie" string
export function decontrustDisplayName(dispn) {
  const res = dispn.match(/^(?:\[(?<rank>[^\]]+)\]\s*)?(?<ign>\w+)(?:\s+(?<tag>.+))?$/).groups;
  return {
    'rank': res.rank,
    'ign': res.ign,
    'tag': res.tag
  }
}

register('command', plr => {
  ChatLib.chat(JSON.stringify(decontrustDisplayName(World.getPlayerByName(plr).getDisplayName().getText().removeFormatting())));
}).setCommandName('decontruct');

// doesnt work