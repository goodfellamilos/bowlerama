import { generateArrFromN } from "./utils";

describe("generateArrFromN()", () => {
  it("should generate empty array for N = 0", () => {
    expect(generateArrFromN(0)).toEqual([]);
  });

  it("should generate array [0, 1, 2] for N = 3", () => {
    expect(generateArrFromN(3)).toEqual([0, 1, 2]);
  });

  it("should generate array [0...11] for N = 11", () => {
    expect(generateArrFromN(11)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("should generate array of length 100 for N = 100", () => {
    expect(generateArrFromN(100).length).toEqual(100);
  });
});
