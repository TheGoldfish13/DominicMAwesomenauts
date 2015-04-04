<?php
	require_once(__DIR__ . "/../model/config.php"); /*puts code from config here*/

	function authenticateUser() {
		if(!isset($_SESSION["authenticated"])) { /*checks if an authenticated user is logged in*/
			return false;
		}
		else {
			if($_SESSION["authenticated"] != true) /*if not then false is returned*/
				return false;
			else {
				return true; /*otherwise true is returned if a user is logged in*/
			}
		}
	} 
?>