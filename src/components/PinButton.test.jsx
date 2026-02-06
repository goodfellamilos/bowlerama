import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PinButton from "./PinButton";

describe("PinButton component", () => {
  it("renders without crashing component PinButton", () => {
    render(
      <PinButton
        playerId={"_playerNumberOne_"}
        numberOfPins={4}
        onClick={(e) => e}
      />
    );
  });

  it("renders button", () => {
    render(
      <PinButton
        playerId={"_playerNumberOne_"}
        numberOfPins={4}
        onClick={(e) => e}
      />
    );
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("renders button disabled false", () => {
    render(
      <PinButton
        playerId={"_playerNumberTwo_"}
        numberOfPins={7}
        onClick={(e) => e}
      />
    );
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("renders button disabled true", () => {
    render(
      <PinButton
        playerId={"_playerNumberThree_"}
        numberOfPins={10}
        disabled={true}
        onClick={(e) => e}
      />
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick with correct arguments when clicked", () => {
    const handleClick = vi.fn();
    render(
      <PinButton
        playerId={"_playerNumberFour_"}
        numberOfPins={8}
        onClick={handleClick}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledWith("_playerNumberFour_", 8);
  });
});
