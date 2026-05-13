export class Party {
  refresh() {
    
  }

  getMembers() {

  }

  invite(ign) {

  }

  kick(ign) {

  }

  exists() {
    
  }

  leave() {

  }

  getLeader() {
    // temp
    return Player.getName();
  }

  promote(ign) { this.setLeader(ign) }

  setLeader(ign) {

  }

  isMember(ign) {
    // temp
    return true;
  }

  // alpha is only one who will respond to party commands like ;stats to reduce clutter
  getAlpha() {

  }

  setAlpha(ign) {
    // only the current alpha can run this
    // if there is no alpha, you will become it
  }

  syncAlpha() {
    // run ;whoalpha and set the alpha to which one was told by the majority of the party catti users
    // if it is equal or there is no alpha (disconnect / left / new party) pick the catti user that comes alphabetically first for everyone
  }
}

export class Friends {
  refresh() {

  }

  add(ign) {

  }

  remove(ign) {

  }

  getFriends() {

  }

  getOnline() {

  }

  isFriend(ign) {

  }

  getSlotsLeft() {
    // get remaining friend slots left
  }

  compare() {
    // check if anyone unfriended you / rank changes
  }
}