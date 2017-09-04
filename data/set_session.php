<?php	
$response = "";
$param = json_decode(file_get_contents('php://input'),true);


if(isset($param["key"]) && $param["key"] != "" && isset($param["value"]) && $param["value"] != ""){
	session_start();
	$_SESSION[$param["key"]] = $param["value"];
	$response ="setted";
}

print $response;

?>