import "phaser";
import { Dialog } from "src/components/dialogs/Dialog";
import { tile } from "src/utils/gameConfigurations";
import { buildingsOptionsData } from "../buildingsOptions";
import { BuildingData } from "../buildingData";

class Option {data: BuildingData;x: number;y: number;}
const border = 5;
const optionSize = tile * 1.8 - border;
const options: Option[] = [
    {data: buildingsOptionsData.street, x: - optionSize, y: - optionSize/2},
    {data: buildingsOptionsData.hostel, x: 0, y: - optionSize/2},
    {data: buildingsOptionsData.store, x: optionSize, y: - optionSize/2},
    {data: buildingsOptionsData.shed, x: - optionSize, y: optionSize/2},
    {data: buildingsOptionsData.tavern, x: 0, y: optionSize/2},
    {data: buildingsOptionsData.church, x: optionSize, y: optionSize/2},
];

export class OptionsToBuildDialog extends Dialog {

    constructor(scene: Phaser.Scene) {
        super(scene, optionSize * 3, optionSize * 2);
        options.forEach((option) => this.createOption(option));
    }

    public open() {
        super.open();
    }

    private createOption(opt: Option) {
        const color = 0x427587;
        opt.data.box = this.scene.add
            .rectangle(opt.x, opt.y, optionSize, optionSize, color)
            .setAlpha(0.5)
            .setScrollFactor(0)
            .setInteractive({cursor: 'pointer'});

        opt.data.img = this.scene.add
            .sprite(opt.x, opt.y, 'tileset', opt.data.key)
            .setScrollFactor(0)
            .setScale(opt.data.scale);

        opt.data.text = this.scene.add
            .text(opt.x, opt.y, opt.data.title)
            .setScrollFactor(0)
            .setOrigin(0.5)
            .setAlpha(0);

        opt.data.box.on('pointerover', () => this.onPointerOver(opt));
        opt.data.box.on('pointerout', () => this.onPointerOut(opt));
        opt.data.box.on('pointerdown', this.onClick);

        super.add([opt.data.box, opt.data.text, opt.data.img]);
    }

    private onClick() {

    }

    private onPointerOver(opt: Option) {
        opt.data.box.setAlpha(1);
        opt.data.img.setAlpha(0);
        opt.data.text.setAlpha(1);
    }

    private onPointerOut(opt: Option) {
        opt.data.box.setAlpha(0.5);
        opt.data.img.setAlpha(1);
        opt.data.text.setAlpha(0);
    }

}
