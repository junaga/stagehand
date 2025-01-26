import Config from "./config.js";
import {Stagehand } from "@browserbasehq/stagehand";
import { run } from "./com/browserbase.js";

async function main() {
  const stagehand = new Stagehand(Config);
  await stagehand.init();
  await run(stagehand.page);
  await stagehand.close();
}

main();
