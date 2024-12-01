# Time Tracker

This is a **time-tracking application** designed to help users efficiently track their project activities. Users can log in using their **GitHub accounts**, start or stop project tracking via CLI commands, and manage project data, all stored in a MongoDB database.

---

## Features

- **GitHub Authentication**: Login with GitHub to securely manage sessions.
- **Command Line Interface (CLI)**: Use commands like `start`, `stop`, `listProjects`, and more to manage projects directly from the terminal.
- **MongoDB Integration**: Stores session data and project details.
- **User-Friendly Session Management**: Opens the login page if you're not authenticated and continues smoothly once logged in.
- **Customizable API Base URL**: Easily adapt to different environments (local or production) via the `.env` file.

---

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- MongoDB
- A GitHub account and an OAuth app configured for authentication

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/krushnarout/time-tracker.git
```

```bash
cd time-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Installation Options

#### Option A: Install Globally (Recommended)

Navigate to the project directory and run:

```bash
npm install -g .
```

This makes the `time-tracker` command available globally in your terminal.

#### Option B: Use Without Installation

You can run the tool directly using npx without installing:

```bash
npx time-tracker <command> <projectName>
```

#### Option C: Link for Development

If you're developing the tool, you can use npm link to create a symlink:

```bash
npm link
```

This allows you to test the command globally while making changes to the code.

### 4. Configure Environment Variables

Create a `.env` file in the root directory and fill it using the template provided in `.env.example`.

### 5. Start the Application

#### For the API Server

```bash
node server.js
```

#### For the CLI

```bash
time-tracker <command> <projectName>
```

Or if not installed globally:

```bash
node ./cli/index.js <command> <projectName>
```

---

## Usage

### CLI Commands

- **Start a Project**:

  ```bash
  node ./cli/index.js start <projectName>
  ```

  Starts tracking time for the specified project.

- **Stop a Project**:

  ```bash
  node ./cli/index.js stop <projectName>
  ```

  Stops tracking time for the specified project.

- **List All Projects**:

  ```bash
  node ./cli/index.js listProjects
  ```

  Displays all tracked projects for the logged-in user.

- **Generate a Report**:

  ```bash
  node ./cli/index.js report <projectName>
  ```

  Generates a time report for the specified project.

### Session Management

- If the user is not logged in, the CLI will automatically open a browser window for GitHub authentication.

- Once logged in, the session is stored, and you can execute CLI commands without needing to log in again.

---

## Folder Structure

```bash
time-tracker/
├── cli/     
│   ├── commands/
│   └── index.js
├── config/
├── controllers/
├── models/
├── routes/
├── server.js
└── .env.example
```

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
