describe('Test the Todo App', () => {
  beforeEach(() => {
    cy.fixture('example').then((data) => {
      cy.visit('http://localhost:5500/index.html', {
        onBeforeLoad(win) {
          win.localStorage.setItem('todoTasks', JSON.stringify(data.todos));
          win.localStorage.setItem('todoNextId', (data.todos.length + 1).toString());
        },
      });
    });
  });

  it('Visits index.html page', () => {
    cy.url().should('include', 'index.html');
  });

  it('Renders the Header', () => {
    cy.contains('h1', 'My Tasks', { timeout: 6000 }).should('be.visible');
  });

  it('Shows all tasks ', () => {
    cy.get('[data-filter="all"]').click();
    cy.get('.todo-item').should('have.length', 3);  
    cy.get('[data-filter="all"]').should('have.class', 'active');
  });

  it('Shows only active tasks when "Active" button is clicked', () => {
    cy.get('[data-filter="active"]').click();

    // Assert that only incomplete tasks are visible
    cy.get('.todo-item.completed').should('not.exist');
    cy.get('.todo-item').should('have.length', 2);

    // Filter button state
    cy.get('[data-filter="active"]').should('have.class', 'active');
    cy.get('[data-filter="completed"]').should('not.have.class', 'active');
  });

  it('Shows only completed tasks when "Completed" button is clicked', () => {
    cy.get('[data-filter="completed"]').click();

    // Only completed task should show
    cy.get('.todo-item.completed').should('have.length', 1);
    cy.get('.todo-item:not(.completed)').should('not.exist');

    // Filter button state
    cy.get('[data-filter="completed"]').should('have.class', 'active');
    cy.get('[data-filter="active"]').should('not.have.class', 'active');
  });

  it('Adds a task', () => {
    cy.get("input[name='taskInput']").type('New Cypress Task');
    cy.get('#addBtn').click();
    cy.get("input[name='taskInput']").should('have.value', '');

    cy.get('#totalTasks').should('contain.text', '4');
    cy.get('.todo-item').should('have.length', 4);  
    cy.get('.todo-item').first().should('contain.text', 'New Cypress Task');
  });

  it('Checks a task as Completed', () => {
    cy.get('.todo-item').first().as('firstTask');
    cy.get('@firstTask').find('.checkbox').click();

    // Assert that the "completed" class is added
    cy.get('@firstTask').should('have.class', 'completed');

  })

  it('deletes a task',  () => {
    cy.get('.todo-item').last().as('lastTask');
    cy.get('@lastTask').find('.delete-btn').click();

    // Assert that the task is removed 
    cy.get('#totalTasks').should('contain.text', '2');
    cy.get('.todo-item').should('have.length', 2); 
  })

  it('Clears completed tasks when "Clear Completed" is clicked', () => {
    // Ensure there is at least one completed task before clearing
    cy.get('.todo-item.completed').should('exist');

    // Click the "Clear Completed" button
    cy.get('#clearCompleted').click();

    // The completed task(s) should be gone
    cy.get('.todo-item.completed').should('not.exist');

    // Total task count should decrease
    cy.get('#totalTasks').invoke('text').then(totalBefore => {
      const before = parseInt(totalBefore);
      expect(before).to.be.lessThan(4); // depends on your initial list
    });

    // The "Clear Completed" button should now be disabled
    cy.get('#clearCompleted').should('be.disabled');
  });
});
