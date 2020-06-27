<?php declare(strict_types=1);
require_once '../tersus_config.php';

header('Content-Type: application/json; charset=utf-8');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

$sql = "SELECT * FROM `orders` WHERE 1";
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

?>
