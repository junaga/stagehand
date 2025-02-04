import { goto } from "./lib/main.js"
import { humanClick, humanType, sleep } from "./lib/shared.js"
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

/** @param {import("@browserbasehq/stagehand").Page} page */
export async function run(page) {
  await goto(page, "https://x.com/")
  await humanClick(page, "Accept all cookies")
  await humanClick(page, "click on Signin")
  await humanClick(page, "click on the 'Phone, email or username' field")
  await humanType(page, "thefunnyscraperguy@gmail.com")
  await sleep(5000)
}
