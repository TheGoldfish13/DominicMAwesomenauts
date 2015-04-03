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