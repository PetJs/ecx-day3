/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
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
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.restoreAllMocks();
  });














  // THE TEST FOR ADD TASK LOGIC

  test('task becomes completed when toggled', () => {
    mockInput.value = 'Completed Task';
    app.addTask();

    app.toggleTask(app.tasks[0].id);
    expect(app.tasks[0].completed).toBe(true);
    expect(app.saveTasks).toHaveBeenCalled();
    expect(app.render).toHaveBeenCalled();
  });

});
