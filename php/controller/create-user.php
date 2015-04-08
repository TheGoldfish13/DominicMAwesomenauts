<?php
	require_once(__DIR__ . "/../model/config.php"); /*puts contents of config.php here (server info and $connection) */
	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING); /*filters the input to make sure that the input for username is a string*/
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING); /*filters the input to make sure that the input for password is a string*/

	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$"; /*creats salt variable*/

	$hashedPassword = crypt($password, $salt); /*makes the hashed password*/

	$query = $_SESSION["connection"]->query("INSERT INTO users SET " /*creates a query that inserts the variables into the users table */
		. "username = '$username',"
		. "password = '$hashedPassword',"
		. "salt = '$salt',"
		. "exp = 0, "
		. "exp1 = 0, "
		. "exp2 = 0, "
		. "exp3 = 0, "
		. "exp4 = 0"
		);

	$_SESSION["name"] = $username;

	if($query) {
		/*need this for ajax on index.php*/
		echo "true"; /*checking if query was succefully created*/
	}
	else{
		echo "<p>" . $_SESSION["connection"]->error . "</p>"; /*if not then display why not*/
	}
?>