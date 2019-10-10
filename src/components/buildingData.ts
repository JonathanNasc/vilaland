import "phaser";

export class BuildingData {
    title: string;
    key: string;
    price: BuildingPrice;
    scale: number;

    // scene objects
    img: Phaser.GameObjects.Sprite;
    text: Phaser.GameObjects.Text;
    box: Phaser.GameObjects.Rectangle;

    public static create(title: string, key: string, scale: number): BuildingData {
        let option = new BuildingData();
        option.title = title;
        option.key = key;
        option.price = new BuildingPrice();
        option.scale = scale;

        return option;
    }

    public gold(value: number): BuildingData {
        this.price.gold = value;
        return this;
    }

    public wood(value: number): BuildingData {
        this.price.wood = value;
        return this;
    }

    public stone(value: number): BuildingData {
        this.price.stone = value;
        return this;
    }

    public bronze(value: number): BuildingData {
        this.price.bronze = value;
        return this;
    }

    public getObjects() {
        return [this.box, this.img, this.text];
    }

}

export class BuildingPrice {
    gold: number;
    wood: number;
    bronze: number;
    stone: number;
}