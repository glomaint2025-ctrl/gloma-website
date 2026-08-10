<?php
require_once __DIR__ . '/bootstrap.php';

function row_out(array $row): array {
    $row['id'] = (int) $row['id'];
    $row['sort_order'] = (int) $row['sort_order'];
    return $row;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $rows = db()->query('SELECT * FROM videos ORDER BY sort_order ASC, created_at ASC')->fetchAll();
    json_response(array_map('row_out', $rows));
}

if ($method === 'POST') {
    require_auth();
    $b = read_json_body();
    if (!trim($b['title'] ?? '')) json_error('Title is required', 400);

    $stmt = db()->prepare(
        'INSERT INTO videos (title, video_url, thumbnail_url, sort_order) VALUES (?, ?, ?, ?)'
    );
    $stmt->execute([
        $b['title'],
        $b['video_url'] ?? '',
        $b['thumbnail_url'] ?? '',
        (int) ($b['sort_order'] ?? 0),
    ]);
    json_response(['id' => (int) db()->lastInsertId()], 201);
}

if ($method === 'PUT') {
    require_auth();
    $id = (int) ($_GET['id'] ?? 0);
    if (!$id) json_error('id is required', 400);
    $b = read_json_body();

    $stmt = db()->prepare(
        'UPDATE videos SET title=?, video_url=?, thumbnail_url=?, sort_order=? WHERE id=?'
    );
    $stmt->execute([
        $b['title'] ?? '',
        $b['video_url'] ?? '',
        $b['thumbnail_url'] ?? '',
        (int) ($b['sort_order'] ?? 0),
        $id,
    ]);
    json_response(['ok' => true]);
}

if ($method === 'DELETE') {
    require_auth();
    $id = (int) ($_GET['id'] ?? 0);
    if (!$id) json_error('id is required', 400);
    db()->prepare('DELETE FROM videos WHERE id=?')->execute([$id]);
    json_response(['ok' => true]);
}

json_error('Method not allowed', 405);
