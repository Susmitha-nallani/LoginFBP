import React from "react";
import Circularprogress from "../ProgressBar/Circularprogress";
import CombinedProgressBar from "../ProgressBar/Progressbars";

function Dashboard() {
  return (
    <div style={styles.container}>
      <CombinedProgressBar />
      <div style={styles.spacing}></div>
      <Circularprogress />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundImage: "linear-gradient(143deg, #f0f0f5, #f0f0f5",
  },
  spacing: {
    marginBottom: "20px",
  },
};

export default Dashboard;
