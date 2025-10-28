export class TodoApp {
    constructor(autoInit = true) {
        this.tasks = [];
        this.filter = 'all';
        this.nextId = 1;
        
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.totalTasks = document.getElementById('totalTasks');
        this.completedTasks = document.getElementById('completedTasks');
        this.remainingTasks = document.getElementById('remainingTasks');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        if (autoInit) this.init();
    }

    init() {
        this.loadTasks();
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        // Add task events
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter events
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Clear completed event
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

        // Input validation
        this.taskInput.addEventListener('input', () => {
            const value = this.taskInput.value.trim();
            this.addBtn.disabled = value.length === 0;
        });
    }

    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) return;

        const task = {
            id: this.nextId++,
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task); // Add to beginning 
        this.taskInput.value = '';
        this.addBtn.disabled = true;
        
        this.saveTasks();
        this.render();
        
        // Focus back to input for continuous adding
        this.taskInput.focus();
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
            // Add delete animation
            const taskElement = document.querySelector(`[data-id="${id}"]`);
            if (taskElement) {
                taskElement.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    this.tasks.splice(index, 1);
                    this.saveTasks();
                    this.render();
                }, 300);
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
        
        // Update active button
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.render();
    }

    getFilteredTasks() {
        switch (this.filter) {
            case 'active':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    }

    render() {
        const filteredTasks = this.getFilteredTasks();
        
        // Update stats
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const remaining = total - completed;
        
        this.totalTasks.textContent = total;
        this.completedTasks.textContent = completed;
        this.remainingTasks.textContent = remaining;
        
        // Update clear completed button
        this.clearCompletedBtn.disabled = completed === 0;
        
        // Render tasks
        if (filteredTasks.length === 0) {
            this.todoList.innerHTML = `
                <div class="empty-state">
                    ${this.tasks.length === 0 
                        ? '📝 No tasks yet. Add one above!' 
                        : `No ${this.filter} tasks found.`
                    }
                </div>
            `;
            return;
        }

        this.todoList.innerHTML = filteredTasks.map(task => `
            <div class="todo-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="checkbox ${task.completed ? 'checked' : ''}" onclick="todoApp.toggleTask(${task.id})">
                    ${task.completed ? '✓' : ''}
                </div>
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <button class="delete-btn" onclick="todoApp.deleteTask(${task.id})" title="Delete task">
                    ×
                </button>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
        localStorage.setItem('todoNextId', this.nextId.toString());
    }

    loadTasks() {
        const saved = localStorage.getItem('todoTasks');
        const savedNextId = localStorage.getItem('todoNextId');
        if (saved) this.tasks = JSON.parse(saved);
        if (savedNextId) this.nextId = parseInt(savedNextId);
        
    }
}

// CSS for delete animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-100%);
        }
    }
`;
document.head.appendChild(style);


