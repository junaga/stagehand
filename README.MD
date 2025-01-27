# Welcome to Stagehand [--github](https://github.com/browserbase/stagehand)

[Stagehand](https://www.stagehand.dev/) is a library for automating browsers. It's built on top of [Playwright](https://playwright.dev/) and provides a higher-level API for better debugging and AI fail-safes.

```bash
# setup from junaga
node --version # v23
npm --version # v10
npx create-browser-app
```

- [examples](https://github.com/browserbase/stagehand/tree/main/examples)
- [best practices](https://docs.stagehand.dev/get_started/best_practices)

## install

You need an `OPENAI_API_KEY` and like `$1` Credit balance.

- https://platform.openai.com/settings/organization/api-keys
- https://platform.openai.com/settings/organization/billing/overview

```bash
npm install
export OPENAI_API_KEY="<YOUR API KEY>"
node ./main.js
```

running `./main.js` costs about `$0.01`.

## list models

```bash
export OPENAI_API_KEY="<YOUR API KEY>"
curl https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY" > models.log
# copy a model
rm models.log
```

for example `o1-mini`, save it in `./main.js#config.modelName`

## development

The Stagehand APIs: `act`, `extract`, and `observe` expect [atomic, precise and stupid `prompts`](https://docs.stagehand.dev/get_started/best_practices#dont).

## todo

- [`ollama` instead of OpenAI API](https://github.com/browserbase/playbook/blob/main/examples/ollama_client.ts)
