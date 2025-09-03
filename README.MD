- [openrouter.ai](https://openrouter.ai)
- [playwright.dev](https://playwright.dev)
- [stagehand.dev](https://www.stagehand.dev)

Stagehand is a library for automating browsers; It's OpenAI + Playwright!

# Stagehand

> Why Developers Choose Stagehand [--stagehand.dev](https://docs.stagehand.dev/first-steps/introduction#why-developers-choose-stagehand)
>
> - Precise Control: Mix AI-powered actions with deterministic code. You decide exactly how much AI to use.
> - Actually Repeatable: Save and replay actions exactly. No more “it worked on my machine” with browser automations.
> - Maintainable at Scale: One script can automate multiple websites. When sites change, your automations adapt.
> - Composable Tools: Choose your level of automation with Act, Extract, Observe, and Agent.

## install

```sh
# compat env
uname # Linux
node --version # 18
npm --version # 9
LIB="/usr/local/lib"

# inst deps
PLAYWRIGHT_BROWSERS_PATH="/usr/local/lib/playwright" npm install
```

```sh
# we got browsers!
export PLAYWRIGHT_BROWSERS_PATH="/usr/local/lib/playwright"
npx playwright cr youtube.com
npx playwright ff youtube.com
npx playwright wk youtube.com
```

## config

1. Sign up https://openrouter.ai
2. Go to https://openrouter.ai/settings/credits
3. Click **Add Credits**
4. Enter **Card**; **Purchase** `5` Credits
5. Go to https://openrouter.ai/settings/keys
6. Click **Create API Key**
7. Name: `stagehand`; Credit limit: `5`
8. Copy the key
9. Create `.env` and paste the key

```sh
# .env
OPENAI_API="https://openrouter.ai/api/v1"
OPENAI_API_KEY="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"
OPENAI_API_MODEL="openai/gpt-4o" # https://openrouter.ai/models

PLAYWRIGHT_BROWSERS_PATH="/usr/local/lib/playwright"
```

## run

running `hello.js` with `gpt-4o-mini` costs about `$0.003`, _less than one cent_.

```sh
set -a

. .env
OPENAI_API_MODEL="openai/gpt-4o-mini"
node src/hello.js
```

## bug

in `npm:stagehand@2.4.4` supported models are hardcoded! That means `OPENAI_API_MODEL` can only be a `AvailableModelSchema` value, not any model in https://openrouter.ai/models. There are pull requests incoming to fix this.

```js
import { AvailableModelSchema } from "@browserbasehq/stagehand"
console.log(AvailableModelSchema)

log = [
  "gpt-4.1",
  "gpt-4.1-mini",
  "gpt-4.1-nano",
  "o4-mini",
  "o3",
  "o3-mini",
  "o1",
  "o1-mini",
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-4o-2024-08-06",
  "gpt-4.5-preview",
  "o1-preview",
  "claude-3-5-sonnet-latest",
  "claude-3-5-sonnet-20241022",
  "claude-3-5-sonnet-20240620",
  "claude-3-7-sonnet-latest",
  "claude-3-7-sonnet-20250219",
  "cerebras-llama-3.3-70b",
  "cerebras-llama-3.1-8b",
  "groq-llama-3.3-70b-versatile",
  "groq-llama-3.3-70b-specdec",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-1.5-flash-8b",
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash",
  "gemini-2.5-flash-preview-04-17",
  "gemini-2.5-pro-preview-03-25"
] // no `gpt-5` yet and `gemini-2.5-flash` id missing
```
