import { sleep } from "./lib/shared.js"
import { z } from "zod"

/**
 * @param {import("@browserbasehq/stagehand").Page} page 
 */
export async function run(page) {
  await page.goto("https://www.rolimons.com/catalog")
  await page.act("Accept all cookies")

  const items = await page.extract({
    instruction: "titles of all the game items on the page",
    schema: z.object({ array: z.array(z.string()) }),
  })

  await page.act("click on the second page")
  const items2 = await page.extract({
    instruction: "titles of all the game items on the page",
    schema: z.object({ array: z.array(z.string()) }),
  })

  console.log({ items, items2 })

  await page.close()
}
