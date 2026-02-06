import React from "react";
import { render, screen } from "@testing-library/react";
import ListItemWrapper from "./ListItemWrapper";

describe("ListItemWrapper component", () => {
  it("renders without crashing component ListItemWrapper", () => {
    render(
      <ListItemWrapper
        player={{
          name: "Player Number One",
          id: "_playerNumberOne_",
          scores: [],
        }}
        onClick={(e) => e}
      />
    );
  });

  it("displays the player name", () => {
    render(
      <ListItemWrapper
        player={{
          name: "Player Number One",
          id: "_playerNumberOne_",
          scores: [],
        }}
        onClick={(e) => e}
      />
    );
    expect(screen.getByText("Player Number One")).toBeTruthy();
  });
});
