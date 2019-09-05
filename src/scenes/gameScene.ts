import "phaser";
import { Player } from "src/sprites/player";
import { constWorld } from "src/utils/gameConfigurations"
import { DefaultObjectsGenerator } from "src/commands/defaultObjectsGenerator";

const doc = document.documentElement;

export class GameScene extends Phaser.Scene {
  private grass: Phaser.GameObjects.TileSprite;
  private mainStreet: Phaser.GameObjects.TileSprite;
  private player: Player;

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
    this.add.tileSprite(810, 200, 88, 120, 'tileset', 'house');
    this.add.tileSprite(810, 400, 104, 120, 'tileset', 'shed');
    this.add.tileSprite(810, 600, 64, 80, 'tileset', 'store');

    this.player = new Player(this, constWorld / 2, 0, 'player_red');
    this.setWorldAndCamera();
  }

  update(time: any): void {
    this.player.update();
  }

  private setWorldAndCamera(): void {
    this.physics.world.setBounds(0, 0, constWorld, constWorld);
    this.cameras.main.setBounds(0, 0, constWorld, constWorld);
    this.physics.world.setBoundsCollision();
    this.cameras.main.startFollow(this.player);
  }
};
