import { Stagehand } from "@browserbasehq/stagehand"
import { envar } from "./node.js"

const OPENAI_API = envar("OPENAI_API")
const OPENAI_API_KEY = envar("OPENAI_API_KEY")
const OPENAI_API_MODEL = envar("OPENAI_API_MODEL")

async function fetchPricing() {
  const [vendor, name] = OPENAI_API_MODEL.split("/")
  const url = `${OPENAI_API}/models/${vendor}/${name}/endpoints`

  const response = await fetch(url)
  const data = await response.json()

  const { prompt, completion } = data.data.endpoints[0].pricing

  return {
    text: {
      input: parseFloat(prompt),
      output: parseFloat(completion)
    }
  }
}

export function estimate(pricing, metrics) {
  const input = metrics.totalPromptTokens * pricing.text.input
  const output = metrics.totalCompletionTokens * pricing.text.output
  return input + output
}

/**
 * Initialize and configure the Stagehand client
 * @param {Object} options
 * @param {boolean} options.headless - Launch a visible browser window
 * @param {boolean} options.devtools - Launch a browser with devtools
 * @returns {Promise<Stagehand>}
 */
export async function init(options) {
  const { headless = false, devtools = false } = options || {}

  // https://github.com/browserbase/stagehand/issues/790
  const modelnNameFix790 = OPENAI_API_MODEL.split("/").pop()

  const browser = new Stagehand({
    env: "LOCAL",
    modelName: modelnNameFix790,
    modelClientOptions: { apiKey: OPENAI_API_KEY, baseURL: OPENAI_API },
    localBrowserLaunchOptions: { headless, devtools }
  })

  await browser.init()

  return { browser, pricing: await fetchPricing() }
}
