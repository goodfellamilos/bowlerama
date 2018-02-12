# bowlerama
Bowling game scoring system

## Challenge
Bowling Challenge

- Implement a scoring system for a bowling game according to these rules:
- A game consists of 10 frames. 
- In general each frame has 2 rolls. 
- In general a player scores the number of pins knocked down. 
- If the player knocks down all 10 pins on the first roll it’s a strike. The player scores 10 plus the number of pins knocked down in the next two rolls. 
- If the player knocks down all 10 pins in two rolls it’s a spare. The player scores 10 plus the number of pins knocked down in the next roll. 
- The player gets additional rolls in the last frame: one additional for a spare after the second roll or two extra rolls for a strike. 

## Implementation
App is implemented using `react` and `redux` and bootstrapped with `create-react-app`. All points implemented except additional rolls in last frame.
Game supports multiple players as well as single player. Random selection of pins is also implemented. 
Game is finished after each of the players completed 10 frames and winner or winners (if multiple players have same total score) are shown.

## Usage
```
yarn
yarn start
open http://localhost:3000
```

## Tests
```
yarn test
```

Tests implemented using ``enzyme`` and `jest`