<?php
require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}

require_auth();

if (empty($_FILES['file'])) {
    json_error('No file uploaded', 400);
}

$file = $_FILES['file'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    json_error('Upload failed (code ' . $file['error'] . ')', 400);
}

$cfg = config();
if ($file['size'] > $cfg['upload_max_bytes']) {
    json_error('File is too large', 400);
}

$allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'webm', 'mov'];
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!in_array($ext, $allowedExt, true)) {
    json_error('File type not allowed', 400);
}

// Folder is a caller-chosen subfolder (e.g. "works", "avatars") — keep it safe.
$folder = preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['folder'] ?? 'misc') ?: 'misc';

$cleanName = preg_replace('/[^a-zA-Z0-9.\-_]/', '_', pathinfo($file['name'], PATHINFO_FILENAME));
$filename = time() . '_' . bin2hex(random_bytes(4)) . '_' . $cleanName . '.' . $ext;

$uploadDir = __DIR__ . '/../uploads/' . $folder;
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$destination = $uploadDir . '/' . $filename;
if (!move_uploaded_file($file['tmp_name'], $destination)) {
    json_error('Could not save file', 500);
}

$url = rtrim($cfg['uploads_base_url'], '/') . '/' . $folder . '/' . $filename;
json_response(['url' => $url]);
