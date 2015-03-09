game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); /*loads the title screen*/ // TODO
	
		me.game.world.addChild (new (me.Renderable.extend({ /*adds me.Renderable*/
			init: function() { /*initially make...*/
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				this.font = new me.Font("Comic Sans MS", 46, "pink");
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "Press 1-5 to buy, Enter to skip", this.pos.x, this.pos.y); /*putting start a new game message*/
				this.font.draw(renderer.getContext(), "Current Exp:" + game.data.exp.toString(), this.pos.x + 50, this.pos.y + 50);
				this.font.draw(renderer.getContext(), "1) Make More Gold" + game.data.exp.toString(), this.pos.x + 50, this.pos.y + 100);
				this.font.draw(renderer.getContext(), "2) Add Starting Gold" + game.data.exp.toString(), this.pos.x + 50, this.pos.y + 150);
				this.font.draw(renderer.getContext(), "3) Increase Damage" + game.data.exp.toString(), this.pos.x + 50, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "4) Increase Health" + game.data.exp.toString(), this.pos.x + 50, this.pos.y + 250);
			}	
		})));
	

	},
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});