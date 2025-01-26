import { run } from "./src/google.js"
import { Stagehand } from "@browserbasehq/stagehand"
import { getEnvVar } from "./lib.js"

/** @type {import("@browserbasehq/stagehand").ConstructorParams} */
const config =  {
  modelClientOptions: { apiKey: getEnvVar("OPENAI_API_KEY") },
  modelName: "gpt-4o-mini", // or "o1-mini"

  env: "LOCAL",
  verbose: 0, /* Logging verbosity level (0=quiet, 1=normal, 2=verbose) */
  headless: false /* Run browser in headless mode */,
  debugDom: true /* Enable DOM debugging features */,
  domSettleTimeoutMs: 30_000 /* Timeout for DOM to settle in milliseconds */,
  enableCaching: false /* Enable caching functionality */,
}

async function main(config) {
  const stagehand = new Stagehand(config)
  await stagehand.init()
  await run(stagehand.page)
  await stagehand.close()
}

main(config)
