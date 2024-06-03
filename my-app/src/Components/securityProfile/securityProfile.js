import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from "@mui/material/Checkbox";
import CheckIcon from "@mui/icons-material/Check";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid";
import { InnerContainer, OuterContainer } from "./securityStyles";
import { Horizantal } from "./securityStyles";
import { TypographyTitle } from "./securityStyles";

function CustomCheckbox({ checked }) {
  return (
    <Grid style={{ width: "50px", height: 32, textAlign: "center" }}>
      {checked && <CheckIcon sx={{ color: "green" }} />}
    </Grid>
  );
}

function Security() {
  const [userData, setUserData] = useState({
    userId: null,
    oldPassword: "",
    newPassword: "",
    conformpassword: "",
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const getUserId = user?.User_Id;
    if (getUserId) {
      setUserData((prevState) => ({
        ...prevState,
        userId: getUserId,
      }));
    }
  }, []);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;
    const regexNumber = /[0-6]/;
    const regeMdpecialChar = /[!@#$%^&*()_+}{"':;?/.><,]/;

    setValidations({
      length: value.length >= 8,
      uppercase: regexUpperCase.test(value),
      lowercase: regexLowerCase.test(value),
      number: regexNumber.test(value),
      specialChar: regeMdpecialChar.test(value),
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = userData;

    if (newPassword === confirmPassword) {
      if (!validations.length) {
        toast.error("Password should be at least 8 characters long");
      } else if (!validations.uppercase) {
        toast.error("Password must contain at least one uppercase letter");
      } else if (!validations.lowercase) {
        toast.error("Password must contain at least one lowercase letter");
      } else if (!validations.number) {
        toast.error("Password must contain at least one number");
      } else if (!validations.specialChar) {
        toast.error("Password must contain at least one special character");
      }
    } else {
      toast.error("New Password and Confirm Password do not match");
    }
    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      toast.success("Password updated successfully!");
    } catch (error) {
      console.error("Update Password Error:", error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <OuterContainer maxWidth="750px">
        <InnerContainer container spacing={2}>
          <Horizantal>
            <TypographyTitle variant="h5">PASSWORD GUIDELINES</TypographyTitle>
          </Horizantal>
          <Grid sx={{ width: "400px" }}>
            <Typography variant="h6">
              Password must meet these requirement:
            </Typography>
            <Stack>
              <FormControlLabel
                control={<CustomCheckbox checked={validations.length} />}
                label="At least 8 characters long"
                disabled
              />
              <FormControlLabel
                control={<CustomCheckbox checked={validations.uppercase} />}
                label="At least one uppercase letter"
                disabled
              />
              <FormControlLabel
                control={<CustomCheckbox checked={validations.lowercase} />}
                label="At least one lowercase letter"
                disabled
              />
              <FormControlLabel
                control={<CustomCheckbox checked={validations.number} />}
                label="At least one number"
                disabled
              />
              <FormControlLabel
                control={<CustomCheckbox checked={validations.specialChar} />}
                label="At least one special character"
                disabled
              />
            </Stack>
          </Grid>
          <Grid item lg={3} xs={12}>
            <form onSubmit={handleSubmit}>
              <Typography variant="body2" fontWeight="bold">
                Old Password:
              </Typography>
              <TextField
                id="oldPassword"
                name="oldPassword"
                label="Enter Old Password"
                type={showOldPassword ? "text" : "password"}
                value={userData.oldPassword}
                onChange={handleChange}
                sx={{ width: 300 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="body2" fontWeight="bold">
                New Password:
              </Typography>
              <TextField
                id="newPassword"
                name="newPassword"
                label="Enter New Password"
                type={showNewPassword ? "text" : "password"}
                value={userData.newPassword}
                onChange={handleChange}
                sx={{ width: 300 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="body2" fontWeight="bold">
                Confirm Password:
              </Typography>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Enter Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={userData.confirmPassword}
                onChange={handleChange}
                sx={{ width: 300 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: 100,
                  margin: 1,
                }}
              >
                UPDATE
              </Button>
            </form>
          </Grid>
        </InnerContainer>
      </OuterContainer>
    </>
  );
}

export default Security;
