const GAME_RULES = [
  '- A game consists of 10 frames.',
  '- In general each frame has 2 rolls.',
  '- In general a player scores the number of pins knocked down.',
  '- If the player knocks down all 10 pins on the first roll it’s a strike. The player scores 10 plus the number of pins knocked down in the next two rolls.',
  '- If the player knocks down all 10 pins in two rolls it’s a spare. The player scores 10 plus the number of pins knocked down in the next roll.',
  '- The player gets additional rolls in the last frame: one additional for a spare after the second roll or two extra rolls for a strike.'
];

const MAX_NUMBER_OF_FRAMES = 10;
const MAX_NUMBER_OF_PINS = 10;

export {
  GAME_RULES,
  MAX_NUMBER_OF_FRAMES,
  MAX_NUMBER_OF_PINS
}