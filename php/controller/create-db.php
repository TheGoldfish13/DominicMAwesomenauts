<?php
	require_once(__DIR__ . "/../model/config.php"); //takes code from config and connects to server

	$query = $_SESSION["connection"]->query("CREATE TABLE users (" /*creates a table that contains the information of username, email, and password*/
		. "id int(11) NOT NULL AUTO_INCREMENT,"
		. "username varchar(30) NOT NULL,"
		. "password varchar(128) NOT NULL,"
		. "salt char(128) NOT NULL,"
		. "exp int(4)," /*cut off integer of exp at 4 so at 9999*/
		. "exp1 int(4),"
		. "exp2 int(4),"
		. "exp3 int(4),"
		. "exp4 int(4),"
		. "PRIMARY KEY (id))");