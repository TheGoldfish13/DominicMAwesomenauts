<?php
	require_once(__DIR__ . "/../model/config.php");

	$exp = filter_input(INPUT_POST, "exp", FILTER_SANITIZE_STRING); /*have 5 experience variables*/
	$exp1 = filter_input(INPUT_POST, "exp", FILTER_SANITIZE_STRING);
	$exp2 = filter_input(INPUT_POST, "exp", FILTER_SANITIZE_STRING);
	$exp3 = filter_input(INPUT_POST, "exp", FILTER_SANITIZE_STRING);
	$exp4 = filter_input(INPUT_POST, "exp", FILTER_SANITIZE_STRING);


	$query = $_SESSION["connection"]->query("UPDATE users SET " /*store the 5 exp variables as exp where the user is logged in*/
		. "exp = $exp, "
		. "exp1 = $exp1, "
		. "exp2 = $exp2, "
		. "exp3 = $exp3, "
		. "exp4 = $exp4 WHERE username = \"" . $_SESSION["name"]. "\"");

	if($query){ /*if the query works*/
		echo "true"; /*echo true (for ajax later)*/
	}
	else{ /*if its broke*/
		echo "<p>" . $_SESSION["connection"]->error . "</p>"; /*then echo why*/
	}
