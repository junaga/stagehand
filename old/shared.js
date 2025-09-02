/**
 * Wait for amount of `time`.
 *
 * @param {number} time - milliseconds
 * @returns {Promise}
 * @description 1 second is 1000 milliseconds.
 */
export async function sleep(time) {
	await new Promise(callback => setTimeout(callback, time))
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function humanClick(page, instruction) {
  const min = 90
  const max = 320

	await sleep(rand(min, max))
  await page.act(instruction)
}

export async function humanType(page, text) {
  const letters = text.split("")

  for (const letter of letters) {
    const min = 40
    const max = 110

    await sleep(rand(min, max))
    await page.keyboard.type(letter)
  }
}
