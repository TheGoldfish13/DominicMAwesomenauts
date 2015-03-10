game.GameTimerManager = Object.extend({
	init: function(x, y, settings) { 
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
	},

	update: function() {
		this.now = new Date().getTime();

		this.goldTimerCheck(); /*code refactoring to increase orginaztion*/
		this.creepTimerCheck();
		return true;
	},
	goldTimerCheck: function() {
		if(Math.round(this.now/1000)%20 === 0 && (this.now - this.lastCreep >= 1000)) { /*on a timer every 20 seconds*/
			game.data.gold += (game.data.exp1 + 1); /*add one to gold counter*/
			console.log("Current Glod: " + game.data.gold); /*and print the current cold to the console*/
		}
	},

	creepTimerCheck: function() {
		if(Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep >= 1000)) { /*on a timer every 10 seconds*/
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {}); /*define what creep is*/
			me.game.world.addChild(creepe, 5); /*and spawn one*/
		}
	}
});

game.HeroDeathManager = Object.extend({
	init: function(x, y, settings) {
		this.alwaysUpdate = true; 
	},

	update: function() {
		if(game.data.player.dead) { /*if the player is dead (has less than 0 health)*/
			me.game.world.removeChild(game.data.player); /*remove the player*/
			me.state.current().resetPlayer(10, 0); /*and respawn it*/
		}
		return true;
	}

});

game.ExperienceManager = Object.extend({
	init: function(x, y, settings) { 
		this.alwaysUpdate = true; /*always update*/
		this.gameover = false;
	},

	update: function() { /*constantly check*/
		if(game.data.win===true && !this.gameover) { /*if you've won and game over is false (either you lost or won)*/
			this.gameOver(true); /*run gameOver*/
		}
		else if(game.data.win===false && !this.gameover) { /*if you lost and gameOver is false*/
			this.gameOver(false); /*run gameOver*/
		}

		return true;
	},

	gameOver: function(win) {
		if(win) { /*if you've won*/
			game.data.exp += 10;	/*if so then add 10 exp*/
		}
		else {/*if you lost*/
			game.data.exp += 1; /*add 1 exp*/
		}
		/*regardless of winning or losing*/
		this.gameover = true; /*and end the game*/
		me.save.exp = game.data.exp; /*and save exp*/
	}

});