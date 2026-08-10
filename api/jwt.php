<?php
// Minimal HS256 JWT encode/decode. No external dependencies.

function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode($data) {
    $pad = strlen($data) % 4;
    if ($pad) $data .= str_repeat('=', 4 - $pad);
    return base64_decode(strtr($data, '-_', '+/'));
}

function jwt_encode(array $payload, string $secret) {
    $header = base64url_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $body = base64url_encode(json_encode($payload));
    $signature = base64url_encode(hash_hmac('sha256', "$header.$body", $secret, true));
    return "$header.$body.$signature";
}

// Returns the decoded payload array, or null if invalid/expired.
function jwt_decode(string $token, string $secret) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$header, $body, $signature] = $parts;

    $expected = base64url_encode(hash_hmac('sha256', "$header.$body", $secret, true));
    if (!hash_equals($expected, $signature)) return null;

    $payload = json_decode(base64url_decode($body), true);
    if (!is_array($payload)) return null;
    if (isset($payload['exp']) && time() >= $payload['exp']) return null;

    return $payload;
}
