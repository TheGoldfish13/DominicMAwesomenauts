game.SpendGold = Object.extend({ /*make spend gold class*/
	init: function(x, y, settings) { /*that when initially created*/
		this.now = new Date().getTime(); /*updates timers*/
		this.lastBuy = new Date().getTime(); /*keeps track of last buy*/
		this.paused = false; /*isnt paused*/
		this.alwaysUpdate = true; /*always updates*/
		this.updateWhenPaused = true; /*even when paused*/
	},

	update: function() {
		this.now = new Date().getTime(); /*updates timers*/
		if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >= 1000) { /*if b is pressed and it hasnt been a second since last push*/
			this.lastBuy = this.now; /*update timer*/
			if(!this.buying){  /*and you are not buyin*/
				this.startBuying(); /*start buying*/
			}
			else{ /*if you are buying already*/
				this.stopBuying(); /*then stop*/
			}
		}

		this.checkBuyKeys();

		return true;
	},

	startBuying: function() {
		this.buying = true; 
		me.state.pause(me.state.PLAY); /*set gamestate to play*/
		game.data.pausePos = me.game.viewport.localToWorld(0, 0); /*keeps track of where the player is*/
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("gold-screen"));
		game.data.buyscreen.updateWhenPaused = true;
		game.data.buyscreen.setOpacity(0.85);
		me.game.world.addChild(game.data.buyscreen, 34);/*adds the buy screen*/
		game.data.player.body.setVelocity(0, 0); /*make the player stop moving*/
		me.state.pause(me.state.PLAY); /*set gamestate to play*/
		me.input.bindKey(me.input.KEY.F1, "F1", true); /*binding keys F1-F6*/
		me.input.bindKey(me.input.KEY.F2, "F2", true);
		me.input.bindKey(me.input.KEY.F3, "F3", true);
		me.input.bindKey(me.input.KEY.F4, "F4", true);
		me.input.bindKey(me.input.KEY.F5, "F5", true);
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		this.setBuyText(); /*calls setBuyText function*/
	},

	setBuyText: function() {
		game.data.buytext = new (me.Renderable.extend({ /*adds me.Renderable*/
			init: function() { /*initially make...*/
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				this.font = new me.Font("Comic Sans MS", 28, "white"); /*font is much comic sans, very white*/
				this.updateWhenPaused = true; /*self explanitory*/
				this.alwaysUpdate = true;
			},

			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "Press F1-F6 to buy, B to exit. Current Gold: " + game.data.gold, this.pos.x, this.pos.y); /*puts instructions*/
				this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 + " Cost: " + ((game.data.skill1+1)*10), this.pos.x, this.pos.y + 40);
				this.font.draw(renderer.getContext(), "Skill 2: Run Faster. Current Level: " + game.data.skill2 + " Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y + 80);
				this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current level: " + game.data.skill3 + " Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y + 120);
				this.font.draw(renderer.getContext(), "Speed Burst: Press Q to run faster. Current Level: " + game.data.ability1 + " Cost: " + ((game.data.ability1+1)*10), this.pos.x, this.pos.y + 160);
				this.font.draw(renderer.getContext(), "Big Appetite: Press W to eat your creep for health. Current Level: " + game.data.ability2 + " Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "Spear Throw: Press E to throw your spear. Current Level " + game.data.ability3 + " Cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y + 240);
			}	
		}));
	me.game.world.addChild(game.data.buytext, 35);
	},

	stopBuying: function(){
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20); /*returns the players movement*/
		me.game.world.removeChild(game.data.buyscreen); /*gets rid of the buyscreen*/
		me.input.unbindKey(me.input.KEY.F1, "F1", true); /*unbind all the keys*/
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true); 
		me.game.world.removeChild(game.data.buytext); 
	},
	checkBuyKeys: function(){
		if(me.input.isKeyPressed("F1")){ /*if this buy key is pressed*/
			if(this.checkCost(1)){ /*and if you have enough gold to afford it*/
				this.makePurchase(1); /*make the pruchase*/
			}
		}else if(me.input.isKeyPressed("F2")){ /*repeat for all the keys*/ 
			if(this.checkCost(2)){
				this.makePurchase(2);
			}
		}else if(me.input.isKeyPressed("F3")){
			if(this.checkCost(3)){
				this.makePurchase(3);
			}
		}else if(me.input.isKeyPressed("F4")){
			if(this.checkCost(4)){
				this.makePurchase(4);
			}
		}else if(me.input.isKeyPressed("F5")){
			if(this.checkCost(5)){
				this.makePurchase(5);
			}
		}else if(me.input.isKeyPressed("F6")){
			if(this.checkCost(6)){
				this.makePurchase(6);
			}
		}
	},

	checkCost: function(skill){
		if(skill1===1 && (game.data.gold >= ((game.data.skill1 + 1) * 10))){ /*if you chose skill1 and you have enough gold to level it up, return true*/

		}else{
			return false;
		}
		if(skill2===2 && (game.data.gold >= ((game.data.skill2 + 1) * 10))){ 

		}else{
			return false;
		}
		if(skill3===3 && (game.data.gold >= ((game.data.skill3 + 1) * 10))){ 
		}else{
			return false;
		}
		if(skill4===4 && (game.data.gold >= ((game.data.ability1 + 1) * 10))){ 

		}else{
			return false;
		}
		if(skill5===5 && (game.data.gold >= ((game.data.ability2 + 5) * 10))){ 

		}else{
			return false;
		}
		if(skill6===6 && (game.data.gold >= ((game.data.ability3 + 6) * 10))){ 

		}else{
			return false;
		}
	},

	makePurchase: function(skill){
		if(skill===1){
			game.data.gold -= ((game.data.skill1 + 1)*10);
			game.data.skill1 += 1;
			game.data.playerAttack += 1;
		}else if(skill2===2){
			game.data.gold -= ((game.data.skill2 + 1)*10);
			game.data.skill1 += 1;
		}else if(skill2===3){
			game.data.gold -= ((game.data.skill3 + 1)*10);
			game.data.skill1 += 1;
		}else if(ability1===4){
			game.data.gold -= ((game.data.ability1 + 1)*10);
			game.data.skill1 += 1;
		}else if(ability2===5){
			game.data.gold -= ((game.data.ability2 + 1)*10);
			game.data.skill1 += 1;
		}else if(ability3===6){
			game.data.gold -= ((game.data.ability3 + 1)*10);
			game.data.skill1 += 1;
		}

 	}

});