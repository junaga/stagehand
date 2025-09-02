/**
 * @param {import("@browserbasehq/stagehand").Page} page 
 */
export async function run(page) {
  await page.goto("https://google.com/")

  await page.act("Accept all cookies")
  await page.act("Click on the search bar.")
  await page.act("Type 'Hello, World!' into the search bar")

  await page.close()
}
