<?php
	require_once(__DIR__ . "/../model/config.php"); /*puts code from config here*/

	$array = array(
		'exp' => '',
		'exp1' => '',
		'exp2' => '',
		'exp3' => '',
		'exp4' => '',
	);

	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING); /*filters the input to make sure that the input for username is a string*/
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING); /*filters the input to make sure that the input for password is a string*/
	$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username'"); /*selecting a salt from the users table for the username*/

	if($query->num_rows == 1) {
		$row = $query->fetch_array();
		echo ($username);
		echo ($password);
		if($row["password"] === crypt($password, $row["salt"])) { /*if the inputted username and password are authenticated user then it echoes loggin succesfull*/
			$_SESSION["authenticated"] = true;
			$array["exp"] = $row["exp"];
			$array["exp1"] = $row["exp1"];
			$array["exp2"] = $row["exp2"];
			$array["exp3"] = $row["exp3"];
			$array["exp4"] = $row["exp4"];
			$_SESSION["name"] = $username;
			echo json_encode($array);

		}
		else {
			echo "Invalid username and password"; /*if not then it echoes invalid username or password*/
		}
	}
	else {
		echo "Invalid username and password";
	}
?>	