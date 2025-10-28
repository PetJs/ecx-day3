/**
 * @jest-environment jsdom
 */
import { expect, jest } from '@jest/globals';
import { TodoApp } from '../script';

global.todoApp = {
    toggleTask: jest.fn(),
    deleteTask: jest.fn(),
};


describe('TodoApp.addTask', () => {
  let app;
  let mockInput, mockAddBtn, mockList, mockTotal, mockCompleted, mockRemaining, mockClearBtn;


  beforeEach(() => {
    // Mock DOM elements
    document.body.innerHTML = `
      <input id="taskInput" />
      <button id="addBtn"></button>
      <div id="todoList"></div>
      <span id="totalTasks"></span>
      <span id="completedTasks"></span>
      <span id="remainingTasks"></span>
      <button id="clearCompleted"></button>
      <button class="filter-btn" data-filter="all"></button>
      <button class="filter-btn" data-filter="active"></button>
      <button class="filter-btn" data-filter="completed"></button>
    `;

    mockInput = document.getElementById('taskInput');
    mockAddBtn = document.getElementById('addBtn');
    mockList = document.getElementById('todoList');
    mockTotal = document.getElementById('totalTasks');
    mockCompleted = document.getElementById('completedTasks');
    mockRemaining = document.getElementById('remainingTasks');
    mockClearBtn = document.getElementById('clearCompleted');

    // Spy on saveTasks & render to avoid touching localStorage
    app = new TodoApp(false);
    jest.spyOn(app, 'saveTasks').mockImplementation(() => {});
    jest.spyOn(app, 'render').mockImplementation(() => {});


    app.tasks = [
        { id: 1, text: 'Be Happy', completed: false },
        { id: 2, text: 'Write this test', completed: true },
        { id: 3, text: 'Be Cracked', completed: true },
        { id: 4, text: 'Get A Job', completed: false },
    ];
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.restoreAllMocks();
  });














    // THE TEST FOR Clear Completed TASK LOGIC

    test('clears completed task', () => {
        expect(app.tasks.length).toBe(4)
        app.clearCompleted();

        expect(app.tasks.length).toBe(2)

        // Ensure the remaining tasks are the active ones
        expect(app.tasks.some(t => t.id === 2)).toBe(false);
        expect(app.tasks.some(t => t.id === 3)).toBe(false); 

        // Ensure the remaining tasks are the correct active ones
        expect(app.tasks[0].id).toBe(1); 
        expect(app.tasks[1].id).toBe(4);

        expect(app.saveTasks).toHaveBeenCalled();
        expect(app.render).toHaveBeenCalled();
    });

    test('does nothing when the tasks array is already empty', () => {
        // array to be empty
        app.tasks = []; 

        //run logic
        app.clearCompleted();

        expect(app.tasks).toHaveLength(0)
        expect(app.saveTasks).toHaveBeenCalled(); 
        expect(app.render).toHaveBeenCalled();
    });

});
