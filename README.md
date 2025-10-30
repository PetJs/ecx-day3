# Todoo

A simple yet powerful Todo Task Manager web application that helps users manage their daily tasks efficiently.

The app allows users to add, filter, and track tasks, with data persistence using LocalStorage.

It is fully tested using Jest (unit tests) and Cypress (E2E tests).

---

## 🚀 Features

* ✅ **Add new tasks**
* 🗑️ **Delete existing tasks**
* 🔄 **Mark tasks as completed**
* 🔍 **Filter tasks** by All, Active, or Completed
* 💾 **Persistent storage** via LocalStorage
* 🧪 **Full testing coverage** using Jest (unit) and Cypress (E2E)

---

## 🧰 Technologies Used

| Category | Tools / Libraries |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6) |
| **Testing** | Cypress (E2E), Jest (Unit Testing) |
| **Build/Serve** | Live Server / Localhost |
| **Storage** | Browser LocalStorage |

---

## ⚙️ Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/PetJs/ecx-day3.git
cd todo-app
```

### 2. Install Dependencies
Make sure Node.js and npm are installed, then:
```bash
npm install
```

### 3. Developer Server
Start the local development server using VSCode live server extension or :
```bash
npx live-server
```
or
```bash
http://localhost:5500/index.html
```

## Testing
### Uni Tests(Using Jest)
To run all tests:
```bash
npm test
```
### End-to-End Test(Using Cypress)
```bash
npx cypress open
```

## Deployed Link
[Demo](https://ecx-day3.vercel.app/)