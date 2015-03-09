game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); /*loads the title screen*/ // TODO
	
		me.game.world.addChild (new (me.Renderable.extend({ /*adds me.Renderable*/
			init: function() { /*initially make...*/
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				this.font = new me.Font("Comic Sans MS", 46, "pink");
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "Spend", this.pos.x, this.pos.y); /*putting start a new game message*/
			}
		})));
	

	},
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});