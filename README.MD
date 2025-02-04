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

## working with NIK

### 2025-03-02

- VPS on https://contabo.com/en/

```
# from @niklavs on discord on 2025-02-03
NIK_SERVER_HOSTNAME="<ip or domain>"
NIK_SERVER_USERNAME="<linux user>"
NIK_SERVER_PASSWORD="<linux user password>"
```

- `+66` phone number on https://onlinesim.io/
- email on `gmail.com`
- `@thefunnySJ` Twitter account from email and phone number

### get to the server

```bash
sudo apt update
sudo apt -qq upgrade -y
sudo apt -qq autoremove -y
sudo apt -qq install -y ssh sshfs

# set credentials
export NIK_SERVER_HOSTNAME="<ip or domain>"
export NIK_SERVER_USERNAME="<linux user>"

# make sure SSH public key `~/.ssh/*.pub exist` exists
ssh-keygen -t rsa -b 4096 -C "$USER@$HOSTNAME"

# upload public SSH key to login without password in the future
ssh-copy-id -o StrictHostKeyChecking=accept-new $NIK_SERVER_USERNAME@$NIK_SERVER_HOSTNAME
# type in `NIK_SERVER_PASSWORD`

# test connection
ssh $NIK_SERVER_USERNAME@$NIK_SERVER_HOSTNAME
ls ~
exit

# mount server filesystem
mkdir -p ./remote/
sshfs $NIK_SERVER_USERNAME@$NIK_SERVER_HOSTNAME:/root/twitterbot/ ./remote/

# unmount server filesystem
fusermount --unmount ./remote/ && rm -fr ./remote/
```
