game.SpearThrow = me.Entity.extend({
	init: function(x, y, settings, facing){
		this._super(me.Entity, 'init', [x,y, {
			image: "spear", 
			width: 48,
			height: 48, 
			spritewidth: "48",
			spriteheight: "48", 
			getShape: function(){
				return (new me.Rect(0,0,32,64)).toPolygon();
			}
		}]);
		
		this.alwaysUpdate = true;
		this.body.setVelocity(8, 0);
		this.attack = game.data.ability3*3;
		this.type = "spear";
		this.facing = facing;
	},

	update: function(delta){
		if(this.facing==="left"){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.flipX(true);
		}else if(this.facing==="right"){
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(false);
		}
		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);

		return true;
	},

	collideHandler: function(response){
		if(response.b.type ==='EnemyBaseEntity' || response.b.type ==='EnemyCreep'){
			response.b.loseHealth(1);
			me.game.world.removeChild(this);
		}
	}
})