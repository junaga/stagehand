/**
 * Get an environment variable and throw an error if it's not found
 * @param name - The name of the environment variable
 * @returns The value of the environment variable
 */
export function getEnvVar(name) {
  const value = process.env[name];
  if (value) return value;
  throw new Error(`${name} not found in environment variables`);
}
