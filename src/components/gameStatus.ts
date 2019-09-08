import "phaser"

const TileSprite = Phaser.GameObjects.TileSprite;
const inicialValue = 10;

export class GameStatus {

  static gold: Phaser.GameObjects.TileSprite;
  static stone: Phaser.GameObjects.TileSprite;
  static bronze: Phaser.GameObjects.TileSprite;
  static wood: Phaser.GameObjects.TileSprite;

  public static init(scene: Phaser.Scene) {
    GameStatus.initGold(scene);
    GameStatus.initStone(scene);
    GameStatus.initBronze(scene);
    GameStatus.initWood(scene);
  }

  private static initGold(scene: Phaser.Scene) {
    this.createRectanglePair(scene, 40);
    GameStatus.gold = this.createStatusIcon(scene, 40, 'gold');
  }

  private static initStone(scene: Phaser.Scene) {
    this.createRectanglePair(scene, 80);
    GameStatus.stone = this.createStatusIcon(scene, 80, 'stone_small_x');
  }

  private static initBronze(scene: Phaser.Scene) {
    this.createRectanglePair(scene, 120);
    GameStatus.bronze = this.createStatusIcon(scene, 120, 'bronze_stone_s', 35);
  }

  private static initWood(scene: Phaser.Scene) {
    this.createRectanglePair(scene, 160);
    GameStatus.wood = this.createStatusIcon(scene, 160, 'wood', 48, 30);
  }

  private static createRectanglePair(scene: Phaser.Scene, y: number) {
    scene.add.rectangle(40, y, 35, 30, 0x3C6776, 0.5).setScrollFactor(0);
    scene.add.rectangle(80, y, 45, 30, 0x2C5564, 0.5).setScrollFactor(0);
  }

  private static createStatusIcon(scene: Phaser.Scene, y: number, key: string, width = 36, height = 32): Phaser.GameObjects.TileSprite {
    let tileSprite = new TileSprite(scene, 40, y, width, height, 'tileset', key);
    let text = scene.add.text(65, y - 7, inicialValue.toString());
    tileSprite.setScale(0.6);
    tileSprite.setScrollFactor(0);
    tileSprite.setDataEnabled();
    tileSprite.setData('value', inicialValue);
    text.setScrollFactor(0);

    tileSprite.on('changedata', (gameObject: any, key: string, value: any) => {
      text.setText(gameObject.data.get('value'));
    });

    scene.add.existing(tileSprite);
    return tileSprite;
  }

}
