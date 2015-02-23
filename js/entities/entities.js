game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) { /*constructor function*/
		this._super(me.Entity, 'init', [x, y, {
			image: "player", /*describes what the player entity is, its size shape ect*/
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			getShape: function(){
				return(new me.Rect(0, 0, 64, 64)).toPolygon(); /*essentialy sets its hitbox*/
			}
		}]);
		this.type = "PlayerEntity"; /*you are a player entity*/
		this.health = game.data.playerHealth; /*and your health is 20*/
		this.body.setVelocity(game.data.playerMoveSpeed, 20); /*20 for the y value is essentially gravity so that the player falls*/
		this.facing = "right"; /*keeps track of direction of character*/
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.dead = false;
		this.lastAttack = new Date().getTime();

		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); /*makes the camerafollow the player*/

		this.renderable.addAnimation("idle", [78]); /*adds the animation for idle*/
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);/*and for walk*/
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80); /*as wellas for attack*/

		this.renderable.setCurrentAnimation("idle"); /*by default set the animation for idle*/

	},

	update: function(delta){
		this.now = new Date().getTime();

		if(this.health <= 0) {
			this.dead = true;
		}



		if(me.input.isKeyPressed("right")) { /*if the right arrow is being pushed then.....*/
			/* this adds the position of my x by adding the velocity and multiplying it by me.timer.tick*/
			/*me.timer.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			this.flipX(true);
		}
		else if(me.input.isKeyPressed("left")) { /*if the right arrow is being pushed then.....*/
			/* this adds the position of my x by adding the velocity and multiplying it by me.timer.tick*/
			/*me.timer.tick makes the movement look smooth*/
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.facing ="left";
			this.flipX(false);
		}
		else{ /*if its not being pushed then its not moving*/
			this.body.vel.x = 0; 
		}

		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling && !this.renderable.isCurrentAnimation("attack")) { /*if jump is pressed, and player isnt jumping or falling*/
			this.body.jumping = true; /*set jumping equal to true*/
			this.body.vel.y -= this.body.accel.y * me.timer.tick; /*formula saying y-velocity= y-accel * time*/
		}

		/*I made it so you cant attack while in the air*/
		if(me.input.isKeyPressed("attack") && !this.body.jumping && !this.body.falling){ /*if attack key (space) is being pressed then*/
			if(!this.renderable.isCurrentAnimation("attack")) { /*check if attack is not being pressed*/
				this.renderable.setCurrentAnimation("attack", "idle") /*if so then set animation to attack and then set it to idle*/
				this.renderable.setAnimationFrame();
				/*makes it so that when the animation plays again it starts from the very beggining*/ 
			} 

		}	
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) { /*if the velocity doesnt equal 0*/
			if(!this.renderable.isCurrentAnimation("walk")) { /*and if the animation is currently not "walk"*/
				this.renderable.setCurrentAnimation("walk"); /* then set it to walk*/
			}
		}
		else if(!this.renderable.isCurrentAnimation("attack")) {
			this.renderable.setCurrentAnimation("idle"); /*otherwise set animation to idle*/
		}

		if(this.renderable.isCurrentAnimation("attack"))  { /*I made it so that you cant move while attacking*/
			this.body.vel.x = 0; /*if you're attacking your x velocity is 0*/
		}


		me.collision.check(this, true, this.collideHandler.bind(this), true); /*passing parameter tha is checking for thecollision and whatever its running in to*/
		this.body.update(delta); /*delta is the change in time*/
		
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	loseHealth: function(damage) {
		this.health = this.health - damage; /*current health is health minus howver much damage you took*/
	},

	collideHandler: function(response) {
		if(response.b.type ==='EnemyBaseEntity'){ 
			var ydif = this.pos.y - response.b.pos.y; /*sets variable equal to y-pos - responce.b.y-pos*/
			var xdif = this.pos.x - response.b.pos.x; /*sets variable equal to x-pos - responce.b.x-pos*/

			if(ydif< -40 && xdif< 70 && xdif >-35 && ydif>-50) { /*if you're in the location of the upper hitbox*/
				this.body.falling = false; /*you're no longer falling*/
				this.body.vel.y = -1; /*and your y velocity is -1*/
			}

			else if(xdif > -35 && this.facing === 'right' && (xdif<0)) { /*if you're facing right and xdif>-35*/
				this.body.vel.x = 0; /*set velocity = 0*/
				//this.pos.x = this.pos.x - 1; /*set position to itself minus 1*/
			}
			else if(xdif<70 && this.facing === 'left' && (xdif>0)) { /*same thing except inversely for left*/
				this.body.vel.x = 0; 
				//this.pos.x = this.pos.x + 1;
			}

			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer) { /*if attacking and you havent attacked in 1 second*/
				this.lastHit = this.now; /*makes it so it will only lose health once per one attack*/
				response.b.loseHealth(game.data.playerAttack); /*tower will lose health*/
			}
			
		}
		else if(response.b.type === 'EnemyCreep') {
			var xdif = this.pos.x - response.b.pos.x; /*making collision hitbox for x*/
			var ydif = this.pos.y - response.b.pos.y; /*collision for y*/

			if(xdif>0) { /*if xdif>0 (coming from the right)*/
				//this.pos.x = this.pos.x + 1; /*then push slighty to the right*/
				if(this.facing==="left") { /*and if facing left*/
					this.body.vel.x = 0; /*make velocity = 0*/
				}
			}
			else{ /*if coming from left*/
				//this.pos.x = this.pos.x - 1; /*push slighty to left*/
				if(this.facing==="right") { /*and if facing right*/
					this.body.vel.x = 0; /*make velocity = 0*/
				}
			}

				if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer /*if attacking and havent attacked in a second*/
					 && (Math.abs(ydif <= 40) /*and xdif<=40*/
					 && ((xdif>0) && this.facing === "left") || ((xdif<0) && this.facing === "right"))) { /*if attacking and you havent attacked in 1 second*/
					this.lastHit = this.now; /*updates timers*/
					response.b.loseHealth(game.data.playerAttack); /*lose 1 health*/
				}
			}
	}
});
/*Player base*/
game.PlayerBaseEntity = me.Entity.extend({
	init :  function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, { /*specifics for what the playerbase entity is and how big it is and its shape*/
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function() {
				return (new me.Rect(0, 0, 100, 72)).toPolygon();
			}
		}]);
		this.broken = false; /*by default it isnt borken*/
		this.health = game.data.playerBaseHealth; /*it has 10 health*/
		this.alwaysUpdate = true; /*always update*/
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "PlayerBase";

		this.renderable.addAnimation("idle", [0]); /*adds animations for normal and broken towers*/
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle"); /*sets the normal animation to idle*/
	},

	update:function(delta) { /*keep checking if*/
		if(this.health<=0) { /*the health<=0 then the tower is broken*/
			this.broken = true; /*if so, then set it to broken*/
			this.renderable.setCurrentAnimation("broken");  /*and use the broken animation*/
		}
		this.body.update(delta); /*time since last update*/

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	loseHealth: function(damage) {
		this.health = this.health - damage;
	},

	onCollision: function() {

	} 

});


