<?php
require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_error('Method not allowed', 405);
}

$tables = ['works', 'clients', 'platforms', 'videos', 'campaigns', 'testimonials'];
$out = [];
foreach ($tables as $t) {
    $out[$t] = (int) db()->query("SELECT COUNT(*) FROM `$t`")->fetchColumn();
}

json_response($out);
