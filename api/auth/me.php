<?php
require_once __DIR__ . '/../bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_error('Method not allowed', 405);
}

$payload = require_auth();

json_response([
    'user' => ['id' => $payload['sub'], 'email' => $payload['email']],
]);
