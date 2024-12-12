import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token, username } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      setSnackbarMessage("Login successful!");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/todo");
      }, 1500);
    } catch (err) {
      setSnackbarMessage("Invalid credentials. Please try again.");
      setError("Invalid credentials. Please try again.");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 10 }}>
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          background: "#ffffff",
          color: "#333",
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
          Login
        </Typography>
        <form>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 5,
              },
              marginBottom: 2,
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 5,
              },
              marginBottom: 2,
            }}
          />

          {error && (
            <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          <Link
            component={RouterLink}
            to="/register"
            sx={{
              display: "block",
              marginTop: 2,
              textAlign: "center",
              color: "#1976d2",
              textDecoration: "underline",
              "&:hover": {
                color: "#1565c0",
              },
            }}
          >
            Don't have an account? Register
          </Link>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{
              marginTop: 2,
              padding: "12px",
              borderRadius: 25,
              boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: "#1976d2",
                boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            Login
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
