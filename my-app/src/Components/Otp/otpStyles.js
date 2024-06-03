import { Grid, Button } from "@mui/material";
import styled from "@emotion/styled";

export const GridContainer = styled(Grid)({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9999,
  backgroundColor: "white",
  maxWidth: "500px",
  margin: "auto",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
  alignItems: "center",
  "&:before": {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 2.0)",
    zIndex: -1,
    filter: "blur(10px)",
  },
});

export const ButtonConatiner = styled(Button)({
  dislapy: "flex",
  alignItems: "center",
  justifyContent: "center",
});
export const GridButtonContainer = styled(Grid)({
  dislapy: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "10px",
});
