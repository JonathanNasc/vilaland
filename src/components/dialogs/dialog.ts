import "phaser"
import { zDialog } from "src/utils/depth";

type Container = Phaser.GameObjects.Container;
type GameObject = Phaser.GameObjects.GameObject;
type Rectangle = Phaser.GameObjects.Rectangle;

export class Dialog {

    public container: Container;
    public rect: Rectangle;
    public escButton: Rectangle;
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
        this.createEsc();
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

    private createEsc() {
        const width = 90;
        const height = 45;
        const x = (this.rect.width / 2) - (width / 2);
        const y = ((this.rect.height / 2) + (height / 2)) * -1;
        let escText = this.scene.add.text(x, y, "Esc");
        escText.setOrigin(0.5);
        this.escButton = this.scene.add.rectangle(x, y, width, height, 0x4d7d8d);
        this.escButton.on('pointerdown', () => this.close());
        this.escButton.setInteractive({cursor: 'pointer'});
        this.container.add([this.escButton, escText]);

        //Pressing Esc should close the dialog
        this.scene.input.keyboard.on('keydown-ESC', () => this.close());
    }

}