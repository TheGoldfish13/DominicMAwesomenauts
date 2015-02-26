game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) { /*constructor function*/
		this.setSuper();
		this.setPlayerTimers();
		this.setAttributes();
		this.type = "PlayerEntity"; /*you are a player entity*/
		this.setFlags(); /*yes or no, right or left kind of values (sortof like boolians? im guessing)*/

		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); /*makes the camerafollow the player*/

		this.addAnimation();
		this.renderable.setCurrentAnimation("idle"); /*by default set the animation for idle*/

	},

	setSuper: function() { /*function that sets the super class*/
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
	},

	setPlayerTimers: function() { /*function that sets player timers*/
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastAttack = new Date().getTime(); /*not being used currently*/
	},

	setAttributes: function() { /*sets attributes that can be changed throughout the game*/
		this.health = game.data.playerHealth; /*and your health is 20*/
		this.body.setVelocity(game.data.playerMoveSpeed, 20); /*20 for the y value is essentially gravity so that the player falls*/
		this.attack = game.data.playerAttack;
	},
	setFlags: function() {
		this.facing = "right"; /*keeps track of direction of character*/
		this.dead = false;
	},
	addAnimation: function() {
		this.renderable.addAnimation("idle", [78]); /*adds the animation for idle*/
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);/*and for walk*/
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80); /*as wellas for attack*/

	},

	update: function(delta){
		this.now = new Date().getTime();

		this.dead = checkIfDead();

		this.checkKeyPressesAndMove();

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

	checkIfDead: function() {
		if(this.health <= 0) { /*checks if dead*/
			return true;
		}
	},

	checkKeyPressesAndMove: function() {
		if(me.input.isKeyPressed("right")) { /*if the right arrow is being pushed then.....*/
			this.moveRight(); /*run moveRight function*/
		}
		else if(me.input.isKeyPressed("left")) { /*if the left arrow is being pushed then.....*/
			this.moveLeft();
		}
		else{ /*if its not being pushed then its not moving*/
			this.body.vel.x = 0; 
		}
		/*I didnt move the jump to a function because i dont feel that its necesary*/
		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling && !this.renderable.isCurrentAnimation("attack")) { /*if jump is pressed, and player isnt jumping or falling*/
			this.body.jumping = true; /*set jumping equal to true*/
			this.body.vel.y -= this.body.accel.y * me.timer.tick; /*formula saying y-velocity= y-accel * time*/
		}
	},

	moveRight: function() { /*pretty self explanitory but this is the location of the move right stuff*/
		/* this adds the position of my x by adding the velocity and multiplying it by me.timer.tick*/
			/*me.timer.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			this.flipX(true);
	},

	moveLeft: function() {
		/* this adds the position of my x by adding the velocity and multiplying it by me.timer.tick*/
			/*me.timer.tick makes the movement look smooth*/
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.facing ="left";
			this.flipX(false);
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
					if(response.b.health <= game.data.playerAttack) { /*if creeps health <=  our attack so if you kill a creep*/
						game.data.gold += 1; /*then add 1 gold*/
						console.log("Current Glod: " + game.data.gold);/*and print how much gold you have to the console*/
					}

					response.b.loseHealth(game.data.playerAttack); /*lose 1 health*/
				}
			}
	}
});
/*Player base*/



/*Enemy base*/



/*where GameManager would go, just in case i need it for later...*/