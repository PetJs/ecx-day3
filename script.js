// console.log('Script.js loaded ✅');


// export class TodoApp {
//     constructor(autoInit = true) {
//         this.tasks = [];
//         this.filter = 'all';
//         this.nextId = 1;
        
//         this.taskInput = document.getElementById('taskInput');
//         this.addBtn = document.getElementById('addBtn');
//         this.todoList = document.getElementById('todoList');
//         this.totalTasks = document.getElementById('totalTasks');
//         this.completedTasks = document.getElementById('completedTasks');
//         this.remainingTasks = document.getElementById('remainingTasks');
//         this.clearCompletedBtn = document.getElementById('clearCompleted');
//         this.filterButtons = document.querySelectorAll('.filter-btn');
        
//         if (autoInit) this.init();
//     }

//     init() {
//         this.loadTasks();
//         this.bindEvents();
//         this.render();
//     }

//     bindEvents() {
//         // Add task events
//         this.addBtn.addEventListener('click', () => this.addTask());
//         this.taskInput.addEventListener('keypress', (e) => {
//             if (e.key === 'Enter') this.addTask();
//         });

//         // Filter events
//         this.filterButtons.forEach(btn => {
//             btn.addEventListener('click', (e) => {
//                 this.setFilter(e.target.dataset.filter);
//             });
//         });

//         // Clear completed event
//         this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

//         // Input validation
//         this.taskInput.addEventListener('input', () => {
//             const value = this.taskInput.value.trim();
//             this.addBtn.disabled = value.length === 0;
//         });
//     }

//     addTask() {
//         const text = this.taskInput.value.trim();
//         if (!text) return;

//         const task = {
//             id: this.nextId++,
//             text: text,
//             completed: false,
//             createdAt: new Date().toISOString()
//         };

//         this.tasks.unshift(task); // Add to beginning 
//         this.taskInput.value = '';
//         this.addBtn.disabled = true;
        
//         this.saveTasks();
//         this.render();
        
//         // Focus back to input for continuous adding
//         this.taskInput.focus();
//     }

//     toggleTask(id) {
//         const task = this.tasks.find(t => t.id === id);
//         if (task) {
//             task.completed = !task.completed;
//             task.completedAt = task.completed ? new Date().toISOString() : null;
//             this.saveTasks();
//             this.render();
//         }
//     }

//     deleteTask(id) {
//         const index = this.tasks.findIndex(t => t.id === id);
//         if (index > -1) {
//             // Add delete animation
//             const taskElement = document.querySelector(`[data-id="${id}"]`);
//             if (taskElement) {
//                 taskElement.style.animation = 'fadeOut 0.3s ease-out';
//                 setTimeout(() => {
//                     this.tasks.splice(index, 1);
//                     this.saveTasks();
//                     this.render();
//                 }, 300);
//             }
//         }
//     }

//     clearCompleted() {
//         this.tasks = this.tasks.filter(task => !task.completed);
//         this.saveTasks();
//         this.render();
//     }

//     setFilter(filter) {
//         this.filter = filter;
        
//         // Update active button
//         this.filterButtons.forEach(btn => {
//             btn.classList.toggle('active', btn.dataset.filter === filter);
//         });
        
//         this.render();
//     }

//     getFilteredTasks() {
//         switch (this.filter) {
//             case 'active':
//                 return this.tasks.filter(task => !task.completed);
//             case 'completed':
//                 return this.tasks.filter(task => task.completed);
//             default:
//                 return this.tasks;
//         }
//     }

//     render() {
//         const filteredTasks = this.getFilteredTasks();
        
//         // Update stats
//         const total = this.tasks.length;
//         const completed = this.tasks.filter(t => t.completed).length;
//         const remaining = total - completed;
        
//         this.totalTasks.textContent = total;
//         this.completedTasks.textContent = completed;
//         this.remainingTasks.textContent = remaining;
        
//         // Update clear completed button
//         this.clearCompletedBtn.disabled = completed === 0;
        
//         // Render tasks
//         if (filteredTasks.length === 0) {
//             this.todoList.innerHTML = `
//                 <div class="empty-state">
//                     ${this.tasks.length === 0 
//                         ? '📝 No tasks yet. Add one above!' 
//                         : `No ${this.filter} tasks found.`
//                     }
//                 </div>
//             `;
//             return;
//         }

//         this.todoList.innerHTML = filteredTasks.map(task => `
//             <div class="todo-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
//                 <div class="checkbox ${task.completed ? 'checked' : ''}" onclick="todoApp.toggleTask(${task.id})">
//                     ${task.completed ? '✓' : ''}
//                 </div>
//                 <span class="task-text">${this.escapeHtml(task.text)}</span>
//                 <button class="delete-btn" onclick="todoApp.deleteTask(${task.id})" title="Delete task">
//                     ×
//                 </button>
//             </div>
//         `).join('');
//     }

//     escapeHtml(text) {
//         const div = document.createElement('div');
//         div.textContent = text;
//         return div.innerHTML;
//     }

//     saveTasks() {
//         localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
//         localStorage.setItem('todoNextId', this.nextId.toString());
//     }

