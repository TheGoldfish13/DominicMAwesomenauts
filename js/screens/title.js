game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); /*loads the title screen*/ // TODO
	
		me.game.world.addChild (new (me.Renderable.extend({ /*adds me.Renderable*/
			init: function() { /*initially make...*/
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				this.font = new me.Font("Comic Sans MS", 46, "pink");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true); /*make it listen for the mouse being clicked on the screen*/
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "Start A New Game", this.pos.x, this.pos.y); /*putting start a new game message*/
			},

			update: function(dt) {
				return true;
			},

			newGame: function() { /*when a new game is started*/
				me.input.releasePointerEvent('pointerdown', this); /*get rid of mouse click event*/
				me.save.remove('exp'); /*and removed experience*/
				me.save.remove('exp1'); /*as well as skills*/
				me.save.remove('exp2');
				me.save.remove('exp3');
				me.save.remove('exp4');
				me.state.change(me.state.PLAY);
			}
		})));
		me.game.world.addChild (new (me.Renderable.extend({ /*adds me.Renderable*/
			init: function() { /*initially make...*/
				this._super(me.Renderable, 'init', [380, 340, 250, 50]);
				this.font = new me.Font("Comic Sans MS", 46, "pink");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true); /*make it listen for the mouse being clicked on the screen*/
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "Continue", this.pos.x, this.pos.y); /*putting continue message*/
			},

			update: function(dt) {
				return true;
			},

			newGame: function() { /*when a new game is started*/
				me.input.releasePointerEvent('pointerdown', this); /*get rid of mouse click event*/
				me.state.change(me.state.PLAY);
			}
		})));

	},
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});
