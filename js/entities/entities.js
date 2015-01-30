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

		this.body.setVelocity(5, 20); /*20 for the y value is essentially gravity so that the player falls*/

		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); /*makes the camerafollow the player*/

		this.renderable.addAnimation("idle", [78]); /*adds the animation for idle*/
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);/*and for walk*/

		this.renderable.setCurrentAnimation("idle"); /*by default set the animation for idle*/

	},

	update: function(delta){
		if(me.input.isKeyPressed("right")) { /*if the right arrow is being pushed then.....*/
			/* this adds the position of my x by adding the velocity and multiplying it by me.timer.tick*/
			/*me.timer.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(true);
		}
		else if(me.input.isKeyPressed("left")) { /*if the right arrow is being pushed then.....*/
			/* this adds the position of my x by adding the velocity and multiplying it by me.timer.tick*/
			/*me.timer.tick makes the movement look smooth*/
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.flipX(false);
		}
		else{ /*if its not being pushed then its not moving*/
			this.body.vel.x = 0; 
		}
		if(this.body.vel.x !== 0) { /*if the velocity doesnt equal 0*/
			if(!this.renderable.isCurrentAnimation("walk")) { /*and if the animation is currently not "walk"*/
				this.renderable.setCurrentAnimation("walk"); /* then set it to walk*/
			}
		}
		else {
			this.renderable.setCurrentAnimation("idle"); /*otherwise*/
			}



		this.body.update(delta); /*delta is the change in time*/
		
		this._super(me.Entity, "update", [delta]);
		return true;
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
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
		this.broken = false; /*by default it isnt borken*/
		this.health = 10; /*it has 10 health*/
		this.alwaysUpdate = true; /*always update*/
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "PlayerBaseEntity";

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
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = 10;
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
		
	} 

});