game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); /*loads the title screen*/ // TODO
	
		me.input.bindKey(me.input.KEY.ENTER, "start"); /*binds the enter key to start*/
		me.game.world.addChild (new (me.Renderable.extend({ /*adds me.Renderable*/
			init: function() { /*initially make...*/
				this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
				this.font = new me.Font("Comic Sans MS", 46, "pink")
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "Awesomenauts", 450, 130); /*putting awesomenauts on (450,130)*/
				this.font.draw(renderer.getContext(), "Press ENTER to play", 250, 530); /*puts the message at (250, 530)*/
			}
		})));

		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) { /*checing if keydown has been pressed*/
			if(action === "start") { /*if start is pressed*/
				me.state.change(me.state.PLAY) /*play the game*/
			}
		});

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER); // TODO
		me.event.unsubscribe(this.handler);
	}
});
