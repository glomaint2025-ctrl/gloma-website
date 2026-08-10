<?php
// Copy this file to config.php and fill in your real values.
// config.php is gitignored — never commit real secrets.

return [
    // cPanel MySQL Databases page gives you these (dbname/dbuser are usually
    // prefixed with your cPanel username, e.g. "glomaint_gloma")
    'db' => [
        'host' => 'localhost',
        'name' => 'glomaint_gloma',
        'user' => 'glomaint_gloma',
        'pass' => 'CHANGE_ME',
    ],

    // Any long random string. Used to sign login tokens — changing it logs
    // everyone out. Generate one with: php -r "echo bin2hex(random_bytes(32));"
    'jwt_secret' => 'CHANGE_ME_TO_A_LONG_RANDOM_STRING',

    // How many seconds a login token stays valid (7 days).
    'jwt_ttl' => 60 * 60 * 24 * 7,

    // Front-end origins allowed to call this API. Add every domain the site
    // is served from (Vercel URL, your own domain, localhost for dev).
    'allowed_origins' => [
        'http://localhost:5173',
        'https://gloma-website.vercel.app',
    ],

    // Max upload size in bytes (20 MB).
    'upload_max_bytes' => 20 * 1024 * 1024,

    // The public URL of the folder that sits next to /api on the server
    // (no trailing slash). Uploaded files are served from here.
    // e.g. if this api/ folder lives at https://yourdomain.com/api,
    // the uploads/ folder next to it is https://yourdomain.com/uploads
    'uploads_base_url' => 'https://yourdomain.com/uploads',
];
