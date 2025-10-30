describe('Test the Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/index.html'); // or full URL
  });

  

  it('Visits index.html page', () => {
    // optional extra check
    cy.url().should('include', 'index.html');
    cy.window().then(win => {
      cy.log('Loaded script keys: ' + Object.keys(win));
    });
    cy.window().then(win => {
      cy.log('Script loaded:', win.console.log);
    });

  });

  it('Renders the Header', () => {
    cy.contains('h1', 'My Tasks', { timeout: 6000 }).should('be.visible');
  });

  it("Adds a task", () => {
    cy.get("input[name='taskInput']").type('New Cypress Task');
    cy.get('#addBtn').click();
    // cy.get("input[name='taskInput']").should('have.value', '');

    // cy.get('#totalTasks').should('contain.text', '1');
    // cy.get('.todo-item').should('contain.text', 'New Cypress Task');
  })
});
