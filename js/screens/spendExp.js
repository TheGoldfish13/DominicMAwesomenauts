game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); /*loads the title screen*/ // TODO

		/*binding function keys*/
		me.input.bindKey(me.input.KEY.F1, "F1");
		me.input.bindKey(me.input.KEY.F2, "F2");
		me.input.bindKey(me.input.KEY.F3, "F3");
		me.input.bindKey(me.input.KEY.F4, "F4");
		me.input.bindKey(me.input.KEY.F5, "F5");
		var exp1cost = ((Number(game.data.exp1) + 1) * 10); /*variable for cost of the exp1*/
	
		me.game.world.addChild (new (me.Renderable.extend({ /*adds me.Renderable*/
			init: function() { /*initially make...*/
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				this.font = new me.Font("Comic Sans MS", 26, "pink");
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "Press 1-5 to buy, Enter to skip", this.pos.x, this.pos.y); /*putting start a new game message*/
				this.font.draw(renderer.getContext(), "Current Exp:" + game.data.exp.toString(), this.pos.x + 50, this.pos.y + 50);
				this.font.draw(renderer.getContext(), "1) Make More Gold Current Level: " + game.data.exp1.toString() + " Cost:" + exp1cost, this.pos.x, this.pos.y + 100);
				this.font.draw(renderer.getContext(), "2) Add Starting Gold", this.pos.x, this.pos.y + 150);
				this.font.draw(renderer.getContext(), "3) Increase Damage", this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "4) Increase Health", this.pos.x, this.pos.y + 250);
				this.font.draw(renderer.getContext(), "5) Skip", this.pos.x, this.pos.y + 300);
			}	
		})));

	this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
		if(action === "F1") { /*if F1 is pressed*/
			if(game.data.exp >= exp1cost) { /*and you can afford it*/
				game.data.exp1 += 1; /*add 1 to exp1*/
				game.data.exp -= exp1cost; /*subract the cost*/
				me.state.change(me.state.PLAY); /*and play the game*/
			}
			else{
				console.log("not enough exp");
			}
		}
		else if(action === "F2") {

		}
		else if(action === "F3") {

		}
		else if(action === "F4") {
			
		}
		else if(action === "F5") { /*if F5 is pressed then play the game*/
			me.state.change(me.state.PLAY);
		}
	});

	},
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() { /*unbind all the keys*/
		me.input.unbindKey(me.input.KEY.F1, "F1");
		me.input.unbindKey(me.input.KEY.F2, "F2");
		me.input.unbindKey(me.input.KEY.F3, "F3");
		me.input.unbindKey(me.input.KEY.F4, "F4");
		me.input.unbindKey(me.input.KEY.F5, "F5");
		me.event.unsubscribe(this.handler);
	}
});