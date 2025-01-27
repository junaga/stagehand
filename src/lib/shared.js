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
