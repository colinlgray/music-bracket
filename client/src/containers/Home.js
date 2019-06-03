import React from "react";
import Typography from "@material-ui/core/Typography";

function Home() {
  return (
    <>
      <Typography component="h3" variant="h3" color="inherit" gutterBottom>
        Welcome
      </Typography>
      <Typography component="div" style={{ paddingTop: "24px" }}>
        To the left is the menu where you can nominate your favorite song, then
        see the list of everyone's favorite songs so far
      </Typography>
    </>
  );
}
export default Home;
