# Welcome to Stagehand [--github](https://github.com/browserbase/stagehand)

[Stagehand](https://www.stagehand.dev/) is an SDK for automating browsers. It's built on top of [Playwright](https://playwright.dev/) and provides a higher-level API for better debugging and AI fail-safes. [examples](https://github.com/browserbase/stagehand/tree/main/examples).

```bash
# installation from junaga
node --version # v23
npm --version # v10
npx create-browser-app
```

## setup

You need an `OPENAI_API_KEY` and like `$1` Credit balance.

- https://platform.openai.com/settings/organization/api-keys
- https://platform.openai.com/settings/organization/billing/overview

```bash
npm install
export OPENAI_API_KEY="<YOUR API KEY>"
npm start
```

## list models

```bash
export OPENAI_API_KEY="<YOUR API KEY>"
curl https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY" > models.log
# copy a model
rm models.log
```

for example `o1-preview`, save it in `./main.js#config.modelName`
