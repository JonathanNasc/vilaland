import "phaser"
import { zDialog } from "src/utils/depth";

type Container = Phaser.GameObjects.Container;
type GameObject = Phaser.GameObjects.GameObject;
type Rectangle = Phaser.GameObjects.Rectangle;

export class Dialog {

    public container: Container;
    public rect: Rectangle;
    public scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, width: number, height: number) {
        const { centerX, centerY } = scene.cameras.main;
        this.scene = scene;
        this.rect = scene.add.rectangle(0, 0, width, height, 0x3C6776, 1)
        this.container = this.scene.add.container(centerX, centerY, this.rect);
        this.container.setScrollFactor(0);
        this.container.setDepth(zDialog);
        this.scene.add.existing(this.container);
        this.container.setAlpha(0);
        this.scene.input.keyboard.on('keydown-ESC', () => this.close());
    }

    public add(object: GameObject | GameObject[]) {
        this.container.add(object);
    }

    public open() {
        this.container.setAlpha(1);
    }

    public close() {
        this.container.setAlpha(0);
    }

    protected getTopY() {
        return -this.rect.height/2
    }

}