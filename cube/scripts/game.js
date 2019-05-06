(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _statesBoot = require('states/Boot');

var _statesBoot2 = _interopRequireDefault(_statesBoot);

var _statesPreload = require('states/Preload');

var _statesPreload2 = _interopRequireDefault(_statesPreload);

var _statesGameTitle = require('states/GameTitle');

var _statesGameTitle2 = _interopRequireDefault(_statesGameTitle);

var _statesMain = require('states/Main');

var _statesMain2 = _interopRequireDefault(_statesMain);

var _statesGameOver = require('states/GameOver');

var _statesGameOver2 = _interopRequireDefault(_statesGameOver);

var Game = (function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		_get(Object.getPrototypeOf(Game.prototype), 'constructor', this).call(this, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO);

		this.state.add('Boot', _statesBoot2['default'], false);
		this.state.add('Preload', _statesPreload2['default'], false);
		this.state.add('GameTitle', _statesGameTitle2['default'], false);
		this.state.add('Main', _statesMain2['default'], false);
		this.state.add('GameOver', _statesGameOver2['default'], false);

		this.state.start('Boot');
	}

	return Game;
})(Phaser.Game);

new Game();

},{"states/Boot":4,"states/GameOver":5,"states/GameTitle":6,"states/Main":7,"states/Preload":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DayCycle = (function () {
	function DayCycle(game, dayLength) {
		_classCallCheck(this, DayCycle);

		this.game = game;
		this.dayLength = dayLength;
		this.shading = false;
		this.sunSprite = false;
		this.moonSprite = false;
	}

	_createClass(DayCycle, [{
		key: "initSun",
		value: function initSun(sprite) {
			this.sunSprite = sprite;
			this.sunset(sprite);
		}
	}, {
		key: "initMoon",
		value: function initMoon(sprite) {
			this.moonSprite = sprite;
			this.moonrise(sprite);
		}
	}, {
		key: "initShading",
		value: function initShading(sprites) {
			this.shading = sprites;
		}
	}, {
		key: "sunrise",
		value: function sunrise(sprite) {
			var _this = this;

			sprite.position.x = this.game.width - this.game.width / 4;

			this.sunTween = this.game.add.tween(sprite).to({ y: -250 }, this.dayLength, null, true);
			this.sunTween.onComplete.add(this.sunset, this);

			if (this.shading) {
				this.shading.forEach(function (sprite) {
					_this.tweenTint(sprite.sprite, sprite.from, sprite.to, _this.dayLength);
				});
			}
		}
	}, {
		key: "sunset",
		value: function sunset(sprite) {
			var _this2 = this;

			sprite.position.x = 50;

			this.sunTween = this.game.add.tween(sprite).to({ y: this.game.world.height }, this.dayLength, null, true);
			this.sunTween.onComplete.add(this.sunrise, this);

			if (this.shading) {
				this.shading.forEach(function (sprite) {
					_this2.tweenTint(sprite.sprite, sprite.to, sprite.from, _this2.dayLength);
				});
			}
		}
	}, {
		key: "moonrise",
		value: function moonrise(sprite) {

			sprite.position.x = this.game.width - this.game.width / 4;

			this.moonTween = this.game.add.tween(sprite).to({ y: -350 }, this.dayLength, null, true);
			this.moonTween.onComplete.add(this.moonset, this);
		}
	}, {
		key: "moonset",
		value: function moonset(sprite) {

			sprite.position.x = 50;

			this.moonTween = this.game.add.tween(sprite).to({ y: this.game.world.height }, this.dayLength, null, true);
			this.moonTween.onComplete.add(this.moonrise, this);
		}
	}, {
		key: "tweenTint",
		value: function tweenTint(spriteToTween, startColor, endColor, duration) {

			var colorBlend = { step: 0 };

			this.game.add.tween(colorBlend).to({ step: 100 }, duration, Phaser.Easing.Default, false).onUpdateCallback(function () {
				spriteToTween.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step, 1);
			}).start();
		}
	}]);

	return DayCycle;
})();

