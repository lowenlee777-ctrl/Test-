// TitleScene — the first screen the player sees (placeholder for now).

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    const { width, height } = this.scale;

    // Game title
    this.add.text(width / 2, height / 2 - 40, 'LAST SIGNAL', {
      fontFamily: 'Segoe UI, sans-serif',
      fontSize: '72px',
      color: '#e6e6e6',
    }).setOrigin(0.5);

    // A blinking "tap to start" hint
    const hint = this.add.text(width / 2, height / 2 + 60, 'Tap to start', {
      fontFamily: 'Segoe UI, sans-serif',
      fontSize: '24px',
      color: '#4fd1ff',
    }).setOrigin(0.5);

    // Tween = a smooth animation. This fades the hint in and out forever.
    this.tweens.add({
      targets: hint,
      alpha: 0.2,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    // Later: tapping will go to the WorldMapScene.
    this.input.once('pointerdown', () => {
      hint.setText('World map coming soon');
    });
  }
}
