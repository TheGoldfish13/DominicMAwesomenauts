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

		this.body.setVelocity(5, 0);


	},

	update: function(delta){
		if(me.input.isKeyPressed("right")) { /*if the right arrow is being pushed then.....*/
			/* this adds the position of my x by adding the velocity and multiplying it by me.timer.tick*/
			/*me.timer.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}
		else{ /*if its not being pushed then its not moving*/
			this.body.vel.x = 0; 
		}

		this.body.update(delta); /*delta is the change in time*/
		return true;
	}
});