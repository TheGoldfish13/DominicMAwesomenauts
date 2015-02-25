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