exports["default"] = DayCycle;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Weather = (function () {
	function Weather(game) {
		_classCallCheck(this, Weather);

		this.game = game;
	}

	_createClass(Weather, [{
		key: 'addFog',
		value: function addFog() {

			var fog = this.game.add.bitmapData(this.game.width, this.game.height);

			fog.ctx.rect(0, 0, this.game.width, this.game.height);
			fog.ctx.fillStyle = '#b2ddc8';
			fog.ctx.fill();

			this.fogSprite = this.game.add.sprite(0, 0, fog);

			this.fogSprite.alpha = 0;
			this.game.add.tween(this.fogSprite).to({ alpha: 0.7 }, 6000, null, true);
		}
	}, {
		key: 'removeFog',
		value: function removeFog() {
			var _this = this;

			var fogTween = this.game.add.tween(this.fogSprite).to({ alpha: 0 }, 6000, null, true);
			fogTween.onComplete.add(function () {
				_this.fogSprite.kill();
			}, this);
		}
	}, {
		key: 'addRain',
		value: function addRain() {

			var rainParticle = this.game.add.bitmapData(15, 50);

			rainParticle.ctx.rect(0, 0, 15, 50);
			rainParticle.ctx.fillStyle = '#9cc9de';
			rainParticle.ctx.fill();

			this.emitter = this.game.add.emitter(this.game.world.centerX, -300, 400);

			this.emitter.width = this.game.world.width;
			this.emitter.angle = 10;

			this.emitter.makeParticles(rainParticle);

			this.emitter.minParticleScale = 0.1;
			this.emitter.maxParticleScale = 0.3;

			this.emitter.setYSpeed(600, 1000);
			this.emitter.setXSpeed(-5, 5);

			this.emitter.minRotation = 0;
			this.emitter.maxRotation = 0;

			this.emitter.start(false, 1600, 5, 0);
		}
	}, {
		key: 'removeRain',
		value: function removeRain() {
			this.emitter.kill();
		}
	}]);

	return Weather;
})();

