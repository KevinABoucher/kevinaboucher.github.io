class Preload extends Phaser.State {

	preload() {
		this.game.load.image('mountains-back', 'assets/mountains-back.png');
		this.game.load.image('mountains-mid1', 'assets/mountains-mid1.png');
		this.game.load.image('mountains-mid2', 'assets/mountains-mid2.png');
		this.game.load.image('sun', 'assets/sun.png');
		this.game.load.image('moon', 'assets/moon.png');

		this.game.load.text('dictionary', 'assets/dictionary.txt');
	}

	create() {
		this.game.state.start("Main");
	}

	init () {
		var loadingStyle = {
			font: "32px Arial",
			fill: "#ffffff",
			align: "center" 
		};

		this.text = this.add.text(this.game.world.centerX, this.game.world.centerY, "Loading: 0%", loadingStyle);
		this.text.anchor.x = 0.5;
	}

	fileLoaded (progress) {
		this.text.text = "Loading: " + progress + "%";
	}
}

export default Preload;
