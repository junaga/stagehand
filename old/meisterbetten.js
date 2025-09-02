import { goto } from "./main.js"
/** @typedef {import("@browserbasehq/stagehand").Page} Page */

function queryProducts() {
  const selector = "body > div.elementor.elementor-83960.elementor-location-archive.product > div.elementor-element.elementor-element-db5d353.e-flex.e-con-boxed.e-con.e-parent.e-lazyloaded > div > div > div > section > article"
  const products = [...document.querySelectorAll(selector)]
  const data = []

  for (const product of products) {
    data.push({
      name: product.querySelector("h2 a").innerHTML,
      img: product.querySelector(".wpr-grid-image-wrap > img").src,
      url: product.querySelector("h2 a").href,
      price: product.querySelector(".woocommerce-Price-amount").innerText
    })
  }

  return data
}

function queryFabrics() {
  const selector = ".wpforms-field.wpforms-field-checkbox.stoffmuster.wpforms-list-inline.wpforms-conditional-field.wpforms-conditional-show ul li"
  const products = [...document.querySelectorAll(selector)]
  const data = []

  for (const product of products) {
    data.push({
      name: product.querySelector("li > label > span:last-child").innerText,
      img: product.querySelector("img").src
    })
  }

  return data
}

/** @param {import("@browserbasehq/stagehand").Page} page */
export async function run(page) {
  await goto(page, "https://meisterbetten.de/")
  await page.act("Accept all cookies")

  // Stoffmuster
  await goto(page, "https://meisterbetten.de/stoffmuster/")
  const fabrics = await page.evaluate(queryFabrics)

  // Betten
  const beds = []
  const urls = [
    "https://meisterbetten.de/alle-modelle/",
    "https://meisterbetten.de/alle-modelle/page/2/",
    "https://meisterbetten.de/alle-modelle/page/3/",
    "https://meisterbetten.de/alle-modelle/page/4/"
  ]
  for (const url of urls) {
    await goto(page, url)
    const chunk = await page.evaluate(queryProducts)
    beds.push(...chunk)
  }

  return { fabrics, beds }
}
