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
			game.data.gold += 1; /*add one to gold counter*/
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
	},

	update: function() { /*constantly check*/
		if(game.data.win===true) { /*if you've won*/
			game.data.exp += 10;	/*and if so then add 10 exp*/
		}
		else if(game.data.win===false) { /*if you lost*/
			game.data.exp += 1; /*add 1 exp*/
		}
		return true;
	}
});