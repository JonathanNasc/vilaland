export class Boot extends Phaser.State {
    init() {
        this.stage.backgroundColor = '#000'
    }

    preload() {
        this.load.image('loaderBg', './assets/loaders/default-bg.png');
        this.load.image('loaderBar', './assets/loaders/default-bar.png');
    }

    render() {
        this.state.start('Splash');
    }
}