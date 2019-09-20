import "phaser"
import { MovementOrder } from "src/commands/movementOrder";
import { InteractiveArea } from "./interactiveArea";
import { zStreet } from "src/utils/depth";

export class Street extends Phaser.GameObjects.TileSprite {
  
  public body: Phaser.Physics.Arcade.Body;
  public streetUp: Street;
  public streetDown: Street;
  public streetRight: Street;
  public streetLeft: Street;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 60, 128, 'tileset', 'street_vertical_t');
    scene.add.existing(this);
    // scene.physics.world.enableBody(this, Phaser.Physics.Arcade.STATIC_BODY);
    this.setInteractive({cursor: 'pointer'});
    this.setDepth(zStreet);
    this.on('pointerdown', this.onPointerDown);
  }

  private onPointerDown(): void {
    MovementOrder.moveTo(this.x, this.y);
    InteractiveArea.setPosition(this.x, this.y);
  }
}