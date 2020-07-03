<?php declare(strict_types=1);

namespace Tersus\Auth;
require_once '../tersus_config.php';
require './../vendor/autoload.php';

use Google\Auth\AccessToken;

function authenticate()
{
	$isUAT = ENV == "uat";

	header("Access-Control-Allow-Headers: Authorization");
	if ($isUAT) {
		header("Access-Control-Allow-Origin: *");
	}

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		exit();
	}

	try {
		$headers = getAuthorizationHeader();
		$idToken = null;
		if (!empty($headers)) {
			if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
				$idToken = $matches[1];
			}
		} else {
			throw new \Exception("Bearer token not found");
		}
		$auth = new AccessToken();
		$payload = $auth->verify($idToken, ['throwException' => true]);
		return $payload["email"];
	} catch (\Exception $ex) {
		header('HTTP/1.1 401 Unauthorized');
		exit();
	}
}

function getAuthorizationHeader()
{
	$headers = null;
	if (isset($_SERVER['Authorization'])) {
		$headers = trim($_SERVER["Authorization"]);
	} elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
		//Nginx or fast CGI
		$headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
	} elseif (function_exists('apache_request_headers')) {
		$requestHeaders = apache_request_headers();
		// Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
		$requestHeaders = array_combine(
			array_map('ucwords', array_keys($requestHeaders)),
			array_values($requestHeaders)
		);
		//print_r($requestHeaders);
		if (isset($requestHeaders['Authorization'])) {
			$headers = trim($requestHeaders['Authorization']);
		}
	}
	return $headers;
}

?>
