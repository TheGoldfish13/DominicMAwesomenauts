game.LoadProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); /*adds the load-screen background. -10 is its layer*/
		document.getElementById("input").style.visibility = "visible";
		document.getElementById("load").style.visibility = "visible";


		me.input.unbindKey(me.input.KEY.B); /*unbinds keys*/
		me.input.unbindKey(me.input.KEY.Q);
		me.input.unbindKey(me.input.KEY.E);
		me.input.unbindKey(me.input.KEY.W);
		me.input.unbindKey(me.input.KEY.A);
		var exp1cost = ((game.data.exp1 + 1)*10);

		me.game.world.addChild(new (me.Renderable.extend({ /*Starts a new game and resets all the variables*/
			init: function(){
				this._super(me.Renderable, 'init',[10, 10, 300, 50]);
				this.font = new me.Font("Comic Sans MS", 26, "white"); //sets the font
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Enter Username and Password", this.pos.x, this.pos.y); /*puts "Enter Username and Password" at those coordinates*/
				}
		})));
	},
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		document.getElementById("input").style.visibility = "visible";
		document.getElementById("load").style.visibility = "visible";
	
	}
});