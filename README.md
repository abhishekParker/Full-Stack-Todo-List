
# Todo Application

This is a simple Todo application built using React and integrated with an API to manage tasks. The app supports adding, editing, deleting, and toggling the completion status of tasks. It uses Material UI for styling and Axios for making API requests.

## Features

- **Add Task**: Allows users to add a new task.
- **Edit Task**: Allows users to edit existing tasks.
- **Delete Task**: Allows users to delete a task.
- **Mark Task as Done**: Allows users to mark a task as done by toggling a checkbox.
- **Snackbar Notifications**: Displays feedback on successful or failed actions.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Material UI**: React UI framework for styling.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router**: For client-side routing (if applicable).
- **Node.js**: For the backend API (if applicable).
- **MongoDB**: Database for storing tasks (if applicable).
- **JWT (JSON Web Token)**: For handling user authentication.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/todo-app.git
```

### 2. Install dependencies

Navigate to the project directory and install dependencies:

```bash
cd todo-app
npm install
```

### 3. Start the development server

Run the development server to view the app in your browser:

```bash
npm start
```

This should open the app in your default browser at [http://localhost:3000](http://localhost:3000).

## API Integration

This app is integrated with a backend API to perform CRUD operations on todos. Ensure your API is running and accessible. The API endpoints used are:

- **GET /todos**: Fetches all todos.
- **POST /todos**: Adds a new todo.
- **PUT /todos/{id}**: Updates the `isDone` status or edits the todo.
- **DELETE /todos/{id}**: Deletes a todo.

Regiser and Login Authentication with JWT Token.The API endpoints used are:

- **POST /register**: Register user.
- **POST /login**: Login user.

## Project Structure

```
/src
  /components
    Todo.js           # Main Todo component
    Register.js       # Register component
    Login.js          # Login component
    ProtectedRoute.js          # Protected route component
  /utils
    axios.js            # Axios configuration
  /services
    api.js            # Axios API setup
  App.js              # Main app component
  index.js            # Entry point for React app
```

## Environment Variables

Make sure to set the following environment variables for the backend:

- `REACT_APP_API_URL`: The URL of the backend API (e.g., `http://localhost:5000/api`).

## Contributing

Feel free to fork the repository, submit issues, and create pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Notes:
- Make sure to replace placeholders like `your-username` with actual values.
- You can expand or adjust the sections based on your specific project setup or any additional features you may have implemented.
