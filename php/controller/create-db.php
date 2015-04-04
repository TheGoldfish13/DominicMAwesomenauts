<?php
	require_once(__DIR__ . "/../model/config.php"); //takes code from config and connects to server
 
/*test comment for source tree*/
	$query = $_SESSION["connection"]->query("CREATE TABLE posts (" /*creates a table called posts that needs....*/
		. "id int(11) NOT NULL AUTO_INCREMENT," /*needs a id that will be an integer, cant be empty*/
		. "title varchar (255) NOT NULL," /*needsa title up to 255 characters and cant be nothing*/
		. "post text NOT NULL,"  /*the actual text of the post, Cant be empty*/
		. "DateTime datetime NOT NULL," /*inserts Datetime in the table that cannot be*/
		. "PRIMARY KEY (id) )"); /*the tables primary key is the id*/

if($query) {
		echo " Succesfully created table: posts"; //runs the query, creates the table once
	}
	// else {
	// 	echo "<p>" . $_SESSION["connection"]->error . "</p>"; //echos out that the table has already been created
	// }

	$query = $_SESSION["connection"]->query("CREATE TABLE users (" /*creates a table that contains the information of username, email, and password*/
		. "id int(11) NOT NULL AUTO_INCREMENT,"
		. "username varchar(30) NOT NULL,"
		. "email varchar(50) NOT NULL,"
		. "password varchar(128) NOT NULL,"
		. "salt char(128) NOT NULL,"
		. "PRIMARY KEY (id))");
	if($query) {
		echo "<p>Succesfully created table user: </p>"; /*checking if table user was succefully created*/
	}
	// else {
	// 	echo "<p>" . $_SESSION["connection"]->error . "</p>";
	// }
?>