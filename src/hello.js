import { init, estimate } from "./init.js"

async function main() {
  const { browser, pricing } = await init()
  let cost = 0.0

  const tab = browser.page
  await tab.goto("https://stagehand.dev")

  const elements = await tab.observe("What can I click on this page?")
  const observations = elements.map((o) => o.description)
  cost += estimate(pricing, browser.metrics)

  const { extraction } = await tab.extract("Extract the page heading")
  cost += estimate(pricing, browser.metrics)

  const { action } = await tab.act("Click the 'Docs' button.")
  cost += estimate(pricing, browser.metrics)

  // const agent = browser.agent({ instructions: "You are a helpful web assistant." })
  // const data = await agent.execute("What is the most accurate model to use in Stagehand?")
  // cost = cost + estimate(pricing, browser.metrics).total

  console.log({ observations, extraction, action, cost })

  await browser.close()
}

main()
