import {
  populateScores,
  isStrike,
  isSpare,
  getFrameFirstRoll,
  sumFrameRolls,
  calculateFrameTotalScore,
  calculateScores,
} from "./game";

describe("populateScores()", () => {
  it("should generate scores array from empty array for 0 pins", () => {
    expect(populateScores([], 0)).toEqual([[0]]);
  });

  it("should generate scores array from empty array with 10 pins", () => {
    expect(populateScores([], 10)).toEqual([[10, "X"]]);
  });

  it("should generate scores array from non-empty array with 0 pins", () => {
    expect(populateScores([[0]], 0)).toEqual([[0, 0]]);
  });

  it("should generate scores array from non-empty array with 5 pins", () => {
    expect(populateScores([[1]], 5)).toEqual([[1, 5]]);
  });

  it("should generate scores array from non-empty array with 8 pins", () => {
    expect(populateScores([[2]], 8)).toEqual([[2, 8]]);
  });
});

describe("isStrike()", () => {
  it("should return false for empty array", () => {
    expect(isStrike([])).toEqual(false);
  });

  it("should return false for non-empty array not containing X", () => {
    expect(isStrike([1, 2])).toEqual(false);
  });

  it("should return true for non-empty array containing X", () => {
    expect(isStrike([10, "X"])).toEqual(true);
  });
});

describe("isSpare()", () => {
  it("should return false for empty array", () => {
    expect(isSpare([])).toEqual(false);
  });

  it("should return false for array containing X", () => {
    expect(isSpare([10, "X"])).toEqual(false);
  });

  it("should return false for array containing only one element", () => {
    expect(isSpare([9])).toEqual(false);
  });

  it("should return true for array containing numbers which add to 10", () => {
    expect(isSpare([5, 5])).toEqual(true);
  });
});

describe("getFrameFirstRoll()", () => {
  it("should return 0 for undefined", () => {
    expect(getFrameFirstRoll(undefined)).toEqual(0);
  });

  it("should return 0 for empty array", () => {
    expect(getFrameFirstRoll([])).toEqual(0);
  });

  it("should return first element of array containing 1 element", () => {
    expect(getFrameFirstRoll([10])).toEqual(10);
  });

  it("should return first element of array containing 2 elements", () => {
    expect(getFrameFirstRoll([2, 5])).toEqual(2);
  });
});

describe("sumFrameRolls()", () => {
  it("should return 0 for undefined", () => {
    expect(sumFrameRolls(undefined)).toEqual(0);
  });

  it("should return 0 for empty array", () => {
    expect(sumFrameRolls([])).toEqual(0);
  });

  it("should return first element for array containing 1 element", () => {
    expect(sumFrameRolls([5])).toEqual(5);
  });

  it("should return 10 for array containing isStrike value", () => {
    expect(sumFrameRolls([10, "X"])).toEqual(10);
  });

  it("should return 10 for array containing isSpare value", () => {
    expect(sumFrameRolls([5, 5])).toEqual(10);
  });

  it("should return sum of first 2 elements of array containing 2 elements", () => {
    expect(sumFrameRolls([2, 6])).toEqual(8);
  });

  it("should return sum of first 2 elements of array containing 2 elements", () => {
    expect(sumFrameRolls([1, 9, 10])).toEqual(10);
  });
});

describe("calculateFrameTotalScore()", () => {
  it("should return 0 if currentFrameScore and nextFrameScore are empty arrays", () => {
    expect(calculateFrameTotalScore([], [])).toEqual(0);
  });

  it("should return 16 if currentFrameScore is a strike and nextFrameScore is [3, 3]", () => {
    expect(calculateFrameTotalScore([10, "X"], [3, 3])).toEqual(16);
  });

  it("should return 20 if currentFrameScore is a strike and nextFrameScore is a spare", () => {
    expect(calculateFrameTotalScore([10, "X"], [5, 5])).toEqual(20);
  });

  it("should return 20 if currentFrameScore and nextFrameScore are strikes and no nextNextFrameScore", () => {
    expect(calculateFrameTotalScore([10, "X"], [10, "X"])).toEqual(20);
  });

  it("should return 30 if currentFrameScore, nextFrameScore and nextNextFrameScore are strikes", () => {
    expect(calculateFrameTotalScore([10, "X"], [10, "X"], [10, "X"])).toEqual(
      30
    );
  });

  it("should return 25 if currentFrameScore and nextFrameScore are strikes and nextNextFrameScore is a spare", () => {
    expect(calculateFrameTotalScore([10, "X"], [10, "X"], [5, 5])).toEqual(25);
  });

  it("should return 13 if currentFrameScore is a spare and nextFrameScore is [3, 3]", () => {
    expect(calculateFrameTotalScore([5, 5], [3, 3])).toEqual(13);
  });

  it("should return 20 if currentFrameScore is a spare and nextFrameScore is a strike", () => {
    expect(calculateFrameTotalScore([5, 5], [10, "X"])).toEqual(20);
  });

  it("should return 15 if currentFrameScore and nextFrameScore are spares", () => {
    expect(calculateFrameTotalScore([5, 5], [5, 5])).toEqual(15);
  });

  it("should return 9 for currentFrameScore [3, 6]", () => {
    expect(calculateFrameTotalScore([3, 6], [])).toEqual(9);
  });
});

describe("calculateScores()", () => {
  it("should return empty array for empty array", () => {
    expect(calculateScores([])).toEqual([]);
  });

  it("should return [[1, 2, 3]] for [[1, 2]]", () => {
    expect(calculateScores([[1, 2]])).toEqual([[1, 2, 3]]);
  });

  it("should return [[5, 5, 10]] for [[5, 5]]", () => {
    expect(calculateScores([[5, 5]])).toEqual([[5, 5, 10]]);
  });

  it('should return [[10, "X", 10]] for [[10, "X"]]', () => {
    expect(calculateScores([[10, "X"]])).toEqual([[10, "X", 10]]);
  });

  it("should return [[1, 2, 3]] for [[1, 2, 3]]", () => {
    expect(calculateScores([[1, 2, 3]])).toEqual([[1, 2, 3]]);
  });

  it('should return [[10, "X", 13], [1, 2, 3]] for [[10, "X", 10], [1, 2, 3]]', () => {
    expect(
      calculateScores([
        [10, "X", 10],
        [1, 2, 3],
      ])
    ).toEqual([
      [10, "X", 13],
      [1, 2, 3],
    ]);
  });

  it('should return [[10, "X", 20], [10, "X", 10]] for [[10, "X", 10], [10, "X", 10]]', () => {
    expect(
      calculateScores([
        [10, "X", 10],
        [10, "X", 10],
      ])
    ).toEqual([
      [10, "X", 20],
      [10, "X", 10],
    ]);
  });

  it("should return [[5, 5, 11], [1, 2, 3]] for [[5, 5, 10], [1, 2, 3]]", () => {
    expect(
      calculateScores([
        [5, 5, 10],
        [1, 2, 3],
      ])
    ).toEqual([
      [5, 5, 11],
      [1, 2, 3],
    ]);
  });
});
