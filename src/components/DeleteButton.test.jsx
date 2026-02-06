import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteButton from "./DeleteButton";

describe("DeleteButton component", () => {
  it("renders without crashing component DeleteButton", () => {
    render(<DeleteButton onClick={(e) => e} />);
  });

  it("renders button", () => {
    render(<DeleteButton onClick={(e) => e} />);
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<DeleteButton onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });
});
