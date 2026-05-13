register('command', () => {
  console.log(Player.getDisplayName().getText().removeFormatting());
}).setName('meow');