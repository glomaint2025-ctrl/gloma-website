<?php
require_once __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = db()->query('SELECT * FROM site_settings WHERE id = 1');
    $row = $stmt->fetch();
    if ($row) {
        foreach (['stat_years', 'stat_projects', 'stat_team', 'stat_satisfaction'] as $k) {
            $row[$k] = (int) $row[$k];
        }
    }
    json_response($row ?: null);
}

if ($method === 'PUT') {
    require_auth();
    $b = read_json_body();

    $stmt = db()->prepare(
        'UPDATE site_settings SET facebook_url=?, instagram_url=?, youtube_url=?, tiktok_url=?, whatsapp_url=?,
         stat_years=?, stat_projects=?, stat_team=?, stat_satisfaction=?, updated_at=NOW() WHERE id=1'
    );
    $stmt->execute([
        $b['facebook_url'] ?? '',
        $b['instagram_url'] ?? '',
        $b['youtube_url'] ?? '',
        $b['tiktok_url'] ?? '',
        $b['whatsapp_url'] ?? '',
        (int) ($b['stat_years'] ?? 0),
        (int) ($b['stat_projects'] ?? 0),
        (int) ($b['stat_team'] ?? 0),
        (int) ($b['stat_satisfaction'] ?? 0),
    ]);
    json_response(['ok' => true]);
}

json_error('Method not allowed', 405);
