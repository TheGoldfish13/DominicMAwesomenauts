game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
		/*this loads our level*/
		me.levelDirector.loadLevel("level01");

		var player = me.pool.pull("player", 0, 420, {}); /*defines what player is and where it will spawn*/

		me.game.world.addChild(player, 5); /*spawns the player*/

		/*------Adding Controls------*/

		me.input.bindKey(me.input.KEY.RIGHT, "right"); /*adds the control for right*/
		me.input.bindKey(me.input.KEY.LEFT, "left"); /*adds input for right*/
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
	}
});
