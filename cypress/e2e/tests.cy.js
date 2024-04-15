/// <reference types="cypress" />

describe("tictactoe", () => {
  beforeEach(() => {
    // Run before each test case, basically - visit the page.
    cy.visit("http://localhost:5173/");
  });

  it("Checking so a gamesquare exists, yay.", () => {
    // Use cy.get() to select the div element by its class
    cy.get(".gameSquare").should("have.length", 9);
  });
});
