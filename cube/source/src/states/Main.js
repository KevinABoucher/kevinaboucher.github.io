import DayCycle from 'objects/DayCycle';
import Weather from 'objects/Weather';

class Main extends Phaser.State {
	
	create() {
		this.logOffset = 0;

		this.createBackground();
        this.createBoard();
	}

	createBoard() {

		var me = this;

		//me.game.stage.backgroundColor = "34495f";

		me.guessing = false;
		me.currentWord = [];
		me.correctWords = [];

		//Keep track of the users score
		me.score = 0;
		me.scoreBuffer = 0;

		//Keep track fo the round time
		me.remainingTime = 6000;
		me.fullTime = 6000;

		//Declare assets that will be used as tiles
		me.tileLetters = [
			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
			'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
			'w', 'x', 'y', 'z'
		];

		//What colours will be used for our tiles?
		me.tileColors = [
			'#a8bc95'
		];

		//Set the width and height for the tiles
		me.tileWidth = 150;
		me.tileHeight = 150;

		//A buffer for how much of the tile activates a select
		me.selectBuffer = me.tileWidth / 8;

		//This will hold all of the tile sprites
		me.tiles = me.game.add.group();

		//Initialise tile grid, this array will hold the positions of the tiles
		//Create whatever shape you'd like
		me.tileGrid = [
			[null, null, null, null, null, null],
			[null, null, null, null, null, null],
			[null, null, null, null, null, null],
			[null, null, null, null, null, null],
			[null, null, null, 'o', 'u', 's'],
			[null, null, null, 'h', null, 'e']
		];

		//Keep a reference to the total grid width and height
		me.boardWidth = me.tileGrid[0].length * me.tileWidth;
		me.boardHeight = me.tileGrid.length  * me.tileHeight;

		//We want to keep a buffer on the left and top so that the grid
		//can be centered
		me.leftBuffer = (me.game.width - me.boardWidth) / 2;
		me.topBuffer = (me.game.height - me.boardHeight) / 2;

		//Create a random data generator to use later
		var seed = Date.now();
		me.random = new Phaser.RandomDataGenerator([seed]);

		//Set up some initial tiles and the score label
		me.initTiles();
		me.createScore();
		me.createTimer();

		me.game.input.onDown.add(function(){me.guessing = true;}, me);
		me.game.input.onUp.add(function(){me.guessing = false;}, me);

		me.gameTimer = me.game.time.events.loop(100, function(){
			me.updateTimer();
		});
	}

