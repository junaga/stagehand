import { goto } from "./lib/main.js"
/** @typedef {import("@browserbasehq/stagehand").Page} Page */

function query() {
  const section = "body > div.elementor.elementor-83960.elementor-location-archive.product > div.elementor-element.elementor-element-db5d353.e-flex.e-con-boxed.e-con.e-parent.e-lazyloaded > div > div > div > section > article"
  const products = [...document.querySelectorAll(section)]
  const data = []

  for (const product of products) {
    data.push({
      img: product.querySelector(".wpr-grid-image-wrap > img").src,
      name: product.querySelector("h2 a").innerHTML,
      url: product.querySelector("h2 a").href,
      price: product.querySelector(".woocommerce-Price-amount").innerText
    })
  }

  return data
}

/** @param {import("@browserbasehq/stagehand").Page} page */
export async function run(page) {
  const urls = [
    "https://meisterbetten.de/alle-modelle/",
    "https://meisterbetten.de/alle-modelle/page/2/",
    "https://meisterbetten.de/alle-modelle/page/3/",
    "https://meisterbetten.de/alle-modelle/page/4/"
  ]

  await goto(page, urls[0])
  await page.act("Accept all cookies")

  const data = []
  for (const url of urls) {
    await goto(page, url)
    const products = await page.evaluate(query)

    data.push(...products)
  }

  return data
}
