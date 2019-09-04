import { ArcadeMovements } from './../commands/arcadeMovements';

export class Player extends Phaser.Sprite {
  private cursor: Phaser.CursorKeys;

  constructor(game: Phaser.Game, x: number, y: number, asset: string, key: string) {
    super(game, x, y, asset, key);
    this.anchor.setTo(0.5);
    this.cursor = this.game.input.keyboard.createCursorKeys();
    this.game.physics.p2.enable(this);
    // this.body.fixedRotation = true;
  }

  update() {
    ArcadeMovements.move(this, this.cursor);
  }
}