# Vibe Cache Check Workflow (Postman)

Import both files in this folder into Postman:
- `vibe-cache-check.postman_collection.json`
- `vibe-home-about-cache-isolation.postman_collection.json`
- `vibe-backend-direct-fetch.postman_collection.json`
- `vibe-home-about-full-matrix.postman_collection.json`
- `vibe-next-cache-probe.postman_collection.json`
- `droplet.postman_environment.json`
- `local.postman_environment.json`

Select the `droplet` environment and confirm these variables:
- `laravel_base_url`
- `next_base_url`
- `story_slug`
- `home_slug`
- `about_slug`

## Run order
1. `A) Health`
2. `B) Clear CV Cache`
3. `C) Story Fetch (cold)`
4. `D) Check if cached (warm)`
5. `E) Webhook invalidation (slug)`

The **D** step verifies the API is using the cached CV from step **C** by asserting:
- `cv.used` exists
- `cv.used` equals the `cv.latest` captured after the cold fetch

The **B** step requests targeted invalidation by `slug` and asserts:
- `invalidate` is `slug`
- `slug` is returned in the response

Webhook coverage:
- **E** asserts webhook requests invalidate by `slug`

## Home/About cache isolation run order
Collection: `vibe-home-about-cache-isolation.postman_collection.json`

1. `A) Health (Laravel)`
2. `B) Home fetch (cold)`
3. `C) Home fetch (warm)`
4. `D) About fetch (cold)`
5. `E) Invalidate about slug (frontend)`
6. `F) Home still warm after about invalidation`

This verifies that invalidating `about` slug on the frontend does not evict the backend warm-cache CV usage for `home`.

## Backend-only direct fetch run order
Collection: `vibe-backend-direct-fetch.postman_collection.json`

1. `A) Health`
2. `B) Home fetch (cold)`
3. `C) Home fetch (warm)`
4. `D) About fetch`
5. `E) Clear about slug (backend)`
6. `F) Home still warm after about clear`
7. `G) Webhook invalidation (slug)`

This collection calls only Laravel endpoints and validates slug-level invalidation behavior end-to-end.

## Full matrix (home/about) run order
Collection: `vibe-home-about-full-matrix.postman_collection.json`

This collection validates all current features/paths for the two active slugs:
- Health endpoint
- Home/about cold + warm backend fetch behavior
- Backend clear by explicit slug and default slug
- Webhook invalidation by slug and webhook home fallback behavior
- Direct Next revalidate endpoint for both home and about

## Next cache probe run order
Collection: `vibe-next-cache-probe.postman_collection.json`

1. `A) Probe first fetch (cold)`
2. `B) Probe second fetch (warm, same token)`
3. `C) Revalidate slug in Next`
4. `D) Probe after revalidate (capture token)`
5. `E) Probe warm again after revalidate (settling step)`
6. `F) Probe final warm fetch (stable after settle)`

This collection verifies Next data-cache behavior directly:
- Warm probe repeats the same `sourceGeneratedAt` token for the same slug.
- After Next revalidate, a new probe token is captured for the refreshed cache entry.
- Because `revalidateTag(..., "max")` is stale-while-revalidate, one settling probe is allowed.
- Final warm probe confirms the refreshed token is now stable.
