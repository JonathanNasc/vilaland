import "phaser"

const TileSprite = Phaser.GameObjects.TileSprite;

export class GameStatus {

  public static init(scene: Phaser.Scene) {
    if (scene.cameras.main.deadzone) {
      return;
    }

    GameStatus.initWood(scene);
    GameStatus.initStone(scene);
    GameStatus.initBronze(scene);
    GameStatus.initGold(scene);
  }

  private static initWood(scene: Phaser.Scene) {
    scene.add.rectangle(50, 50, 50, 40, 0x254638);
    scene.add.rectangle(100, 50, 50, 40, 0x4c7564);
    scene.add.existing(new TileSprite(scene, 50, 50, 47, 30, 'tileset', 'wood'));
  }

  private static initStone(scene: Phaser.Scene) {
    scene.add.rectangle(50, 100, 50, 40, 0x254638);
    scene.add.rectangle(100, 100, 50, 40, 0x4c7564);
    scene.add.existing(new TileSprite(scene, 50, 100, 36, 32, 'tileset', 'stone_small_x'));
  }

  private static initBronze(scene: Phaser.Scene) {
    scene.add.rectangle(50, 150, 50, 40, 0x254638);
    scene.add.rectangle(100, 150, 50, 40, 0x4c7564);
    scene.add.existing(new TileSprite(scene, 50, 150, 36, 32, 'tileset', 'bronze_stone_s'));
  }

  private static initGold(scene: Phaser.Scene) {
    scene.add.rectangle(50, 200, 50, 40, 0x254638);
    scene.add.rectangle(100, 200, 50, 40, 0x4c7564);
    scene.add.existing(new TileSprite(scene, 50, 200, 36, 32, 'tileset', 'gold'));
  }

}