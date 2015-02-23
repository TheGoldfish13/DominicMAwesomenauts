game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
		/*this loads our level*/
		me.levelDirector.loadLevel("level01");
		this.resetPlayer(0,420);

		var gamemanager = me.pool.pull("GameManager", 0, 0, {});
		me.game.world.addChild(gamemanager, 5);

		/*------Adding Controls------*/

		me.input.bindKey(me.input.KEY.RIGHT, "right"); /*adds the control for right*/
		me.input.bindKey(me.input.KEY.LEFT, "left"); /*adds input for right*/
		me.input.bindKey(me.input.KEY.UP, "jump"); /*adds input for jump*/
		me.input.bindKey(me.input.KEY.SPACE, "attack"); /*adds input for attack*/

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},

	resetPlayer: function(x, y) {
		game.data.player = me.pool.pull("player", x, y, {}); /*defines what player is and where it will spawn*/
		me.game.world.addChild(game.data.player, 5); /*spawns the player*/
	}
});
