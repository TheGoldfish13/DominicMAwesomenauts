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