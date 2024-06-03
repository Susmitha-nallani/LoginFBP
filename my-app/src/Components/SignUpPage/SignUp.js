import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

const StyledBox = styled(Box)`
  width: 100%;
  max-width: 500px;
  padding: 30px;
  border-radius: 10px;
  background-color: #efeff5;
  color: black;
  font-weight: bold;
  text-align: center;
  box-shadow: 7px 4px 25px 8px rgba(0, 0, 0, 0.75);
`;
const StyledButton = styled(Button)`
  && {
    margin: 1px;
    background-image: linear-gradient(143deg, #9494b8, #a3a3c2);
    color: #202060;
    font-weight: bold;
  }
`;
const StyledTypography = styled(Typography)`
  color: #202060;
  font-weight: bold;
`;

function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    middleName: "",
    Dob: "",
    address: "",
    phoneNumber: "",
    gender: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  console.log(userData);

  const handleChange = (event) => {
    if (!event || !event.target) return;
    const { name, value } = event.target;
    let errorMessage = "";

    switch (name) {
      case "firstName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          errorMessage = "First Name must contain only alphabets";
        }
        break;
      case "lastName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          errorMessage = "Last Name allow alphabets only";
        }
        break;
      case "middleName":
        if (!/^[a-zA-Z]+$/.test(value)) {
          errorMessage = "Middle Name allow alphabets only";
        }
        break;
      case "email":
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
          errorMessage = "Invalid email address";
        }
        break;
      case "password":
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(value)) {
          errorMessage =
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        }
        break;
      case "confirmPassword":
        if (value !== userData.password) {
          errorMessage = "conform Passwords do not match";
        }
        break;
      case "phoneNumber":
        if (!/^\d{0,10}$/.test(value)) {
          errorMessage =
            "Phone Number must contain only digits and be 10 digits long";
        }
        break;

      default:
        break;
    }

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
      [`${name}Error`]: errorMessage,
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setUserData((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setUserData((prevState) => ({
      ...prevState,
      showConfirmPassword: !prevState.showConfirmPassword,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (
      Object.values(userData).some((value) => {
        return value === null || value === undefined;
      }) ||
      Object.values(userData).some((value) => value && value.includes("Error"))
    ) {
      toast.error("Please fill THE all required fields correctly");
      return;
    }

    if (!userData.firstName || userData.firstName.trim() === "") {
      errors.firstNameError = "First Name is required";
    }
    if (!userData.lastName || userData.lastName.trim() === "") {
      errors.lastNameError = "Last Name is required";
    }
    if (!userData.middleName || userData.middleName.trim() === "") {
      errors.middleNameError = "Middle Name is required";
    }
    if (!userData.email || userData.email.trim() === "") {
      errors.emailError = "Email is required";
    }
    if (!userData.password || userData.password.trim() === "") {
      errors.passwordError = "Password is required";
    }
    if (!userData.confirmPassword || userData.confirmPassword.trim() === "") {
      errors.confirmPasswordError = "Confirm Password is required";
    }
    if (!userData.Dob || userData.Dob.trim() === "") {
      errors.DobError = "Date of Birth is required";
    } else {
      const dobDate = dayjs(userData.Dob, "YYYY-MM-DD");
      const age = dayjs().diff(dobDate, "year");
      const isValidAge = age >= 18;
      if (!isValidAge) {
        errors.DobError = "Age must be greater than 18 years";
      }
    }
    if (!userData.address || userData.address.trim() === "") {
      errors.addressError = "Address is Required";
    }
    if (!userData.phoneNumber || userData.phoneNumber.trim() === "") {
      errors.phoneNumberError = "PhoneNumber is Required";
    }
    if (!userData.gender || userData.gender.trim() === "") {
      errors.genderError = "Gender is Required";
    }

    setUserData((prevState) => ({
      ...prevState,
      ...errors,
    }));

    const UserData = {
      firstName: userData.firstName,
      LastName: userData.lastName,
      MiddleName: userData.middleName,
      Email: userData.email,
      Password: userData.password,
      ConfirmPasword: userData.confirmPassword,
      Address: userData.address,
      Gender: userData.gender,
      PhoneNumber: userData.phoneNumber,
      Dob: userData.Dob,
    };

    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stryingify(UserData),
      });
      if (!response.ok) {
        throw new Error("Error occurred while signing up");
      }
      toast.success("User signed up successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error occurred while signing up", error);
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
        style={{ backgroundImage: "linear-gradient(143deg, #9494b8, #a3a3c2)" }}
      >
        <form onSubmit={handleSubmit}>
          <StyledBox>
            <StyledTypography variant="h4">SignUp</StyledTypography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <TextField
                  id="firstname"
                  name="firstName"
                  label="First name"
                  fullWidth
                  sx={{ margin: 1 }}
                  error={!!userData.firstNameError}
                  helperText={userData.firstNameError}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="lastname"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  sx={{ margin: 1 }}
                  error={!!userData.lastNameError}
                  helperText={userData.lastNameError}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="middlename"
                  name="middleName"
                  label="Middle Name"
                  fullWidth
                  sx={{ margin: 1 }}
                  error={!!userData.middleNameError}
                  helperText={userData.middleNameError}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  sx={{ margin: 1 }}
                  error={!!userData.emailError}
                  helperText={userData.emailError}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type={userData.showPassword ? "text" : "password"}
                  fullWidth
                  sx={{ margin: 1 }}
                  error={!!userData.passwordError}
                  helperText={userData.passwordError}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={handleTogglePasswordVisibility}
                        sx={{
                          color: "#7272a7",
                        }}
                      >
                        {userData.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </Button>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type={userData.showConfirmPassword ? "text" : "password"}
                  fullWidth
                  sx={{ margin: 1 }}
                  error={!!userData.confirmPasswordError}
                  helperText={userData.confirmPasswordError}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={handleToggleConfirmPasswordVisibility}
                        sx={{
                          color: "#7272a7",
                        }}
                      >
                        {userData.showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </Button>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["Dob"]}>
                    <DatePicker
                      label="Dob"
                      format="YYYY-MM-DD"
                      onChange={(date) => {
                        handleChange({
                          target: {
                            name: "Dob",
                            value: date ? date.format() : "",
                          },
                        });
                      }}
                      fullWidth
                      sx={{
                        margin: 1,
                        paddingLeft: "8px",
                      }}
                      slotProps={{ field: { shouldRespectLeadingZeros: true } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {userData.DobError && (
                  <Typography variant="body2" color="error">
                    {userData.DobError}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  multiline
                  rows={2}
                  fullWidth
                  sx={{ margin: 1 }}
                  error={!!userData.addressError}
                  helperText={userData.addressError}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  type="text"
                  fullWidth
                  sx={{ margin: 1 }}
                  error={!!userData.phoneNumberError}
                  helperText={userData.phoneNumberError}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl error={!!userData.genderError}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                      sx={{ color: "black" }}
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                      sx={{ color: "black" }}
                    />
                  </RadioGroup>
                  {userData.genderError && (
                    <Typography variant="body2" color="error">
                      {userData.genderError}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <StyledButton variant="contained" type="submit" fullWidth>
              SignUp
            </StyledButton>
            <Typography
              style={{
                color: "black",
              }}
            >
              Have an account?{" "}
              <Link
                href="/"
                style={{
                  backgroundColor: "#efeff5",
                }}
              >
                Login
              </Link>{" "}
            </Typography>
          </StyledBox>
        </form>
      </Grid>
      <style>
        {`
          input[type=number]::-webkit-inner-spin-button,
          input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
        `}
      </style>
    </>
  );
}

export default SignUp;
