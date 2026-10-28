# AutoBuzz — Signal-to-Story Marketing Engine

**Create. Automate. Grow.**

AutoBuzz is an original, free-first marketing workspace built around one idea: **turn business signals into useful campaigns, then learn from real outcomes.**

Instead of starting with a blank social calendar, AutoBuzz starts with a *Signal Inbox*: product launches, customer questions, search opportunities, website changes, and campaign results. Each signal can become a campaign brief, a platform-specific content pack, tracked links, an approval task, and a measurable experiment.

## Product concept

- **Signal Inbox:** collect marketing opportunities from manual entry now, with official integrations planned.
- **Story Builder:** turn one signal into a coherent campaign with English/Bangla copy variants, calls to action, channel-specific drafts, and a tracking plan.
- **Campaign Experiments:** test one clear hypothesis at a time, link campaigns with UTM parameters, and evaluate results only when real analytics are connected.
- **Trust-first automation:** show integration states honestly, keep publishing approval-controlled, and never invent analytics or claim an action succeeded when it did not.
- **Free-first by design:** the initial static experience has no paid API, no external account credentials, and no advertising spend.

## Current starter experience

The first deployment is a static, interactive concept preview. It includes a campaign draft workspace and local browser storage for user-created drafts. It does **not** yet connect to social accounts, analytics providers, email services, or an AI API. Metrics are intentionally omitted until real data sources are connected.

## Run locally

Open `index.html` in a browser or serve this folder with any static web server.

## Deploy

The repository includes a GitHub Actions workflow for GitHub Pages. After Pages is enabled for the repository and the workflow runs successfully, the site will be available at:

`https://istihadahmed007.github.io/AutoBuzz/`

If the deployment workflow cannot enable Pages automatically, open **Settings → Pages**, choose **GitHub Actions** as the build and deployment source, and re-run the workflow.

## Next production milestones

1. Add secure authentication and an independent database.
2. Connect Google Search Console and Analytics using authorized OAuth.
3. Add official, permission-based social publishing integrations.
4. Persist campaign approvals, execution logs, and UTM attribution server-side.
5. Add a pluggable AI provider with usage limits and explicit cost disclosure.
6. Implement scheduled workflows, retries, deduplication, and notifications.
7. Add automated tests and production security review.

**Data integrity rule:** disconnected and unavailable data must never be replaced with made-up figures. Keep drafts and publishing status separate, and require explicit approval before public or billable actions.
