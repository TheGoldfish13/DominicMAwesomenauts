<?php
	require_once(__DIR__ . "/../model/config.php"); /*puts code from config here*/

	unset($_SESSION["authenticated"]); /*unsets the authenticated session variable so that you are logged out*/

	session_destroy(); /*ends the current session*/
	header("Location:" . $path . "index.php"); /*redirects you to index*/