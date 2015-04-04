<?php
class Database { /*we use a class instead of a function because a class is an instance of an object that can be manipulated and changed in the future. It can be far more than just one set value. also it is better for organization*/
	private $connection; /*setting private variables so they cannot be changedoutside of this file*/
	private $host;
	private $username;
	private $password;
	private $database;

	public $error; /*public in order to access it later*/

	/*a function is a set of instructions in a block of code that can be run at any time*/
	
	public function __construct($host, $username, $password, $database) { /*accessing the global variables as local variables that will disapear once the function has been run*/
		$this->host = $host;
		$this->username = $username;
		$this->password = $password;
		$this->database = $database;

	$this->connection = new mysqli($host, $username, $password);

	if($this->connection->connect_error) { //if it doesnt connect kill the program, and echo the error
 		die("Error: " . $connection->connection_error);
 	} 
 	$exists = $this->connection->select_db($database); // It trys to connect to the MYSQL server
 	if(!$exists) { // if the database doesnt exist it makes one
 		$query = $this->connection->query("CREATE DATABASE $database");
 		if($query) { 
 			echo "Succesfully created database: " . $database;
 		}
 	}
 	else { // if it exists it echoes that it has already been created
 			echo "Database has already been created";
 		}
 	}
	public function openConnection() { /*this function will open connection*/
		$this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

		if($this->connection->connect_error) { /*echo the error if there is one*/
 			die("Error: " . $this->connection->connection_error);
 		} 
	}
	public function closeConnection() { /*this will close it*/
		if(isset($this->conncection)) { /*isset checks if the variable contains information*/
			$this->connection->close(); 	/*closes this connection*/
		}

	}
	public function query($string) {
		$this->openConnection(); /*opens connection*/

		$query = $this->connection->query($string); /*creates a query and stores the string in the $query variable*/

		if(!$query) { /*if query does not exist echo the error*/
			$this->error = $this->connection->error;
		}

		$this->closeConnection(); /*closes connection*/
		return $query;
	}


}