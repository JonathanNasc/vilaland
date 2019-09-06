import "phaser"
import { MovementOrder } from "src/commands/movementOrder";

export class Street extends Phaser.Physics.Arcade.Sprite {
  public body: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'tileset', 'street_vertical');
    scene.add.existing(this);
    scene.physics.world.enableBody(this, Phaser.Physics.Arcade.STATIC_BODY);
    this.setInteractive();
    this.setDepth(5);
    this.on('pointerdown', this.onPointerDown);
  }

  private onPointerDown(): void {
    MovementOrder.pushOrder(this.x, this.y);
  }
}