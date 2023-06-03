class gameSettings {
  cardboardSize = 8;
  prevPlay = false;
  queue: string[] = [];
  turns = 0;
  match = 0;
  smile = false;

  newGame() {
    this.turns = 0;
    this.match = 0;
  };
}

const state = new gameSettings();

export default state;
