<?php
// Small shared helpers used by every endpoint.

function json_response($data, int $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function json_error(string $message, int $status = 400) {
    json_response(['error' => $message], $status);
}

function read_json_body(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

// Reads the Authorization header across the different ways Apache/PHP-FPM
// setups can (or don't) forward it.
function bearer_token(): ?string {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!$header && function_exists('apache_request_headers')) {
        foreach (apache_request_headers() as $name => $value) {
            if (strtolower($name) === 'authorization') {
                $header = $value;
                break;
            }
        }
    }
    if (preg_match('/Bearer\s+(\S+)/i', $header, $m)) {
        return $m[1];
    }
    return null;
}

// Verifies the bearer token; returns the JWT payload (with user id/email),
// or sends a 401 response and stops execution.
function require_auth(): array {
    $token = bearer_token();
    $payload = $token ? jwt_decode($token, config()['jwt_secret']) : null;
    if (!$payload) {
        json_error('Unauthorized', 401);
    }
    return $payload;
}
