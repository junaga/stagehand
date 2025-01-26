/**
 * @param {import("@browserbasehq/stagehand").Page} page 
 */
export async function run(page) {
  console.log("Navigating to Google...")
  await page.goto("https://google.com/")
  console.log("arrived")
  const res = await page.act("Accept all cookies")
  await page.close()
}
