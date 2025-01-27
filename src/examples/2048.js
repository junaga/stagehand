import { z } from "zod";
import { sleep } from "../lib/shared.js"

const RULES = `
  1. Keeping high value tiles in corners (bottom left, bottom right, top left, top right)
  2. Maintaining a clear path to merge tiles
  3. Avoiding moves that could block merges
  4. Only adjacent tiles of the same value can merge
  5. Making a move will move all tiles in that direction until they hit a tile of a different value or the edge of the board
  6. Tiles cannot move past the edge of the board
  7. Each move must move at least one tile
`

export async function run(page) {
  console.log("🎮 Starting 2048 bot...");
  try {
    console.log("🌐 Navigating to 2048...");
    await page.goto("https://ovolve.github.io/2048-AI/");
    console.log("⌛ Waiting for game to initialize...");
    await page.waitForSelector(".grid-container", { timeout: 10000 });

    while (true) {
      await sleep(300) // Add a small delay for UI updates
      // Get current game state
      const gameState = await page.extract({
        instruction: `Extract the current game state:
          1. Score from the score counter
          2. All tile values in the 4x4 grid (empty spaces as 0)
          3. Highest tile value present`,
        schema: z.object({
          score: z.number(),
          highestTile: z.number(),
          grid: z.array(z.array(z.number())),
        }),
      });
      const transposedGrid = gameState.grid[0].map((_, colIndex) =>
        gameState.grid.map((row) => row[colIndex]),
      );
      const grid = transposedGrid.map((row, rowIndex) => ({
        [`row${rowIndex + 1}`]: row,
      }));
      console.log("Game State:", {
        score: gameState.score,
        highestTile: gameState.highestTile,
        grid: grid,
      });

      // Analyze board and decide next move
      const analysis = await page.extract({
        instruction: `Based on the current game state:
          - Score: ${gameState.score}
          - Highest tile: ${gameState.highestTile}
          - Grid: This is a 4x4 matrix ordered by row (top to bottom) and column (left to right). The rows are stacked vertically, and tiles can move vertically between rows or horizontally between columns:\n${grid
            .map((row) => {
              const rowName = Object.keys(row)[0];
              return `             ${rowName}: ${row[rowName].join(", ")}`;
            })
            .join("\n")}
          What is the best move (up/down/left/right)? Consider: ${RULES}`,
        schema: z.object({
          move: z.enum(["up", "down", "left", "right"]),
          confidence: z.number(),
          reasoning: z.string(),
        }),
      });

      console.log("Move Analysis:", analysis);
      const moveKey = {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight",
      }[analysis.move];

      await page.keyboard.press(moveKey);
      console.log("🎯 Executed move:", analysis.move);
    }
  } catch (error) {
    console.error("❌ Error in game loop:", error);
    const isGameOver = await page.evaluate(() => {
      return document.querySelector(".game-over") !== null;
    });
    if (isGameOver) {
      console.log("🏁 Game Over!");
      return;
    }
    throw error; // Re-throw non-game-over errors
  }
}
