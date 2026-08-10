<?php
require_once __DIR__ . '/../bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}

$body = read_json_body();
$email = trim($body['email'] ?? '');
$password = $body['password'] ?? '';

if (!$email || !$password) {
    json_error('Email and password are required', 400);
}

$stmt = db()->prepare('SELECT id, email, password_hash FROM admin_users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    json_error('Invalid email or password', 401);
}

$cfg = config();
$token = jwt_encode([
    'sub' => (int) $user['id'],
    'email' => $user['email'],
    'iat' => time(),
    'exp' => time() + $cfg['jwt_ttl'],
], $cfg['jwt_secret']);

json_response([
    'token' => $token,
    'user' => ['id' => (int) $user['id'], 'email' => $user['email']],
]);
