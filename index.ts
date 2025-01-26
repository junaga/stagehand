import { Stagehand } from "@browserbasehq/stagehand"
import { main } from "./src/main.js"
import Config from "./config.js"

async function run() {
  const stagehand = new Stagehand(Config);
  await stagehand.init();

  const page = stagehand.page;
  const context = stagehand.context;
  await main({ page, context, stagehand, });
  await stagehand.close();
}

run();