//     loadTasks() {
//         const saved = localStorage.getItem('todoTasks');
//         const savedNextId = localStorage.getItem('todoNextId');
//         if (saved) this.tasks = JSON.parse(saved);
//         if (savedNextId) this.nextId = parseInt(savedNextId);
        
//     }
// }

// // CSS for delete animation
// const style = document.createElement('style');
// style.textContent = `
//     @keyframes fadeOut {
//         from {
//             opacity: 1;
//             transform: translateX(0);
//         }
//         to {
//             opacity: 0;
//             transform: translateX(-100%);
//         }
//     }
// `;
// document.head.appendChild(style);


console.log('Script.js loaded ✅');

class TodoApp {
    constructor(autoInit = true) {
        this.tasks = [];
        this.filter = 'all';
        this.nextId = 1;

        // Only access DOM if it exists (browser environment)
        if (typeof document !== 'undefined') {
            this.taskInput = document.getElementById('taskInput');
            this.addBtn = document.getElementById('addBtn');
            this.todoList = document.getElementById('todoList');
            this.totalTasks = document.getElementById('totalTasks');
            this.completedTasks = document.getElementById('completedTasks');
            this.remainingTasks = document.getElementById('remainingTasks');
            this.clearCompletedBtn = document.getElementById('clearCompleted');
            this.filterButtons = document.querySelectorAll('.filter-btn');
        }

        // Auto init only when in browser (not during Jest or Cypress import)
        if (autoInit && typeof window !== 'undefined' && this.taskInput) {
            this.init();
        }
    }

    init() {
        this.loadTasks();
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        if (!this.taskInput || !this.addBtn) return;

        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        if (this.filterButtons) {
            this.filterButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.setFilter(e.target.dataset.filter);
                });
            });
        }

        if (this.clearCompletedBtn) {
            this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        }

        this.taskInput.addEventListener('input', () => {
            const value = this.taskInput.value.trim();
            this.addBtn.disabled = value.length === 0;
        });
    }

    addTask() {
        const text = this.taskInput?.value.trim();
        if (!text) return;

        const task = {
            id: this.nextId++,
            text,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        this.tasks.unshift(task);
        if (this.taskInput) {
            this.taskInput.value = '';
            this.addBtn.disabled = true;
        }

        this.saveTasks();
        this.render();
        this.taskInput?.focus();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            this.saveTasks();
            this.render();
        }
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index > -1) {
            const taskElement = typeof document !== 'undefined'
                ? document.querySelector(`[data-id="${id}"]`)
                : null;

            if (taskElement) {
                taskElement.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    this.tasks.splice(index, 1);
                    this.saveTasks();
                    this.render();
                }, 300);
            } else {
                this.tasks.splice(index, 1);
                this.saveTasks();
                this.render();
            }
        }
    }

    clearCompleted() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.saveTasks();
        this.render();
    }

    setFilter(filter) {
        this.filter = filter;
        if (this.filterButtons) {
            this.filterButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filter === filter);
            });
        }
        this.render();
    }

    getFilteredTasks() {
        switch (this.filter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    render() {
        if (!this.todoList) return;

        const filteredTasks = this.getFilteredTasks();

        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const remaining = total - completed;

        if (this.totalTasks) this.totalTasks.textContent = total;
        if (this.completedTasks) this.completedTasks.textContent = completed;
        if (this.remainingTasks) this.remainingTasks.textContent = remaining;

        if (this.clearCompletedBtn)
            this.clearCompletedBtn.disabled = completed === 0;

        if (filteredTasks.length === 0) {
            this.todoList.innerHTML = `
                <div class="empty-state">
                    ${this.tasks.length === 0 
                        ? '📝 No tasks yet. Add one above!' 
                        : `No ${this.filter} tasks found.`}
                </div>`;
            return;
        }

        this.todoList.innerHTML = filteredTasks.map(task => `
            <div class="todo-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="checkbox ${task.completed ? 'checked' : ''}" onclick="todoApp.toggleTask(${task.id})">
                    ${task.completed ? '✓' : ''}
                </div>
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <button class="delete-btn" onclick="todoApp.deleteTask(${task.id})" title="Delete task">×</button>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = typeof document !== 'undefined' ? document.createElement('div') : { textContent: '' };
        div.textContent = text;
        return div.innerHTML || text;
    }

    saveTasks() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
            localStorage.setItem('todoNextId', this.nextId.toString());
        }
    }

    loadTasks() {
        if (typeof localStorage === 'undefined') return;
        const saved = localStorage.getItem('todoTasks');
        const savedNextId = localStorage.getItem('todoNextId');
        if (saved) this.tasks = JSON.parse(saved);
        if (savedNextId) this.nextId = parseInt(savedNextId);
    }
}

// Only create a global instance in the browser
if (typeof window !== 'undefined') {
    window.todoApp = new TodoApp(true);
}

// Add CSS animation in browser only
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-100%); }
        }
    `;
    document.head.appendChild(style);
}

// Only attach when running in a browser (not in Jest)
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Wait for DOM to finish loading before initializing
  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded ✅');
    window.todoApp = new TodoApp(true);
  });
}

export { TodoApp };

