// BootScene — loads files before the game starts and shows a loading bar.

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Draw a simple loading bar in the middle of the screen.
    const { width, height } = this.scale;
    const barWidth = 400;
    const bar = this.add.rectangle(width / 2 - barWidth / 2, height / 2, 0, 12, 0x4fd1ff).setOrigin(0, 0.5);
    this.add.rectangle(width / 2, height / 2, barWidth, 12).setStrokeStyle(1, 0x4fd1ff);

    // Phaser calls this while files load. "value" goes from 0 to 1.
    this.load.on('progress', (value) => {
      bar.width = barWidth * value;
    });

    // Load the quiz questions. Later we add sprites, audio and other JSON here.
    this.load.json('questions', 'data/questions.json');
  }

  create() {
    // Everything is loaded — go to the title screen.
    this.scene.start('TitleScene');
  }
}
