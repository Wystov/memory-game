const state = {
  cardboardSize: 8,
  prevPlay: false,
  queue: [],
  turns: 0,
  match: 0,
  smile: false,

  newGame() {
    this.turns = 0;
    this.match = 0;
  },

};

export default state;
