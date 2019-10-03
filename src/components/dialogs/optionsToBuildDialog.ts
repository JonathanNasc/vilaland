import "phaser";
import { Dialog } from "src/components/dialogs/Dialog";
import { tile } from "src/utils/gameConfigurations";
import { buildingsOptionsData } from "../buildingsOptions";
import { BuildingData } from "../buildingData";

class Option {data: BuildingData;x: number;y: number;}

const border = 5;
const dialogSize = tile * 3;
const optionSize = tile - border;
const options: Option[] = [
    {data: buildingsOptionsData.street, x: - optionSize, y: - optionSize},
    {data: buildingsOptionsData.hostel, x: 0, y: - optionSize},
    {data: buildingsOptionsData.store, x: optionSize, y: - optionSize},
    {data: buildingsOptionsData.shed, x: - optionSize, y: 0},
    {data: buildingsOptionsData.tavern, x: 0, y: 0},
    {data: buildingsOptionsData.church, x: optionSize, y: 0},
];

export class OptionsToBuildDialog extends Dialog {

    constructor(scene: Phaser.Scene) {
        super(scene, dialogSize, dialogSize);
        options.forEach((option) => this.createOption(option));
    }

    public open() {
        super.open();
    }

    private createOption(opt: Option) {
        const color = 0x427587;
        let box = this.scene.add
            .rectangle(opt.x, opt.y, optionSize, optionSize, color)
            .setInteractive({cursor: 'pointer'});

        let img = this.scene.add
            .sprite(opt.x, opt.y, 'tileset', opt.data.key)
            .setScale(opt.data.scale);

        super.add([box, img]);
    }

}
