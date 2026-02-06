import { render, screen, fireEvent } from "@testing-library/react";
import RandomPinsButton from "./RandomPinsButton";

describe("RandomPinsButton component", () => {
  it("renders without crashing component RandomPinsButton", () => {
    render(
      <RandomPinsButton
        playerId={"_playerNumberOne_"}
        numberOfPins={0}
        onClick={(e) => e}
      />,
    );
  });

  it("renders button", () => {
    render(
      <RandomPinsButton
        playerId={"_playerNumberTwo_"}
        numberOfPins={5}
        onClick={(e) => e}
      />,
    );
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("calls onClick with correct arguments when clicked", () => {
    const handleClick = vi.fn();
    render(
      <RandomPinsButton
        playerId={"_playerNumberThree_"}
        numberOfPins={9}
        onClick={handleClick}
      />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledWith("_playerNumberThree_", 9);
  });
});
