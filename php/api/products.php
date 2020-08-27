<?php declare(strict_types=1);
http_response_code(500);

require_once '../tersus_config.php';
require_once 'helpers.php';

\Tersus\Helpers\handleCORS();
$email = \Tersus\Helpers\authenticate();
$tablePrefix = \Tersus\Helpers\getTablePrefix();

$isUAT = ENV == "uat";
$tablePrefix = $isUAT ? "uat_" : "prod_";

header('Content-Type: application/json; charset=utf-8');

try {
	$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME;
	$pdo = new PDO($dsn, DB_USER, DB_PASS);
} catch (\PDOException $e) {
	throw new \PDOException($e->getMessage(), (int) $e->getCode());
}

$stmt = $pdo->query("SELECT * FROM `${tablePrefix}products` WHERE 1");
$arr = [];
while ($row = $stmt->fetch()) {
	array_push($arr, $row);
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);

header('HTTP/1.1 200 OK');

?>
