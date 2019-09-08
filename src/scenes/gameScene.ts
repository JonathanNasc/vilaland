import "phaser";
import { Player } from "src/sprites/player";
import { constWorld, tile } from "src/utils/gameConfigurations"
import { DefaultObjectsGenerator } from "src/commands/defaultObjectsGenerator";
import { InteractiveArea } from "src/sprites/interactiveArea";
import { GameStatus } from "src/components/gameStatus";

const doc = document.documentElement;

export class GameScene extends Phaser.Scene {
  private grass: Phaser.GameObjects.TileSprite;
  private player: Player;
  private interactivearea: InteractiveArea;
  private keys: any;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void { }

  preload(): void {
    this.load.atlasXML('tileset', 'assets/tileset/all.png', 'assets/tileset/all.xml');
  }

  create(): void {
    this.grass = this.add.tileSprite(0, 0, constWorld * 2, constWorld * 2, 'tileset', 'grass');
    DefaultObjectsGenerator.makeMainStreet(this);

    //testing sprites
    this.add.tileSprite(constWorld / 2 - tile, tile * 2 - tile /2, 88, 120, 'tileset', 'house').setDepth(100);
    this.add.tileSprite(constWorld / 2 - tile, tile * 3 - tile /2, 104, 120, 'tileset', 'shed').setDepth(100);
    this.add.tileSprite(constWorld / 2 - tile, tile * 4 - tile /2, 64, 80, 'tileset', 'store').setDepth(100);
    this.add.tileSprite(constWorld / 2 + 1 * tile, tile * 2 - tile /2, 53, 96, 'tileset', 'tree1').setDepth(100);
    this.add.tileSprite(constWorld / 2 + 1 * tile - 50, tile * 4 - tile /2 +10, 76, 70, 'tileset', 'stone_large').setDepth(100);

    //menu bar
    GameStatus.init(this);
    this.keys = this.input.keyboard.addKeys('G,S,W,B');//TODO remove it

    this.player = new Player(this, constWorld / 2, 0, 'player_red');
    this.interactivearea = new InteractiveArea(this, -tile*3, -tile*3);
    this.setWorldAndCamera();
  }

  update(time: any): void {
    this.player.update();
    this.interactivearea.update();

    if (this.keys.G.isDown) {
      GameStatus.gold.data.set('value', GameStatus.gold.data.get('value') + 10);
    }
  }

  private setWorldAndCamera(): void {
    this.physics.world.setBounds(0, 0, constWorld, constWorld);
    this.cameras.main.setBounds(0, 0, constWorld, constWorld);
    this.physics.world.setBoundsCollision();
    this.cameras.main.startFollow(this.player, false, 0.05, 0.05);
  }
};
