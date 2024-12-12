import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match!");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      setSnackbarMessage("Registration successful! Please login.");
      setOpenSnackbar(true);
      navigate("/login");
    } catch (err) {
      setError("Registration failed! Please try again.");
      setSnackbarMessage("Registration failed! Please try again.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 10 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
          Register
        </Typography>

        <form>
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 5,
              },
              marginBottom: 2,
            }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
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
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 5,
              },
              marginBottom: 2,
            }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 5,
              },
              marginBottom: 2,
            }}
          />
          <Link
            to={"/login"}
            sx={{
              display: "block",
              marginTop: 8,
              textAlign: "center",
              color: "#1976d2",
              textDecoration: "underline",
              "&:hover": {
                color: "#1565c0",
              },
            }}
          >
            Already Registered? Login
          </Link>
          {error && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{ marginY: 2 }}
            >
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
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
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
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

export default Register;
