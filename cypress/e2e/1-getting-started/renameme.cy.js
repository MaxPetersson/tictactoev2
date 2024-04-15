/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("tictactoe", () => {
  beforeEach(() => {
    // Run before each test case, basically - visit the page.
    cy.visit("http://localhost:5173/");
  });

  it("can add new todo items", () => {
    // Use cy.get() to select the div element by its class
    cy.get(".gameSquare").should("exist");
  });
});
