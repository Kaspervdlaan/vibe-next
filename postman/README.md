# Vibe Cache Check Workflow (Postman)

Import these files in this folder into Postman:
- `vibe-home-about-full-matrix.postman_collection.json`
- `droplet.postman_environment.json`
- `local.postman_environment.json`

Select the `droplet` environment and confirm these variables:
- `laravel_base_url`
- `next_base_url`
- `story_slug`
- `home_slug`
- `about_slug`

## Full matrix (home/about) run order
Collection: `vibe-home-about-full-matrix.postman_collection.json`

This collection validates all current features/paths for the two active slugs:
- Health endpoint
- Home/about cold + warm backend fetch behavior
- Backend clear by explicit slug and default slug
- Webhook invalidation by slug and webhook home fallback behavior
- Direct Next revalidate endpoint for both home and about
