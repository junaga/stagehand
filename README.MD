# Welcome to Stagehand [--github](https://github.com/browserbase/stagehand)

Stagehand is an SDK for automating browsers. It's built on top of [Playwright](https://playwright.dev/) and provides a higher-level API for better debugging and AI fail-safes.

```bash
node --version # v23
npm --version # v10
npx create-browser-app
```

- [examples](https://github.com/browserbase/stagehand/tree/main/examples)

## get a model

```bash
export OPENAI_API_KEY="<YOUR API KEY>"
curl https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY" > models.log
# copy a model
rm models.log
```

for example `gpt-4o-mini`, save it in `./config.ts`

## setup

```bash
npm install
export OPENAI_API_KEY="<YOUR API KEY>"
npm start
```

### Custom .cursorrules

We have custom .cursorrules for this project. It'll help quite a bit with writing Stagehand easily.
