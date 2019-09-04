import { Boot } from './states/boot';
import { Game } from './states/game';
import { Splash } from './states/splash';

export class Main extends Phaser.Game {
    constructor() {
        const doc = document.documentElement;
        const width = doc.clientWidth;
        const height = doc.clientHeight;
        super(width, height, Phaser.CANVAS, 'content', null);

        this.state.add('Boot', Boot, true);
        this.state.add('Splash', Splash, false);
        this.state.add('Game', Game, false);
    }
}

new Main();