exports['default'] = Weather;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Boot = (function (_Phaser$State) {
	_inherits(Boot, _Phaser$State);

	function Boot() {
		_classCallCheck(this, Boot);

		_get(Object.getPrototypeOf(Boot.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(Boot, [{
		key: "preload",
		value: function preload() {}
	}, {
		key: "create",
		value: function create() {
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.game.state.start("Preload");
		}
	}]);

	return Boot;
})(Phaser.State);

exports["default"] = Boot;
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameOver = (function (_Phaser$State) {
	_inherits(GameOver, _Phaser$State);

	function GameOver() {
		_classCallCheck(this, GameOver);

		_get(Object.getPrototypeOf(GameOver.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(GameOver, [{
		key: "create",
		value: function create() {}
	}, {
		key: "restartGame",
		value: function restartGame() {
			this.game.state.start("Main");
		}
	}]);

	return GameOver;
})(Phaser.State);

exports["default"] = GameOver;
module.exports = exports["default"];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameTitle = (function (_Phaser$State) {
	_inherits(GameTitle, _Phaser$State);

	function GameTitle() {
		_classCallCheck(this, GameTitle);

		_get(Object.getPrototypeOf(GameTitle.prototype), "constructor", this).apply(this, arguments);
	}

	_createClass(GameTitle, [{
		key: "create",
		value: function create() {}
	}, {
		key: "startGame",
		value: function startGame() {
			this.game.state.start("Main");
		}
	}]);

	return GameTitle;
})(Phaser.State);

exports["default"] = GameTitle;
module.exports = exports["default"];

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _objectsDayCycle = require('objects/DayCycle');

var _objectsDayCycle2 = _interopRequireDefault(_objectsDayCycle);

var _objectsWeather = require('objects/Weather');

var _objectsWeather2 = _interopRequireDefault(_objectsWeather);

var Main = (function (_Phaser$State) {
	_inherits(Main, _Phaser$State);

	function Main() {
		_classCallCheck(this, Main);

		_get(Object.getPrototypeOf(Main.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Main, [{
		key: 'create',
		value: function create() {
			this.logOffset = 0;

			this.createBackground();
			this.createBoard();
		}
	}, {
		key: 'createBoard',
		value: function createBoard() {

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
			me.tileLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

			//What colours will be used for our tiles?
			me.tileColors = ['#a8bc95'];

			//Set the width and height for the tiles
			me.tileWidth = 150;
			me.tileHeight = 150;

			//A buffer for how much of the tile activates a select
			me.selectBuffer = me.tileWidth / 8;

			//This will hold all of the tile sprites
			me.tiles = me.game.add.group();

			//Initialise tile grid, this array will hold the positions of the tiles
			//Create whatever shape you'd like
			me.tileGrid = [[null, null, null, null, null, null], [null, null, null, null, null, null], [null, null, null, null, null, null], [null, null, null, null, null, null], [null, null, null, 'o', 'u', 's'], [null, null, null, 'h', null, 'e']];

			//Keep a reference to the total grid width and height
			me.boardWidth = me.tileGrid[0].length * me.tileWidth;
			me.boardHeight = me.tileGrid.length * me.tileHeight;

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
			// me.createTimer();

			me.game.input.onDown.add(function () {
				me.guessing = true;
			}, me);
			me.game.input.onUp.add(function () {
				me.guessing = false;
			}, me);

			// me.gameTimer = me.game.time.events.loop(100, function(){
			// 	me.updateTimer();
			// });
		}
	}, {
		key: 'updateBoard',
		value: function updateBoard() {

			var me = this;

			if (me.scoreBuffer > 0) {
				me.incrementScore();
				me.scoreBuffer--;
			}

			if (me.remainingTime < 1) {
				me.game.state.restart();
			}

			if (me.guessing) {

				//Get the location of where the pointer is currently
				var hoverX = me.game.input.x;
				var hoverY = me.game.input.y;

				//Figure out what position on the grid that translates to
				var hoverPosX = Math.floor((hoverX - me.leftBuffer) / me.tileWidth);
				var hoverPosY = Math.floor((hoverY - me.topBuffer) / me.tileHeight);

				//Check that we are within the game bounds
				if (hoverPosX >= 0 && hoverPosX < me.tileGrid[0].length && hoverPosY >= 0 && hoverPosY < me.tileGrid.length) {

					//Grab the tile being hovered over
					var hoverTile = me.tileGrid[hoverPosX][hoverPosY];

					//Figure out the bounds of the tile
					var tileLeftPosition = me.leftBuffer + hoverPosX * me.tileWidth;
					var tileRightPosition = me.leftBuffer + hoverPosX * me.tileWidth + me.tileWidth;
					var tileTopPosition = me.topBuffer + hoverPosY * me.tileHeight;
					var tileBottomPosition = me.topBuffer + hoverPosY * me.tileHeight + me.tileHeight;

					//If the player is hovering over the tile set it to be active. The buffer is provided here so that the tile is only selected
					//if the player is hovering near the center of the tile
					if (!hoverTile.isActive && hoverX > tileLeftPosition + me.selectBuffer && hoverX < tileRightPosition - me.selectBuffer && hoverY > tileTopPosition + me.selectBuffer && hoverY < tileBottomPosition - me.selectBuffer) {

						//Set the tile to be active
						hoverTile.isActive = true;
						hoverTile.tint = 177215;

						//Push this tile into the current word that is being built
						me.currentWord.push(hoverTile);

						// log current letter / word
						console.log(hoverTile.tileLetter);
					}
				}
			} else {

				if (me.currentWord.length > 0) {

					var guessedWord = '';

					//Build a string out of all of the active tiles
					for (var i = 0; i < me.currentWord.length; i++) {
						guessedWord += me.currentWord[i].tileLetter;
						me.currentWord[i].isActive = false;
						me.currentWord[i].tint = 16777215;
					}

					//Check to see if this word exists in our dictionary
					if (me.game.cache.getText('dictionary').indexOf(' ' + guessedWord + ' ') > -1 && guessedWord.length > 1) {

						//Check to see that the word has not already been guessed
						if (me.correctWords.indexOf(guessedWord) == -1) {

							console.log("correct!");
							this.wordLabel.addColor('#00FF00', 0);
							this.wordLabel.text = guessedWord;
							this.logWord(guessedWord);
							me.scoreBuffer += 10 * guessedWord.length;

							//Add this word to the already guessed word
							me.correctWords.push(guessedWord);
						}
					} else {
						console.log("incorrect!");
						var style = { font: "100px Arial", fill: "#FF0000", stroke: "#535353", strokeThickness: 15 };
						this.wordLabel.addColor('#FF0000', 0);
						this.wordLabel.text = guessedWord;
					}

					//Reset the current word
					me.currentWord = [];
				}
			}
		}
	}, {
		key: 'initTiles',
		value: function initTiles() {
			//Loop through each column in the grid
			for (var i = 0; i < this.tileGrid.length; i++) {

				//Loop through each position in a specific column, starting from the top
				for (var j = 0; j < this.tileGrid.length; j++) {

					//Add the tile to the game at this grid position
					var tile = this.addTile(i, j);

					//Keep a track of the tiles position in our tileGrid
					this.tileGrid[i][j] = tile;
				}
			}
		}
	}, {
		key: 'addTile',
		value: function addTile(x, y) {
			//Choose a random tile to add
			var tileLetter = this.tileGrid[x][y];
			if (tileLetter === null) {
				tileLetter = this.tileLetters[this.random.integerInRange(0, this.tileLetters.length - 1)];
			}
			var tileColor = this.tileColors[this.random.integerInRange(0, this.tileColors.length - 1)];
			var tileToAdd = this.createTile(tileLetter, tileColor);

			//Add the tile at the correct x position, but add it to the top of the game (so we can slide it in)
			var tile = this.tiles.create(this.leftBuffer + x * this.tileWidth + this.tileWidth / 2, 0, tileToAdd);

			//Animate the tile into the correct vertical position
			this.game.add.tween(tile).to({ y: this.topBuffer + (y * this.tileHeight + this.tileHeight / 2) }, 500, Phaser.Easing.Linear.In, true);

			//Set the tiles anchor point to the center
			tile.anchor.setTo(0.5, 0.5);

			//Keep track of the type of tile that was added
			tile.tileLetter = tileLetter;

			return tile;
		}
	}, {
		key: 'createTile',
		value: function createTile(letter, color) {
			var tile = this.game.add.bitmapData(this.tileWidth, this.tileHeight);

			tile.ctx.rect(5, 5, this.tileWidth - 5, this.tileHeight - 5);
			tile.ctx.fillStyle = color;
			tile.ctx.fill();

			tile.ctx.font = '60px Arial';
			tile.ctx.weight = 'bold';
			tile.ctx.textAlign = 'center';
			tile.ctx.textBaseline = 'middle';
			tile.ctx.fillStyle = '#fff';
			if (color == '#ffffff') {
				tile.ctx.fillStyle = '#000000';
			}
			tile.ctx.fillText(letter, this.tileWidth / 2, this.tileHeight / 2);

			return tile;
		}
	}, {
		key: 'createScore',
		value: function createScore() {
			var style = { font: "100px Arial", align: "center", fill: "#ffffff", stroke: "#535353", strokeThickness: 15 };
			this.scoreLabel = this.game.add.text(this.game.world.centerX, this.topBuffer + 10 + this.tileGrid.length * this.tileHeight, "0", style);
			this.scoreLabel.anchor.setTo(0.5, 0);

			this.wordLabel = this.game.add.text(this.game.world.centerX, this.topBuffer - 140, "", style);
			this.wordLabel.anchor.setTo(0.5, 0);
		}
	}, {
		key: 'logWord',
		value: function logWord(correctWord) {
			var style = { font: "38px Arial", align: "left", fill: "#ffffff", stroke: "#535353", strokeThickness: 2 };
			this.worldLog = this.game.add.text(this.game.world.centerX + this.tileGrid.length * (this.tileWidth / 2) + 60, this.topBuffer + 40 + this.logOffset, correctWord, style);
			this.worldLog.anchor.setTo(0.5, 0);
			this.logOffset += 40;
		}
	}, {
		key: 'incrementScore',
		value: function incrementScore() {
			this.score += 1;
			this.scoreLabel.text = this.score;
		}
	}, {
		key: 'createTimer',
		value: function createTimer() {
			this.timeBar = this.game.add.bitmapData(this.game.width, 50);

			//make white and have a blue background
			this.timeBar.ctx.rect(0, 0, this.game.width, 50);
			this.timeBar.ctx.fillStyle = '#4c7227';
			this.timeBar.ctx.fill();

			this.timeBar = this.game.add.sprite(0, 0, this.timeBar);
			this.timeBar.cropEnabled = true;
		}
	}, {
		key: 'updateTimer',
		value: function updateTimer() {
			this.remainingTime -= 10;
			var cropRect = new Phaser.Rectangle(0, 0, this.remainingTime / this.fullTime * this.game.width, this.timeBar.height);
			this.timeBar.crop(cropRect);
		}
	}, {
		key: 'update',
		value: function update() {
			this.mountainsBack.tilePosition.x -= 0.05;
			this.mountainsMid1.tilePosition.x -= 0.3;
			this.mountainsMid2.tilePosition.x -= 0.75;

			this.updateBoard();
		}
	}, {
		key: 'createBackground',
		value: function createBackground() {
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			this.game.stage.backgroundColor = '#000';

			this.dayCycle = new _objectsDayCycle2['default'](this.game, 120000);
			this.weather = new _objectsWeather2['default'](this.game);

			var bgBitMap = this.game.add.bitmapData(this.game.width, this.game.height);

			bgBitMap.ctx.rect(0, 0, this.game.width, this.game.height);
			bgBitMap.ctx.fillStyle = '#b2ddc8';
			bgBitMap.ctx.fill();

			this.backgroundSprite = this.game.add.sprite(0, 0, bgBitMap);

			this.sunSprite = this.game.add.sprite(50, -250, 'sun');
			this.moonSprite = this.game.add.sprite(this.game.width - this.game.width / 4, this.game.height + 500, 'moon');

			this.mountainsBack = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-back').height, this.game.width, this.game.cache.getImage('mountains-back').height, 'mountains-back');

			this.mountainsMid1 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid1').height, this.game.width, this.game.cache.getImage('mountains-mid1').height, 'mountains-mid1');

			this.mountainsMid2 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid2').height, this.game.width, this.game.cache.getImage('mountains-mid2').height, 'mountains-mid2');

			var backgroundSprites = [{ sprite: this.backgroundSprite, from: 0x1f2a27, to: 0xB2DDC8 }, { sprite: this.mountainsBack, from: 0x2f403b, to: 0x96CCBB }, { sprite: this.mountainsMid1, from: 0x283632, to: 0x8BBCAC }, { sprite: this.mountainsMid2, from: 0x202b28, to: 0x82AD9D }];

			this.dayCycle.initShading(backgroundSprites);
			this.dayCycle.initSun(this.sunSprite);
			this.dayCycle.initMoon(this.moonSprite);

			//this.weather.addFog();
			this.weather.addRain();
		}
	}]);

	return Main;
})(Phaser.State);

exports['default'] = Main;
module.exports = exports['default'];

},{"objects/DayCycle":2,"objects/Weather":3}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preload = (function (_Phaser$State) {
	_inherits(Preload, _Phaser$State);

	function Preload() {
		_classCallCheck(this, Preload);

		_get(Object.getPrototypeOf(Preload.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Preload, [{
		key: 'preload',
		value: function preload() {
			this.game.load.image('mountains-back', 'assets/mountains-back.png');
			this.game.load.image('mountains-mid1', 'assets/mountains-mid1.png');
			this.game.load.image('mountains-mid2', 'assets/mountains-mid2.png');
			this.game.load.image('sun', 'assets/sun.png');
			this.game.load.image('moon', 'assets/moon.png');

			this.game.load.text('dictionary', 'assets/dictionary.txt');
		}
	}, {
		key: 'create',
		value: function create() {
			this.game.state.start("Main");
		}
	}, {
		key: 'init',
		value: function init() {
			var loadingStyle = {
				font: "32px Arial",
				fill: "#ffffff",
				align: "center"
			};

			this.text = this.add.text(this.game.world.centerX, this.game.world.centerY, "Loading: 0%", loadingStyle);
			this.text.anchor.x = 0.5;
		}
	}, {
		key: 'fileLoaded',
		value: function fileLoaded(progress) {
			this.text.text = "Loading: " + progress + "%";
		}
	}]);

	return Preload;
})(Phaser.State);

exports['default'] = Preload;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=game.js.map
