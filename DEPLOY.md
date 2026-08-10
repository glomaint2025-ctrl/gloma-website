# Deploying the PHP + MySQL backend to a cPanel host (e.g. serverbyt)

The React frontend is unchanged — it still builds with `npm run build` and can be
hosted anywhere (Vercel, or the same cPanel account). This guide covers the new
PHP API + MySQL database.

## 1. Create the MySQL database

In cPanel → **MySQL Databases**:
1. Create a database (e.g. `gloma`) — cPanel will prefix it, e.g. `youruser_gloma`.
2. Create a database user with a strong password.
3. Add that user to the database with **All Privileges**.

## 2. Import the schema

cPanel → **phpMyAdmin** → select your new database → **Import** tab → choose
[`database/mysql_schema.sql`](database/mysql_schema.sql) → Go.

## 3. Create your admin login

The schema creates an empty `admin_users` table. To add yourself:
1. On any machine with PHP, run:
   ```bash
   php -r "echo password_hash('YOUR_PASSWORD_HERE', PASSWORD_DEFAULT);"
   ```
   (No PHP installed? Any "PHP password_hash bcrypt generator" tool online works too —
   just don't reuse a real password on a random website; pick a throwaway one to
   generate the hash format, or run it once via a local PHP install.)
2. Copy the resulting hash (starts with `$2y$`).
3. In phpMyAdmin, open the `admin_users` table → Insert → set:
   - `email`: your admin login email
   - `password_hash`: the hash from step 1
   - leave `id` and `created_at` on their defaults
4. Go.

## 4. Configure and upload the API

1. Locally, copy `api/config.sample.php` to `api/config.php` and fill in:
   - `db.host/name/user/pass` — from step 1
   - `jwt_secret` — generate with `php -r "echo bin2hex(random_bytes(32));"`
   - `allowed_origins` — every URL the site is served from (your domain, and
     `https://gloma-website.vercel.app` if you keep the frontend on Vercel)
   - `uploads_base_url` — e.g. `https://yourdomain.com/uploads`
2. Upload the whole `api/` folder and the `uploads/` folder to your hosting
   (File Manager or FTP), as siblings — e.g. `public_html/api/` and
   `public_html/uploads/`.
3. Make sure `uploads/` is writable (cPanel File Manager → right-click → Permissions
   → 755, or 775 if 755 gives upload errors).

## 5. Point the frontend at the API

Set `VITE_API_URL` to your API's public URL (e.g. `https://yourdomain.com/api`):
- **If the frontend stays on Vercel**: add `VITE_API_URL` in the Vercel project's
  Environment Variables settings, then redeploy.
- **If the frontend also moves to serverbyt**: set it in `.env` before running
  `npm run build`, then upload the contents of `dist/` to `public_html/` (and keep
  a `.htaccess` there with an SPA fallback rewrite to `index.html`, same idea as
  the existing `vercel.json` rewrite).

## 6. Test

- Visit `https://yourdomain.com/api/works.php` in a browser — should show `[]` on
  a fresh database.
- Log into `/admin/login` with the email/password from step 3.
- Add a test Work item with an image — confirm it appears on the public Home/Work
  pages and the image loads from `uploads_base_url`.
