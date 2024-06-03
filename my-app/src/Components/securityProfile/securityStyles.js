import { styled, Box, Typography, Grid } from "@mui/material";

export const OuterContainer = styled(Grid)({
  border: "1px solid black",
  padding: "0px",
  margin: "30px auto",
  height: "auto",
  borderRadius: "15px",
});

export const Horizantal = styled(Box)({
  borderRadius: "15px 15px 0 0",
  color: "white",
  background: "#000036",
  width: "100%",
  borderBottom: "1px solid black",
  padding: "15px",
});

export const TypographyTitle = styled(Typography)({
  textAlign: "center",
  color: "white",
  padding: "5px",
});

export const InnerContainer = styled(Grid)({
  height: "auto",
  padding: "30px",
});
