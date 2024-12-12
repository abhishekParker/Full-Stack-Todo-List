import { useEffect, useState } from "react";
import axios from "../utils/axios";
import {
  TextField,
  Button,
  Typography,
  Checkbox,
  List,
  ListItem,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// Styled components for custom styling
const InputField = styled(TextField)({
  width: "70%",
  marginBottom: 30,
});

const AddButton = styled(Button)({
  height: 55,
  marginBottom: 30,
  marginLeft: 20,
});

const TodoList = styled(List)({
  width: "80%",
  margin: "auto",

  justifyContent: "space-around",
});

const ListText = styled(Typography)({
  width: "70%",
});

const ListButtons = styled(Button)({
  marginLeft: 10,
});

function Todo() {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      showSnackbar("Error fetching todos.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleClick = async () => {
    try {
      if (!isEdited) {
        await axios.post("/todos", { val: inputVal });
        showSnackbar("Task added successfully!");
      } else {
        await axios.put(`/todos/${editedId}`, { val: inputVal });
        showSnackbar("Task edited successfully!");
      }
      setInputVal("");
      setIsEdited(false);
      fetchTodos();
    } catch (error) {
      console.error("Error handling task:", error);
      showSnackbar("Error handling task.");
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      showSnackbar("Task deleted successfully!");
      fetchTodos();
    } catch (error) {
      console.error("Error deleting task:", error);
      showSnackbar("Error deleting task.");
    }
  };

  const handleEdit = (id) => {
    const editVal = todos.find((todo) => todo._id === id);
    setEditedId(editVal._id);
    setInputVal(editVal.val);
    setIsEdited(true);
    showSnackbar("Editing task...");
  };

  const handleChecked = async (id) => {
    const todoIndex = todos.findIndex((todo) => todo._id === id);
    if (todoIndex === -1) return;

    const currentStatus = todos[todoIndex].isDone;

    const updatedTodos = [...todos];
    updatedTodos[todoIndex].isDone = !currentStatus;

    try {
      await axios.put(`/todos/${id}`, {
        isDone: !currentStatus,
      });

      fetchTodos();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Container component="main" sx={{ textAlign: "center", marginTop: 20 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Welcome, {username}!
        <Button
          sx={{ backgroundColor: "red", color: "#fff", marginLeft: 5 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Typography>

      <InputField
        variant="outlined"
        onChange={onChange}
        label="Type your task"
        value={inputVal}
      />
      <AddButton
        size="large"
        variant={isEdited ? "outlined" : "contained"}
        color="primary"
        onClick={handleClick}
        disabled={!inputVal}
      >
        {isEdited ? "Edit Task" : "Add Task"}
      </AddButton>
      <TodoList>
        {todos.map((todo) => (
          <ListItem
            divider
            key={todo._id}
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Checkbox
              onClick={() => handleChecked(todo._id)}
              checked={todo.isDone}
            />
            <ListText sx={{ color: todo.isDone ? "green" : "" }}>
              {todo.val}
            </ListText>
            <ListButtons
              onClick={() => handleEdit(todo._id)}
              variant="contained"
            >
              Edit
            </ListButtons>
            <ListButtons
              onClick={() => onDelete(todo._id)}
              color="secondary"
              variant="contained"
            >
              Delete
            </ListButtons>
          </ListItem>
        ))}
      </TodoList>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Todo;
