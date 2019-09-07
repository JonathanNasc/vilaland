import "phaser"
import { MovementOrder } from "src/commands/movementOrder";
import { InteractiveArea } from "./interactiveArea";

export class Street extends Phaser.GameObjects.TileSprite {
  public body: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 60, 128, 'tileset', 'street_vertical_t');
    scene.add.existing(this);
    // scene.physics.world.enableBody(this, Phaser.Physics.Arcade.STATIC_BODY);
    this.setInteractive();
    this.setDepth(50);
    this.on('pointerdown', this.onPointerDown);
  }

  private onPointerDown(): void {
    MovementOrder.moveTo(this.x, this.y);
    InteractiveArea.setPosition(this.x, this.y);
  }
}