game.ExperienceManager = Object.extend({
	init: function(x, y, settings) { 
		this.alwaysUpdate = true; /*always update*/
		this.gameover = false;
	},

	update: function() { /*constantly check*/
		if(game.data.win===true && !this.gameover) { /*if you've won and game over is false (either you lost or won)*/
			this.gameOver(true); /*run gameOver*/
			alert("YOU WIN!");
		}
		else if(game.data.win===false && !this.gameover) { /*if you lost and gameOver is false*/
			this.gameOver(false); /*run gameOver*/
			alert("YOU LOSE");
		}

		return true;
	},

	gameOver: function(win) {
		if(win) { /*if you've won*/
			game.data.exp += 10;	/*if so then add 10 exp*/
		}
		else {/*if you lost*/
			game.data.exp += 1; /*add 1 exp*/
		}
		/*regardless of winning or losing*/
		this.gameover = true; /*and end the game*/
		me.save.exp = game.data.exp; /*and save exp*/


			$.ajax({
				type: "POST",
				url: "php/controller/save-user.php",
				data: {
					exp: game.data.exp,
					exp1: game.data.exp1,
					exp2: game.data.exp2,
					exp3: game.data.exp3,
					exp4: game.data.exp4,
				},
				dataType: "text"
			})
				.success(function(response){ /*if succeded*/
					if(response==="true"){
						me.state.change(me.state.MENU); /*change state to play*/
					}
					else{
						alert(response); /*alter the response*/
					}
				})
				.fail(function(response){ /*if failed*/
					alert("Fail"); /*alert fail*/
				});
	}

});

