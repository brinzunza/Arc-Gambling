# Arc Gambling (https://arcgambling.netlify.app/)

This is a simple interactive gambling game built using D3.js for visualizations. The user starts with 10,000 points and can bet points on a section of the arc. If the spinning arc lands in the user's selected range, they win; otherwise, they lose the bet.

## How It Works

- The user can enter the **start** and **end** angles for their betting range (between 0° and 360°).
- The user places a **bet** for a certain number of points.
- When the user clicks the **Start Game** button, the arc begins to rotate randomly.
- After each spin, the game checks if the final position of the arc is within the user's selected range:
  - If the arc stops within the range, the user wins.
  - If the arc stops outside the range, the user loses.
- The user can press **Pause Game** to stop the game at any time.

## Features

- **Initial Points**: The user starts with 10,000 points.
- **Betting Range**: The user can select any angle range between 0° and 360°.
- **Dynamic Arc**: The arc spins randomly after the user starts the game.
- **Real-time Results**: After each spin, the result (win or loss) is displayed on the page, and the user's points are updated.
- **Pause Feature**: The user can pause the game to stop the arc from spinning and avoid losing points.
