<?php
	// session_start();
	// if( isset($_SESSION['uid']) ) print 'authentified';

	$response = "";
	$param = json_decode(file_get_contents('php://input'),true);


	if(isset($param["key"]) && $param["key"] != "" ){
		session_start();
		if( isset($_SESSION[$param["key"]]) ) {$response = 'authentified';}		
	}

	print $response;
?>