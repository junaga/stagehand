import type { ConstructorParams, LogLine } from "@browserbasehq/stagehand";

/**
 * Get an environment variable and throw an error if it's not found
 * @param name - The name of the environment variable
 * @returns The value of the environment variable
 */
function getEnvVar(name: string): string | undefined {
  const value = process.env[name];
  if (value) return value;
  throw new Error(`${name} not found in environment variables`);
}

export default {
  modelName: "gpt-4o-mini", // "o1-mini"
  headless: false /* Run browser in headless mode */,
  debugDom: true /* Enable DOM debugging features */,
  domSettleTimeoutMs: 30_000 /* Timeout for DOM to settle in milliseconds */,
  enableCaching: false /* Enable caching functionality */,
  env: "LOCAL",
  modelClientOptions: { apiKey: getEnvVar("OPENAI_API_KEY") },
  logger: (message: LogLine) => console.log(logLineToString(message)) /* Custom logging function */,
} satisfies ConstructorParams;

/**
 * Custom logging function that you can use to filter logs.
 *
 * General pattern here is that `message` will always be unique with no params
 * Any param you would put in a log is in `auxiliary`.
 *
 * For example, an error log looks like this:
 *
 * ```
 * {
 *   category: "error",
 *   message: "Some specific error occurred",
 *   auxiliary: {
 *     message: { value: "Error message", type: "string" },
 *     trace: { value: "Error trace", type: "string" }
 *   }
 * }
 * ```
 *
 * You can then use `logLineToString` to filter for a specific log pattern like
 *
 * ```
 * if (logLine.message === "Some specific error occurred") {
 *   console.log(logLineToString(logLine));
 * }
 * ```
 */
export function logLineToString(logLine: LogLine): string {
  // If you want more detail, set this to false. However, this will make the logs
  // more verbose and harder to read.
  const HIDE_AUXILIARY = true;

  try {
    const timestamp = logLine.timestamp || new Date().toISOString();
    if (logLine.auxiliary?.error) {
      return `${timestamp}::[stagehand:${logLine.category}] ${logLine.message}\n ${logLine.auxiliary.error.value}\n ${logLine.auxiliary.trace.value}`;
    }

    // If we want to hide auxiliary information, we don't add it to the log
    return `${timestamp}::[stagehand:${logLine.category}] ${logLine.message} ${
      logLine.auxiliary && !HIDE_AUXILIARY
        ? JSON.stringify(logLine.auxiliary)
        : ""
    }`;
  } catch (error) {
    console.error(`Error logging line:`, error);
    return "error logging line";
  }
}
