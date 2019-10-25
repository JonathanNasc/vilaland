import "phaser";
import { Dialog } from "src/components/dialogs/Dialog";
import { tile, invisible, visible } from "src/utils/gameConfigurations";
import { buildingsOptionsData } from "../buildingsOptions";
import { BuildingData } from "../buildingData";
import { CountersRepo } from "../countersRepo";

class Option {data: BuildingData;x: number;y: number;}
const border = 5;
const optionSize = tile * 1.8 - border;
const priceBoxWidth = 40;
const priceBoxHeight = 80;
const priceBoxColor = 0x366575;
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
        options.forEach((option) => this.setAvailabilty(option));
    }

    private createOption(opt: Option) {
        const color = 0x427587;
        opt.data.box = this.scene.add
            .rectangle(opt.x, opt.y, optionSize, optionSize, color)
            .setAlpha(0.5)
            .setScrollFactor(0);

        opt.data.img = this.scene.add
            .sprite(opt.x, opt.y, 'tileset', opt.data.key)
            .setScrollFactor(0)
            .setScale(opt.data.scale);

        opt.data.text = this.scene.add
            .text(opt.x, opt.y - (optionSize * 0.25), opt.data.title)
            .setScrollFactor(0)
            .setOrigin(0.5)
            .setAlpha(invisible);

        opt.data.priceContainer = this.makePriceContainer(opt);
        opt.data.box.on('pointerover', () => this.onPointerOver(opt));
        opt.data.box.on('pointerout', () => this.onPointerOut(opt));
        opt.data.box.on('pointerdown', this.onClick);
        
        super.add([
            opt.data.box,
            opt.data.text,
            opt.data.img,
            opt.data.priceContainer,
        ]);
    }

    private onClick() {
        
    }

    private onPointerOver(opt: Option) {
        opt.data.box.setAlpha(visible);
        opt.data.img.setAlpha(invisible);
        opt.data.priceContainer.setAlpha(visible);
        this.setAvailabilty(opt);
    }

    private onPointerOut(opt: Option) {
        opt.data.box.setAlpha(0.5);
        opt.data.img.setAlpha(visible);
        opt.data.priceContainer.setAlpha(invisible);
        this.setAvailabilty(opt);
    }

    private makePriceContainer(opt: Option) {
        let priceDetails = this.createPriceDetails(opt);
        return this.scene.add.container(opt.x, opt.y, priceDetails)
            .setAlpha(invisible)
            .setScrollFactor(0);
    }

    private createPriceDetails(opt: Option): any[] {
        const resourcesRequired: { [s: string]: number; } = opt.data.getRequiredResources();
        const resourcesCount = Object.keys(resourcesRequired).length;
        let i = 1;
        let details: any[] = [];
        for (let key in resourcesRequired) {
            const x = this.getPriceDetailX(i, resourcesCount);
            let box = this.scene.add.rectangle(x, 20, priceBoxWidth, priceBoxHeight, priceBoxColor);
            let value = this.scene.add.text(x, 40, resourcesRequired[key].toString());
            let icon = this.scene.add.tileSprite(x, 0, 36, 32, 'tileset', key);
            value.setOrigin(0.5);
            icon.setScale(0.8);

            details.push(box);
            details.push(value);
            details.push(icon);
            i++;
        }

        return details;
    }

    private getPriceDetailX(position: number, totalCount: number): number {
        const boxWithBorder = priceBoxWidth + 5;

        if (totalCount == 3) {
            if (position == 1) return - boxWithBorder;
            if (position == 2) return 0;
            if (position == 3) return boxWithBorder;
        }

        if (totalCount == 4) {
            if (position == 1) return ((boxWithBorder/2) + boxWithBorder) *-1;
            if (position == 2) return - boxWithBorder/2;
            if (position == 3) return boxWithBorder/2;
            if (position == 4) return (boxWithBorder/2) + boxWithBorder;
        }

        return 0;
    }

    private setAvailabilty(opt: Option) {
        if (CountersRepo.hasEnough(opt.data.price)) {
            opt.data.box.setInteractive({cursor: 'pointer'});
            opt.data.text.setAlpha(visible);
        } else {
            opt.data.box.setInteractive();
            opt.data.text.setAlpha(0.3);
        }
    }

}
