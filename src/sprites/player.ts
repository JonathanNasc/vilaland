import "phaser"
import { MovementOrder } from "src/commands/movementOrder";

export class Player extends Phaser.Physics.Arcade.Sprite {
  public body: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, 'tileset', key);
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.body.setCollideWorldBounds(true);
    this.setDepth(1000);//z-index
  }

  update() {
    if (MovementOrder.orders.length > 0) {
      for (let orderNumber in MovementOrder.orders) {
        this.x = MovementOrder.orders[orderNumber].x;
        this.y = MovementOrder.orders[orderNumber].y;
        MovementOrder.orders.splice(Number(orderNumber), 1);
      }
    }
  }
}