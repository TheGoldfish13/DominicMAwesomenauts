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
		//this.playerCreepTimerCheck();
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
	},

	// playerCreepTimerCheck: function() {
	// 	if(Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep >= 1000)) { /*on a timer every 10 seconds*/
	// 		this.lastCreep = this.now;
	// 		var creepe = me.pool.pull("PlayerCreep", 1000, 0, {}); /*define what creep is*/
	// 		me.game.world.addChild(creepe, 5); /*and spawn one*/
	// 	}
	// }

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
		me.state.pause(me.state.PLAY); /*set gamestate to play*/
		me.input.bindKey(me.input.KEY.F1, "F1", true); /*binding keys F1-F6*/
		me.input.bindKey(me.input.KEY.F2, "F2", true);
		me.input.bindKey(me.input.KEY.F3, "F3", true);
		me.input.bindKey(me.input.KEY.F4, "F4", true);
		me.input.bindKey(me.input.KEY.F5, "F5", true);
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		this.setBuyText(); /*calls setBuyText function*/
	},

	setBuyText: function() {
		game.data.buytext = new (me.Renderable.extend({ /*adds me.Renderable*/
			init: function() { /*initially make...*/
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				this.font = new me.Font("Comic Sans MS", 28, "white"); /*font is much comic sans, very white*/
				this.updateWhenPaused = true; /*self explanitory*/
				this.alwaysUpdate = true;
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "Press F1-F6 to buy, B to exit. Current Gold: " + game.data.gold, this.pos.x, this.pos.y); /*puts instructions*/
				this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 + " Cost: " + ((game.data.skill1+1)*10), this.pos.x, this.pos.y + 40);
				this.font.draw(renderer.getContext(), "Skill 2: Run Faster. Current Level: " + game.data.skill2 + " Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y + 80);
				this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current level: " + game.data.skill3 + " Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y + 120);
				this.font.draw(renderer.getContext(), "Speed Burst: Press Q to run faster. Current Level: " + game.data.ability1 + " Cost: " + ((game.data.ability1+1)*10), this.pos.x, this.pos.y + 160);
				this.font.draw(renderer.getContext(), "Big Appetite: Press W to eat your creep for health. Current Level: " + game.data.ability2 + " Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "Spear Throw: Press E to throw your spear. Current Level " + game.data.ability3 + " Cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y + 240);
			}	
		}));
	me.game.world.addChild(game.data.buytext, 35);
	},

	stopBuying: function(){
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20); /*returns the players movement*/
		me.game.world.removeChild(game.data.buyscreen); /*gets rid of the buyscreen*/
		me.input.unbindKey(me.input.KEY.F1, "F1", true); /*unbind all the keys*/
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true); 
		me.game.world.removeChild(game.data.buytext); 
	}
});