const populateScores = (scores, numberOfPins) => {
  const scoresLength = scores.length;
  const currentFrame = scoresLength - 1;

  if (scoresLength && scores[currentFrame].length === 1) {
    scores[currentFrame].push(numberOfPins);
  } else {
    if (numberOfPins === 10) {
      scores.push([numberOfPins, 'X']);
    } else {
      scores.push([numberOfPins]);
    }
  }

  return scores;
};

const isStrike = score => score && score.includes('X');

const isSpare = score => score && !isStrike(score) && score.slice(0, 2).reduce((sum, val) => sum + val, 0) === 10;

const getFrameFirstRoll = score => score && score[0] ? score[0] : 0;

const sumFrameRolls = (score) => {
  if (score) {
    if (score.length === 1) {
      return Number(score.join(' '));
    }

    if (isStrike(score) || isSpare(score)) {
      return 10;
    }

    return score.slice(0, 2).reduce((sum, val) => sum + val, 0);
  }

  return 0;
};

const calculateFrameTotalScore = (currentFrameScore, nextFrameScore) => {
  if(isStrike(currentFrameScore)) {
    return 10 + sumFrameRolls(nextFrameScore);
  } else if(isSpare(currentFrameScore)) {
    return 10 + getFrameFirstRoll(nextFrameScore);
  } else {
    return sumFrameRolls(currentFrameScore);
  }
};

const calculateScores = (scores) => {
  for(let i = 0; i < scores.length; i++) {
    const currentFrameScore = scores[i];
    const nextFrameScore = scores[i + 1];
    const currentFrameTotalScore = calculateFrameTotalScore(currentFrameScore, nextFrameScore);

    if (currentFrameScore.length === 3) {
      currentFrameScore[2] = currentFrameTotalScore;
    } else if (currentFrameScore.length === 2) {
      currentFrameScore.push(currentFrameTotalScore);
    }
  }

  return scores;
};

export {
  populateScores,
  isStrike,
  isSpare,
  getFrameFirstRoll,
  sumFrameRolls,
  calculateFrameTotalScore,
  calculateScores
}
