
export class Tree extends Phaser.Sprite {
  private cursor: Phaser.CursorKeys;

  constructor(game: Phaser.Game, x: number, y: number, type = 1) {
    super(game, x, y, 'tileset', `tree${type}`);
  }

  update() {}
}