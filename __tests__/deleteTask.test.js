/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { TodoApp } from '../script';

global.todoApp = {
    toggleTask: jest.fn(),
    deleteTask: jest.fn(),
};

jest.useFakeTimers();


describe('TodoApp.addTask', () => {
  let app;
  let mockInput, mockAddBtn, mockList, mockTotal, mockCompleted, mockRemaining, mockClearBtn;

  const TEST_TASK_ID = 1;


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
      <div class="todo-item" data-id="${TEST_TASK_ID}">Task to be deleted</div>
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
        { id: TEST_TASK_ID, text: 'Task for Deletion', completed: false },
        { id: 99, text: 'Keep me', completed: false }
    ]
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.restoreAllMocks();
  });














  // THE TEST FOR ADD TASK LOGIC

  test('deletes task', () => {
    expect(app.tasks.length).toBe(2);
    app.deleteTask(TEST_TASK_ID)
    
    expect(app.tasks.length).toBe(2);
    expect(app.saveTasks).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(app.tasks.length).toBe(1); // Array length is now 1
    expect(app.tasks[0].id).toBe(99);
    expect(app.saveTasks).toHaveBeenCalled();
    expect(app.render).toHaveBeenCalled();
  });

  
});