	updateBoard() {

		var me = this;

		if(me.scoreBuffer > 0){
			me.incrementScore();
			me.scoreBuffer--;
		}

		if(me.remainingTime < 1){
			me.game.state.restart();
		}

		if(me.guessing){

			//Get the location of where the pointer is currently
			var hoverX = me.game.input.x;
			var hoverY = me.game.input.y;

			//Figure out what position on the grid that translates to
			var hoverPosX = Math.floor((hoverX - me.leftBuffer)/me.tileWidth);
			var hoverPosY = Math.floor((hoverY - me.topBuffer)/me.tileHeight);

			//Check that we are within the game bounds
			if(hoverPosX >= 0 && hoverPosX < me.tileGrid[0].length && hoverPosY >= 0 && hoverPosY < me.tileGrid.length){

				//Grab the tile being hovered over
				var hoverTile = me.tileGrid[hoverPosX][hoverPosY];

				//Figure out the bounds of the tile
				var tileLeftPosition = me.leftBuffer + (hoverPosX * me.tileWidth);
				var tileRightPosition = me.leftBuffer + (hoverPosX * me.tileWidth) + me.tileWidth;
				var tileTopPosition = me.topBuffer + (hoverPosY * me.tileHeight);
				var tileBottomPosition = me.topBuffer + (hoverPosY * me.tileHeight) + me.tileHeight;

				//If the player is hovering over the tile set it to be active. The buffer is provided here so that the tile is only selected
				//if the player is hovering near the center of the tile
				if(!hoverTile.isActive && hoverX > tileLeftPosition + me.selectBuffer && hoverX < tileRightPosition - me.selectBuffer 
					&& hoverY > tileTopPosition + me.selectBuffer && hoverY < tileBottomPosition - me.selectBuffer){

					//Set the tile to be active
					hoverTile.isActive = true;
				    hoverTile.tint = 177215;
				  
					//Push this tile into the current word that is being built
					me.currentWord.push(hoverTile);

					// log current letter / word
					console.log(hoverTile.tileLetter);
				}
			}
		}
		else {

			if(me.currentWord.length > 0){

				var guessedWord = '';

				//Build a string out of all of the active tiles
				for(var i = 0; i < me.currentWord.length; i++){
					guessedWord += me.currentWord[i].tileLetter;
					me.currentWord[i].isActive = false;
					me.currentWord[i].tint = 16777215;
				}

				//Check to see if this word exists in our dictionary
				if(me.game.cache.getText('dictionary').indexOf(' ' + guessedWord + ' ') > -1 && guessedWord.length > 1){
					
					//Check to see that the word has not already been guessed
					if(me.correctWords.indexOf(guessedWord) == -1){

						console.log("correct!");
						this.wordLabel.addColor('#00FF00', 0);
						this.wordLabel.text = guessedWord; 
						this.logWord(guessedWord);
						me.scoreBuffer += 10 * guessedWord.length;

						//Add this word to the already guessed word
						me.correctWords.push(guessedWord);
					} 
				} 
				else {
					console.log("incorrect!");
					var style = {font: "100px Arial", fill: "#FF0000", stroke: "#535353", strokeThickness: 15};
					this.wordLabel.addColor('#FF0000', 0);
					this.wordLabel.text = guessedWord;
				}

				//Reset the current word
				me.currentWord = [];

			}

		}

	}

	initTiles() {
		//Loop through each column in the grid
		for(var i = 0; i < this.tileGrid.length; i++){

			//Loop through each position in a specific column, starting from the top
			for(var j = 0; j < this.tileGrid.length; j++){

				//Add the tile to the game at this grid position
				var tile = this.addTile(i, j);

				//Keep a track of the tiles position in our tileGrid
				this.tileGrid[i][j] = tile;
			}
		}
	}

	addTile(x, y) {
		//Choose a random tile to add
		var tileLetter = this.tileGrid[x][y];
		if (tileLetter === null) {
	    	tileLetter = this.tileLetters[this.random.integerInRange(0, this.tileLetters.length - 1)];
		}
		var tileColor = this.tileColors[this.random.integerInRange(0, this.tileColors.length - 1)];
		var tileToAdd = this.createTile(tileLetter, tileColor);	

		//Add the tile at the correct x position, but add it to the top of the game (so we can slide it in)
		var tile = this.tiles.create(this.leftBuffer + (x * this.tileWidth) + this.tileWidth / 2, 0, tileToAdd);

		//Animate the tile into the correct vertical position
		this.game.add.tween(tile).to({y:this.topBuffer + (y*this.tileHeight+(this.tileHeight/2))}, 500, Phaser.Easing.Linear.In, true)

		//Set the tiles anchor point to the center
		tile.anchor.setTo(0.5, 0.5);

		//Keep track of the type of tile that was added
		tile.tileLetter = tileLetter;

		return tile;
	}

	createTile(letter, color) {
		var tile = this.game.add.bitmapData(this.tileWidth, this.tileHeight);

		tile.ctx.rect(5, 5, this.tileWidth - 5, this.tileHeight - 5);
		tile.ctx.fillStyle = color;
		tile.ctx.fill();

		tile.ctx.font = '60px Arial';
		tile.ctx.weight = 'bold';
		tile.ctx.textAlign = 'center';
		tile.ctx.textBaseline = 'middle';
		tile.ctx.fillStyle = '#fff';
		if(color == '#ffffff'){
			tile.ctx.fillStyle = '#000000';
		}
		tile.ctx.fillText(letter, this.tileWidth / 2, this.tileHeight / 2);

		return tile;
	}

