import { init, estimate } from "./lib/init.js"

async function main() {
  const { browser, pricing } = await init()

  const tab = browser.page
  await tab.goto("https://stagehand.dev")

  const question = "What can I click on this page?"
  const elements = await tab.observe(question)
  const observations = elements.map((o) => o.description)

  const thought = "Read the page heading"
  const { extraction } = await tab.extract(thought)

  const intent = "Click the 'Docs' button."
  const { action } = await tab.act(intent)

  // const agent = browser.agent({ instructions: "You are a helpful web assistant." })
  // const data = await agent.execute("What is the most accurate model to use in Stagehand?")
  // cost = cost + estimate(pricing, browser.metrics).total

  const cost = estimate(pricing, browser.metrics)
  console.log({ observations, extraction, action, cost })

  await browser.close()
}

main()
