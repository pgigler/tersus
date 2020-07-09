<?php declare(strict_types=1);
http_response_code(500);

require_once '../tersus_config.php';
require 'auth.php';

$email = \Tersus\Auth\authenticate();

$isUAT = ENV == "uat";
$tablePrefix = $isUAT ? "uat_" : "prod_";

header('Content-Type: application/json; charset=utf-8');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_errno) {
	printf("MySQL connection failed: %s\n", $conn->connect_error);
	exit();
}

$sql = "SELECT * FROM `${tablePrefix}products` WHERE 1";
$result = $conn->query($sql);
$arr = [];

if ($result->num_rows > 0) {
	while ($row = $result->fetch_assoc()) {
		array_push($arr, $row);
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
} else {
	echo "[]";
}

$conn->close();

header('HTTP/1.1 200 OK');

?>
