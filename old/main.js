/** @typedef {import("@browserbasehq/stagehand").Page} Page */

/**
 * some content (e.g. images) is "lazy loaded"
 * this means it only downloads and renders when it becomes visible.
 * not with the first render.
 * we scroll down the entire page to load all lazy loaded content
 */
async function scrollToLoadLazyLoadedContent() {
  const html = document.firstElementChild

  while (true) {
    const viewport = window.innerHeight
    const done = html.scrollTop + viewport
    const total = html.scrollHeight
    if (done >= total) break

    html.scrollBy({ top: 200, behavior: "instant" })
    await new Promise(callback => setTimeout(callback, 100))
  }
}

/**
 * ignore old HTML pages without `<DOCTYPE>`
 * - Netscape Navigator 4 and earlier
 * - Microsoft Internet Explorer 5 and earlier
 * 
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode
 * 
 * @param {Page} page 
 * @param {string} url 
 */
async function ignoreQuirksMode(page, url) {
  const clientCode = _ => document.compatMode !== "CSS1Compat"
  const isQuirksMode = await page.evaluate(clientCode)
  if (isQuirksMode) {
    throw new Error({ url, msg: "Webpage is in Quirks Mode" })
  }
}

/**
 * @param {Page} page
 * @param {string} url
 */
export async function goto(page, url) {
  await page.goto(url)
  // await page.waitForLoadState("networkidle")
  await ignoreQuirksMode(page, url)
  await page.evaluate(scrollToLoadLazyLoadedContent)
}
