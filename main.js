// import { run } from "./src/meisterbetten.js"
import { run } from "./src/twitter.js"
import { Stagehand } from "@browserbasehq/stagehand"
import { getEnvVar } from "./src/lib/node.js"

/** @type {import("@browserbasehq/stagehand").ConstructorParams} */
const config =  {
  modelClientOptions: { apiKey: getEnvVar("OPENAI_API_KEY") },
  modelName: "o1-mini", // or "o1-mini"

  enableCaching: true,
  env: "LOCAL",
  verbose: 1, /* Logging verbosity level (0=quiet, 1=normal, 2=verbose) */
  headless: false /* Run browser in headless mode */,
  debugDom: true /* Enable DOM debugging features */,
  domSettleTimeoutMs: 30_000 /* Timeout for DOM to settle in milliseconds */,
  enableCaching: false /* Enable caching functionality */,
  // logger: _ => _
}

async function main(config) {
  const stagehand = new Stagehand(config)
  await stagehand.init()
  const data = await run(stagehand.page)
  console.log(JSON.stringify(data, null, 2))

  await stagehand.page.close()
  await stagehand.close()
}

main(config)
