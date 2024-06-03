import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });

  const handleTogglePasswordVisibility = () => {
    setUserData((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    if (!userData.email || userData.email.trim() === "") {
      errors.emailError = "Email is required";
    }
    if (!userData.password || userData.password.trim() === "") {
      errors.passwordError = "Password is Required";
    }

    setUserData((prevState) => ({
      ...prevState,
      ...errors,
    }));

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error occurred while Login");
      }
      const data = await response.json();
      toast.success("Login successful");
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        style={{ backgroundImage: "linear-gradient(143deg, #8585ad, #8585ad)" }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#efeff5",
              textAlign: "center",
              boxShadow: "7px 4px 25px 8px rgba(0,0,0, 0.75)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                backgroundImage: "linear-gradient(143deg, #45456e, #45456e)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: "bold",
              }}
              gutterBottom
            >
              Login
            </Typography>
            <TextField
              id="email"
              name="email"
              label="Enter Email"
              type="email"
              fullWidth
              error={!!userData.emailError}
              helperText={userData.emailError}
              sx={{ margin: 1 }}
              onChange={handleChange}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type={userData.showPassword ? "text" : "password"}
              fullWidth
              error={!!userData.passwordError}
              helperText={userData.passwordError}
              sx={{ margin: 1 }}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={handleTogglePasswordVisibility}
                    sx={{
                      color: "#7272a7",
                    }}
                  >
                    {userData.showPassword ? <Visibility /> : <VisibilityOff />}
                  </Button>
                ),
              }}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                margin: 1,
                backgroundImage: "linear-gradient(143deg, #9494b8, #a3a3c2)",
                color: "#202060",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
            <Typography>
              Don't have an account?{" "}
              <Link
                href="/signup"
                style={{
                  color: "linear-gradient(143deg, #9494b8, #a3a3c2)",
                }}
              >
                Sign Up
              </Link>{" "}
            </Typography>
          </Box>
        </form>
      </Grid>
    </>
  );
}

export default Login;
