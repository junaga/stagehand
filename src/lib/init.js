import { Stagehand } from "@browserbasehq/stagehand"
import { envar } from "./node.js"
import { rez } from "./rez.js"

const LLM_API = envar("LLM_API")
const LLM_API_KEY = envar("LLM_API_KEY")
const LLM_API_MODEL = envar("LLM_API_MODEL")

async function fetchPricing() {
  const [provider, name] = LLM_API_MODEL.split("/")
  const url = `${LLM_API}/models/${provider}/${name}/endpoints`

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
 * @param {boolean} options.headless - Skip rendering the browser; no visible window
 * @returns {Promise<Stagehand>}
 */
export async function init(options) {
  const { headless = true } = options || {}

  // https://github.com/browserbase/stagehand/issues/790
  const modelnNameFix790 = LLM_API_MODEL.split("/").pop()

  const browser = new Stagehand({
    env: "LOCAL",
    modelName: modelnNameFix790,
    modelClientOptions: { apiKey: LLM_API_KEY, baseURL: LLM_API },
    localBrowserLaunchOptions: {
      headless: headless,
      devtools: false,
      viewport: { width: rez["HD"].width, height: rez["HD"].height },
      downloadsPath: "/tmp/downloads"
    }
  })

  await browser.init()

  return { browser, pricing: await fetchPricing() }
}
