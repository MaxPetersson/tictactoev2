/// <reference types="cypress" />

describe("tictactoe DOM checkers", () => {
  beforeEach(() => {
    // Run before each test case, basically - visit the page.
    cy.visit("/");
  });

  it("Checking so a gamesquare exists, yay.", () => {
    // Use cy.get() to select the div element by its class
    cy.get(".gameSquare").should("have.length", 9);
  });

  it("Check that gameBoard exists.", () => {
    cy.get(".gameBoard").should("exist");
  });

  it("Check mouseover", () => {
    // Trigger mouseover event on the first .gameSquare element
    cy.get(".gameSquare").eq(0).trigger("mouseover");

    // Check if the color of the first .gameSquare changes to 'lightSalmon'
    cy.get(".gameSquare")
      .eq(0)
      .should("have.css", "background-color")
      .and("equal", "rgb(255, 160, 122)"); // 'lightSalmon' color in rgb format
  });
});

describe("tictactoe Playflow", () => {
  beforeEach(() => {
    // Run before each test case, basically - visit the page.
    cy.visit("/");
  });
  it("Play a move.", () => {
    cy.get(".gameSquare").eq(4).click();
  });
});
