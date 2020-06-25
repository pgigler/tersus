<?php declare(strict_types=1);

require_once '../tersus_config.php';

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

$sql = "SELECT * FROM `orders` WHERE 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	// $res = json_encode($result);
	// echo $res;
	// output data of each row
	while ($row = $result->fetch_assoc()) {
		echo json_encode($row);
		// echo "id: " . $row["id"] . " - sku: " . $row["sku"] . "<br>";
	}
} else {
	echo "{}";
}

$conn->close();

?>
