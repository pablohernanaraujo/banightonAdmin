<?php 
header('content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

include 'conexion.php';

$resultado=mysql_query("select * from client");
if(!$resultado){
	die("Database query failed: " . mysql_error());
}

$clientes = array();
while($datos = mysql_fetch_assoc($resultado)){
	$clientes[] = $datos;	
}

echo json_encode($clientes);

?>