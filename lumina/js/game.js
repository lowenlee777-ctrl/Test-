// game.js — starts the Phaser game.
// Phaser itself is loaded in index.html, so the global "Phaser" is ready here.

import BootScene from './scenes/BootScene.js';
import TitleScene from './scenes/TitleScene.js';

const config = {
  // WebGL is needed for the glow/bloom effects in the summon scene.
  type: Phaser.WEBGL,
  parent: 'game',            // the <div id="game"> in index.html
  backgroundColor: '#0a0c10',

  // The game is designed at 1280 x 720 (16:9).
  // FIT mode scales it up or down to fit desktop and phone screens.
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
  },

  // The first scene in this list starts automatically.
  scene: [BootScene, TitleScene],
};

new Phaser.Game(config);
