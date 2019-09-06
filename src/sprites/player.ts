import "phaser"
import { MovementOrder } from "src/commands/movementOrder";

export class Player extends Phaser.Physics.Arcade.Sprite {
  public body: Phaser.Physics.Arcade.Body;
  public scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, 'tileset', key);
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.body.setCollideWorldBounds(true);
    this.setDepth(1000);//z-index
  }

  update() {
    MovementOrder.move(this);
    MovementOrder.stop(this);
  }

}