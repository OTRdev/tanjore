---
name: ship
description: Publish site changes to www.tanjore.ca end to end: run all checks, commit, open a pull request, merge it, wait for the deploy and verify the live site. Use when the owner says ship, deploy, publish, push live, or "make it live".
---

# Ship changes live

Requires `gh auth status` to show you are logged in as OTRdev. If not, tell the owner to run
`gh auth login --web --git-protocol https --scopes repo,workflow`.

1. **Branch:** never commit to `main`. If on `main`, create a branch first. `git status` must show only the intended changes
   (no stray scratch files, no unlicensed photos).
2. **Checks (all must pass, stop on any failure):**
   - `pnpm exec astro check` (0 errors)
   - `pnpm build`
   - `node scripts/verify-dist.mjs` ("OK")
   - If `src/data/menu.ts` changed: `node scripts/menu-diff.mjs`. Show it. If any price changed, get the owner's explicit OK first.
3. **Commit** with a clear message. End the message with the attribution line from the session's system reminder.
4. **Push and open the PR:** `git push -u origin <branch>` then `gh pr create --base main --head <branch> --title ... --body ...`.
   The body says what changed, how it was verified, and ends with the PR attribution line from the system reminder.
5. **Merge:** `gh pr merge <n> --merge --admin` (the owner can bypass the review rule).
6. **Wait for the deploy:** poll `gh run list --workflow "Deploy to GitHub Pages" --limit 1` until `completed`. If it fails, read the
   job steps, reproduce locally and fix. Never leave a failed deploy unreported.
7. **Verify the live site (curl, not assumptions):** `/`, `/menu`, `/about`, `/contact` return 200; a string unique to this change
   is present; canonicals are clean (`https://www.tanjore.ca/menu`, no `.html`).
8. **Report** in plain language: what is live, what was checked, and anything the owner still needs to do.

Never skip a failed check. Never force-push. Do not merge anything the owner has not seen if it changes prices, dietary
flags, claims about the restaurant, or photos.
