import "phaser"
import { GameScene } from "./scenes/gameScene";

const doc = document.documentElement;
const config: Phaser.Types.Core.GameConfig = {
  title: "vilaland",
  width: doc.clientWidth,
  height: doc.clientHeight,
  parent: "game",
  scene: [GameScene],
  backgroundColor: "#000",
  dom: {
    createContainer: true
  },
  physics: {
    default: "arcade"
  }
};

export class Main extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

new Main(config);
