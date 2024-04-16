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
  it("Check that gameBoard exists.", () => {
    cy.get('.gameBoard').should('exist');
  });
it('check mouseover', () => {
  // Assuming you already have the page loaded and don't need to visit it again

  // Trigger mouseover event on the .gameSquare element
  cy.get('.gameSquare').trigger('mouseover');

  // Check if the color of the .gameSquare changes to 'lightSalmon'
  cy.get('.gameSquare')
    .should('have.css', 'background-color')
    .and('equal', 'rgb(255, 160, 122)'); // 'lightSalmon' color in rgb format
});



});
