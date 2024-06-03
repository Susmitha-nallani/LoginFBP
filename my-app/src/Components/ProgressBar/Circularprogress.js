import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
  Alert,
} from "@mui/material";
import withButtonLogic from "./Withbuttonlogic";
import "./ProgressBar.css";

const Progress = (props) => {
  const {
    inputValue,
    progress,
    alertOpen,
    onInputChange,
    onUpdate,
    setAlertOpen,
    alertMessage,
    onClear,
  } = props;

  return (
    <Container
      maxWidth="sm"
      sx={{ bgcolor: "#b3b3cc", borderRadius: 8, p: 4, mt: 2 }}
    >
      <Typography variant="body1" style={{ color: "black", mt: 1 }}>
        Circular Progress
      </Typography>
      <Stack alignItems="center">
        <TextField
          id="progressInput"
          type="number"
          label="Enter percentage"
          fullWidth
          value={inputValue}
          onChange={onInputChange}
          sx={{ mt: 2 }}
        />
        {alertOpen && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            onClose={() => setAlertOpen(false)}
          >
            {alertMessage}
          </Alert>
        )}
        <Stack direction="row" spacing={3} sx={{ mt: 1, mb: 1 }}>
          <Button variant="contained" onClick={onUpdate}>
            Update
          </Button>
          <Button variant="outlined" onClick={onClear}>
            Clear
          </Button>
        </Stack>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={250}
          thickness={2}
        />
      </Stack>
    </Container>
  );
};

export default withButtonLogic(Progress);
