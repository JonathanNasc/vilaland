import "phaser"
import { Counter } from "src/components/counter";
import { zCounters } from "src/utils/depth";

const inicialValue = 10;

export class CountersRepo {

  static gold: Counter;
  static stone: Counter;
  static bronze: Counter;
  static wood: Counter;

  public static init(scene: Phaser.Scene) {
    CountersRepo.initGold(scene);
    CountersRepo.initStone(scene);
    CountersRepo.initBronze(scene);
    CountersRepo.initWood(scene);
  }

  private static initGold(scene: Phaser.Scene) {
    this.createRectanglePair(scene, 40);
    CountersRepo.gold = this.createStatusIcon(scene, 40, 'coin');
  }

  private static initStone(scene: Phaser.Scene) {
    this.createRectanglePair(scene, 80);
    CountersRepo.stone = this.createStatusIcon(scene, 80, 'stone_small_x');
  }

  private static initBronze(scene: Phaser.Scene) {
    this.createRectanglePair(scene, 120);
    CountersRepo.bronze = this.createStatusIcon(scene, 120, 'bronze_stone_s', 35);
  }

  private static initWood(scene: Phaser.Scene) {
    this.createRectanglePair(scene, 160);
    CountersRepo.wood = this.createStatusIcon(scene, 160, 'wood', 48, 30);
  }

  private static createRectanglePair(scene: Phaser.Scene, y: number) {
    scene.add.rectangle(40, y, 35, 30, 0x3C6776, 0.5).setScrollFactor(0).setDepth(zCounters);
    scene.add.rectangle(80, y, 45, 30, 0x2C5564, 0.5).setScrollFactor(0).setDepth(zCounters);
  }

  private static createStatusIcon(scene: Phaser.Scene, y: number, key: string, width = 36, height = 32): Counter {
    let resource = new Counter(scene, 40, y, width, height, 'tileset', key);
    let text = scene.add.text(65, y - 7, inicialValue.toString());
    resource.setScale(0.6);
    resource.setDepth(zCounters)
    resource.setScrollFactor(0);
    resource.setDataEnabled();
    resource.setData('value', inicialValue);
    text.setScrollFactor(0);
    text.setDepth(zCounters);

    resource.on('changedata', (gameObject: any, key: string, value: any) => {
      text.setText(gameObject.data.get('value'));
    });

    scene.add.existing(resource);
    return resource;

  }

}
