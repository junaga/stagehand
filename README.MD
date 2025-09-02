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
OPENAI_API_MODEL="gpt-4o" # https://openrouter.ai/models

PLAYWRIGHT_BROWSERS_PATH="/usr/local/lib/playwright"
```

## run

running `hello.js` costs about `$0.01`.

```sh
set -a
. .env
node src/hello.js
```
