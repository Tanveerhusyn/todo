/// <reference types="cypress" />

describe("E2E Testing of the Todo App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });


  it("Add new task by pressing the enter button", () => {
    const task = "This is a sudo task added by pressing the enter button";
    cy.get("#textInput").type(`${task}{enter}`);
  });
  it("Add new todo by clicking on the add button", () => {
    const task = "Task added by clicking on the add button";
    cy.get("#textInput").type(`${task}`);
    cy.get("#addBtn").click();
  });
  it("Delete a specific task", () => {
    
    cy.get("#dotBtn").click();
    cy.get("#delete-button").click();
  });
  it("Mark a specific task as completed by clicking on a checkbox", () => {
    
    cy.get('.Todo_checkmark__EVXD1').click({ multiple: true })

  });

});
