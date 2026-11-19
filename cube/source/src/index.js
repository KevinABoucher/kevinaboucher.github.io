import Boot from 'states/Boot';
import Preload from 'states/Preload';
import GameTitle from 'states/GameTitle';
import Main from 'states/Main';
import GameOver from 'states/GameOver';

// The original desktop stage uses device pixels, but the board is always
// 900 x 900 logical pixels. A fixed handheld stage keeps that board legible
// and lets Phaser scale rendering and pointers together, even on rotation.
const handheld = window.matchMedia(
  '(max-width: 600px), (max-width: 1000px) and (max-height: 600px)'
).matches;
if (handheld) document.getElementById('cube-game').classList.add('cube-handheld');

class Game extends Phaser.Game {

	constructor() {

		super(
      handheld ? 990 : window.innerWidth * window.devicePixelRatio,
      handheld ? 1450 : window.innerHeight * window.devicePixelRatio,
      Phaser.AUTO,
      'cube-game'
    );
    this.handheldLayout = handheld;

		this.state.add('Boot', Boot, false);
		this.state.add('Preload', Preload, false);
		this.state.add('GameTitle', GameTitle, false);
		this.state.add('Main', Main, false);
		this.state.add('GameOver', GameOver, false);

		this.state.start('Boot');
	}

}

new Game();