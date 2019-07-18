import React from "react";
import Typography from "@material-ui/core/Typography";

function Home() {
  return (
    <>
      <Typography component="h3" variant="h3" color="inherit" gutterBottom>
        Welcome
      </Typography>
      <Typography component="div" style={{ paddingTop: "24px" }}>
        This is not a fully formed idea. Keeps your hopes in check
      </Typography>
    </>
  );
}
export default Home;
