<?php
require_once 'tersus_config.php';

$age = ["Peter" => 22, "Ben" => 37, "Joe" => 43];
$res = json_encode($age);

echo $res;

?>
