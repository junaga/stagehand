import { env } from "node:process"

/**
 * Throw an error if the environment variable is missing
 * @param name - environment variable name
 * @returns environment variable value
 */
export function envar(name) {
  const value = env[name]
  if (value) return value

  throw new Error({ env: name, msg: "environment variable not set, or not exported" })
}
