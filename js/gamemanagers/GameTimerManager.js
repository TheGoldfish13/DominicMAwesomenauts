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
			game.data.gold += (10 + 1); /*add one to gold counter*/
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