/*Enemy base*/
game.EnemyBaseEntity = me.Entity.extend({
	init :  function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function() {
				return (new me.Rect(0, 0, 100,72)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = game.data.enemyBaseHealth;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "EnemyBaseEntity";

		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta) { /*keep checking if*/
		if(this.health<=0) { /*the health<=0 then the tower is broken*/
			this.broken = true; /*if so, then set it to broken*/
			this.renderable.setCurrentAnimation("broken");  /*and use the broken animation*/
		}
		this.body.update(delta); /*time since last update*/

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function() {
		
	}, 

	loseHealth: function() {
		this.health--; /*subracts one from health*/
	}
});

game.EnemyCreep = me.Entity.extend({
	init: function(x, y, settings) { /*initializing what enemy creep is*/ 
		this._super(me.Entity, 'init', [x, y, {
			image: "creep1", /*uses this img*/
			width: 32, /*32 wide*/
			height: 64, /*64 tall*/
			spritewidth: "32",
			spriteheight: "64",
			getShape: function() {
				return (new me.Rect(0, 0, 32, 64)).toPolygon(); /*is a rectangle with these specs*/
			}
		}]);
		this.health = game.data.EnemyCreepHealth; /*has 3 health*/
		this.alwaysUpdate = true; /*always updates even if its not on screen*/
		this.attacking = false; /*makes the enemy not attacking*/
		this.lastAttacking = new Date().getTime(); /*keeps track of when our creeep last attacked anything*/
		this.lastHit = new Date().getTime(); /*and when our creep last hit anything*/
		this.now = new Date().getTime();
		this.body.setVelocity(3, 20);

		this.type = "EnemyCreep"; 

		this.renderable.addAnimation("walk", [3,4,5], 80); /*adds animation for walking*/
		this.renderable.setCurrentAnimation("walk"); /*sets animation to walk*/
	},

	loseHealth: function(damage) {
		this.health = this.health - damage; /*loses health based on damage*/
	},

	update: function(delta) {
		if(this.health <= 0) {
			me.game.world.removeChild(this);
		}

		this.now = new Date().getTime();
		this.body.vel.x -= this.body.accel.x * me.timer.tick; /*makes creep walk to the left*/

		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta); /*time since last update*/

		this._super(me.Entity, "update", [delta]); 

		return true;
	},

	collideHandler: function(response) { 
		if(response.b.type==='PlayerBase') { /*if colliding with player base*/
			this.attacking=true; /*set attacking to true*/
			//this.lastAttacking=this.now; 
			this.body.vel.x = 0; /*make it sit still*/
			//this.pos.x = this.pos.x + 1; /*push it slightly to the right to maintain its position*/
			if((this.now-this.lastHit >= 1000)) {/*and if the last attack was more than a second ago*/
				this.lastHit = this.now; /*and reset it to now as the current timer*/
				response.b.loseHealth(game.data.enemyCreepAttack); /*make player base lose 1 health*/
			} 
		}

		else if(response.b.type==='PlayerEntity') { /*if colliding with player*/
			var xdif = this.pos.x - response.b.pos.x; /*xdif is used for position*/

			this.attacking=true; /*set attacking to true*/
			//this.lastAttacking=this.now; 
			if(xdif>0) {
				//this.pos.x = this.pos.x + 1; /*push it slightly to the right to maintain its position*/	
				this.body.vel.x = 0; /*make it sit still*/
			}
			if((this.now-this.lastHit >= 1000) && xdif>0) {/*and if the last attack was more than a second ago*/
				this.lastHit = this.now; /*and reset it to now as the current timer*/
				response.b.loseHealth(game.data.enemyCreepAttack); /*make player lose 1 health*/
			} 
		}	
	}

});
game.GameManager = Object.extend({
	init: function(x, y, settings) { 
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();

		this.alwaysUpdate = true;
	},

	update: function() {
		this.now = new Date().getTime();

		if(game.data.player.dead) { /*if the player is dead (has less than 0 health)*/
			me.game.world.removeChild(game.data.player); /*remove the player*/
			me.state.current().resetPlayer(10, 0); /*and respawn it*/
		}

		if(Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep >= 1000)) { /*on a timer every 1 second*/
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {}); /*define what creep is*/
			me.game.world.addChild(creepe, 5); /*and spawn one*/
		}
		return true;
	}
});