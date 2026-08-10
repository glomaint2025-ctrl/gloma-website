<?php
// Sets CORS headers based on the allowed_origins list in config.php,
// and short-circuits CORS preflight (OPTIONS) requests.

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = config()['allowed_origins'] ?? [];

if (in_array($origin, $allowed, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
