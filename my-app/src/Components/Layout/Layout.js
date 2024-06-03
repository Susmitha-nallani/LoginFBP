import Sidebar from "../Sidebar/sideBar";
import Footer from "../Sidebar/Footer";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  const childStyle = {
    marginLeft: "50px",
  };
  return (
    <Box style={childStyle}>
      <Sidebar />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
