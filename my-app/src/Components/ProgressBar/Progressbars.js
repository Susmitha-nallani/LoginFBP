import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Grid,
  Alert,
  CircularProgress,
  inputValue,
} from "@mui/material";
import withButtonLogic from "./Withbuttonlogic";
import "./ProgressBar.css";

const CombinedProgressBar = (props) => {
  const {
    inputValue,
    progress,
    alertOpen,
    alertMessage,
    onInputChange,
    onUpdate,
    onClear,
    setAlertOpen,
  } = props;

  return (
    <Container
      maxWidth="sm"
      sx={{ bgcolor: "#b3b3cc", borderRadius: 8, p: 4, boxShadow: 1 }}
    >
      <Typography variant="h5" sx={{ color: "#212121", mb: 2 }}>
        All Progress Bars
      </Typography>
      {alertOpen && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => setAlertOpen(false)}
        >
          {alertMessage}
        </Alert>
      )}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          id="progressInput"
          type="number"
          variant="outlined"
          label="Enter percentage"
          fullWidth
          value={inputValue}
          onChange={onInputChange}
        />
      </Stack>
      <Stack direction="row" spacing={3} sx={{ mt: 1, mb: 1 }}>
        <Button variant="contained" onClick={onUpdate}>
          Update
        </Button>
        <Button variant="contained" onClick={onClear}>
          Clear
        </Button>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Typography variant="body1" sx={{ color: "#212121", mt: 1 }}>
            Horizontal Progress
          </Typography>
          <Grid className="progress-bar">
            <Grid
              className="progress-loaded"
              style={{ width: `${progress}%` }}
            ></Grid>
            <Grid className="progress-text">{progress}%</Grid>
          </Grid>
          <Typography variant="body1" sx={{ color: "#212121", mt: 1 }}>
            Vertical Progress
          </Typography>
          <Grid
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Grid className="vertical-progress-bar">
              <Grid
                className="vertical-progress-loaded"
                style={{ height: `${progress}%` }}
              ></Grid>
              <Grid className="vertical-progress-text">{progress}%</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Typography variant="body1" sx={{ color: '#606060', mt: 1 }}>Circular Progress</Typography>
            <CircularProgress
                variant="determinate"
                value={inputValue}
                size={250}
                thickness={2}
                sx={{ mt: 2, alignSelf: 'center' }}
            /> */}
    </Container>
  );
};

export default withButtonLogic(CombinedProgressBar);
