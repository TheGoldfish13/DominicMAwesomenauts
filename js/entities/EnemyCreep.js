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