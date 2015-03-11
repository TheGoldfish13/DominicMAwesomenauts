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

game.SpendGold = Object.extend({ /*make spend gold class*/
	init: function(x, y, settings) { /*that when initially created*/
		this.now = new Date().getTime(); /*updates timers*/
		this.lastBuy = new Date().getTime(); /*keeps track of last buy*/
		this.paused = false; /*isnt paused*/
		this.alwaysUpdate = true; /*always updates*/
		this.updateWhenPaused = true; /*even when paused*/
	},

	update: function() {
		this.now = new Date().getTime(); /*updates timers*/
		if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >= 1000) { /*if b is pressed and it hasnt been a second since last push*/
			this.lastBuy = this.now; /*update timer*/
			if(!this.buying){  /*and you are not buyin*/
				this.startBuying(); /*start buying*/
			}
			else{ /*if you are buying already*/
				this.stopBuying(); /*then stop*/
			}
		}

		return true;
	},

	startBuying: function() {
		this.buying = true; 
		me.state.pause(me.state.PLAY); /*set gamestate to play*/
		game.data.pausePos = me.game.viewport.localToWorld(0, 0); /*keeps track of where the player is*/
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("gold-screen"));
		game.data.buyscreen.updateWhenPaused = true;
		game.data.buyscreen.setOpacity(0.85);
		me.game.world.addChild(game.data.buyscreen, 34);/*adds the buy screen*/
		game.data.player.body.setVelocity(0, 0); /*make the player stop moving*/
	},
	stopBuying: function(){
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20); /*returns the players movement*/
		me.game.world.removeChild(game.data.buyscreen); /*gets rid of the buyscreen*/
	
	}
});