	createScore() {
		var style = {font: "100px Arial", align: "center", fill: "#ffffff", stroke: "#535353", strokeThickness: 15};
		this.scoreLabel = this.game.add.text(this.game.world.centerX, this.topBuffer + 10 + this.tileGrid.length * this.tileHeight, "0", style); 
		this.scoreLabel.anchor.setTo(0.5, 0);

		this.wordLabel = this.game.add.text(this.game.world.centerX, this.topBuffer - 140, "", style); 
		this.wordLabel.anchor.setTo(0.5, 0);
	}

	logWord(correctWord) {
		var style = {font: "38px Arial", align: "left", fill: "#ffffff", stroke: "#535353", strokeThickness: 2};
		this.worldLog = this.game.add.text(this.game.world.centerX + this.tileGrid.length * (this.tileWidth / 2) + 60, this.topBuffer + 40 + this.logOffset, correctWord, style); 
		this.worldLog.anchor.setTo(0.5, 0);
		this.logOffset += 40;
	}

	incrementScore() {
		this.score += 1;   
		this.scoreLabel.text = this.score; 		
	}

	createTimer() {
		this.timeBar = this.game.add.bitmapData(this.game.width, 50);

		//make white and have a blue background
		this.timeBar.ctx.rect(0, 0, this.game.width, 50);
		this.timeBar.ctx.fillStyle = '#4c7227';
		this.timeBar.ctx.fill();

		this.timeBar = this.game.add.sprite(0, 0, this.timeBar);
		this.timeBar.cropEnabled = true;
	}

	updateTimer() {
		this.remainingTime -= 10;
		var cropRect = new Phaser.Rectangle(0, 0, (this.remainingTime / this.fullTime) * this.game.width, this.timeBar.height);
		this.timeBar.crop(cropRect);
	}

	update() {
		this.mountainsBack.tilePosition.x -= 0.05;
		this.mountainsMid1.tilePosition.x -= 0.3;
		this.mountainsMid2.tilePosition.x -= 0.75;	
		
		this.updateBoard();
	}

	createBackground() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.stage.backgroundColor = '#000';

		this.dayCycle = new DayCycle(this.game, 120000);
		this.weather = new Weather(this.game);

		let bgBitMap = this.game.add.bitmapData(this.game.width, this.game.height);

		bgBitMap.ctx.rect(0, 0, this.game.width, this.game.height);
		bgBitMap.ctx.fillStyle = '#b2ddc8';
		bgBitMap.ctx.fill();

		this.backgroundSprite = this.game.add.sprite(0, 0, bgBitMap);

		this.sunSprite = this.game.add.sprite(50, -250, 'sun');
		this.moonSprite = this.game.add.sprite(this.game.width - (this.game.width / 4), this.game.height + 500, 'moon');

		this.mountainsBack = this.game.add.tileSprite(0, 
			this.game.height - this.game.cache.getImage('mountains-back').height, 
			this.game.width, 
			this.game.cache.getImage('mountains-back').height, 
			'mountains-back'
		);

		this.mountainsMid1 = this.game.add.tileSprite(0, 
			this.game.height - this.game.cache.getImage('mountains-mid1').height, 
			this.game.width, 
			this.game.cache.getImage('mountains-mid1').height, 
			'mountains-mid1'
		);

		this.mountainsMid2 = this.game.add.tileSprite(0, 
			this.game.height - this.game.cache.getImage('mountains-mid2').height, 
			this.game.width, 
			this.game.cache.getImage('mountains-mid2').height, 
			'mountains-mid2'
		);

		let backgroundSprites = [
			{sprite: this.backgroundSprite, from: 0x1f2a27, to: 0xB2DDC8},
			{sprite: this.mountainsBack, from: 0x2f403b, to: 0x96CCBB},
			{sprite: this.mountainsMid1, from: 0x283632, to: 0x8BBCAC},
			{sprite: this.mountainsMid2, from: 0x202b28, to: 0x82AD9D}
		];

		this.dayCycle.initShading(backgroundSprites);
		this.dayCycle.initSun(this.sunSprite);
		this.dayCycle.initMoon(this.moonSprite);

		//this.weather.addFog();
		this.weather.addRain();
	}
}

export default Main;
