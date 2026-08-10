<?php
// Included by every endpoint. Fixed load order matters:
// db.php defines config()/db(), cors.php calls config(), helpers.php needs both.
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/jwt.php';
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/helpers.php';
