/// <reference types="cypress" />

describe("tictactoe DOM checkers", () => {
  beforeEach(() => {
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
    cy.visit("/");
  });
  it("Play a move.", () => {
    cy.get(".gameSquare").eq(4).click();
    cy.get(".gameSquare").eq(1).click();
  });

  it("Win a game.", () => {
    cy.get(".gameSquare").eq(4).click();
    cy.get(".gameSquare").eq(1).click();
    cy.get(".gameSquare").eq(2).click();
    cy.get(".gameSquare").eq(3).click();
    cy.get(".gameSquare").eq(6).click();

    cy.get(".gameSquare")
      .eq(4)
      .should("have.css", "background-color")
      .and("equal", "rgb(144, 238, 144)"); // 'lightGreen' color in rgb format
    cy.get(".gameSquare")
      .eq(2)
      .should("have.css", "background-color")
      .and("equal", "rgb(144, 238, 144)"); // 'lightGreen' color in rgb format
    cy.get(".gameSquare")
      .eq(6)
      .should("have.css", "background-color")
      .and("equal", "rgb(144, 238, 144)"); // 'lightGreen' color in rgb format
  });

  it("Draw a game.", () => {
    cy.get(".gameSquare").eq(0).click();
    cy.get(".gameSquare").eq(1).click();
    cy.get(".gameSquare").eq(2).click();
    cy.get(".gameSquare").eq(3).click();
    cy.get(".gameSquare").eq(4).click();
    cy.get(".gameSquare").eq(8).click();
    cy.get(".gameSquare").eq(5).click();
    cy.get(".gameSquare").eq(6).click();
    cy.get(".gameSquare").eq(7).click();
  });
});
