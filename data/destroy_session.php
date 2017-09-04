<?php	
	$param = json_decode(file_get_contents('php://input'),true);

	if(isset($param["key"]) && $param["key"] != "" ){
		session_id($param["key"]);
		session_start();
		session_destroy();
		session_commit();
	}
	
?>