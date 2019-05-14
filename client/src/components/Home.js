import React from "react";
import Typography from "@material-ui/core/Typography";

function Home() {
  return (
    <>
      <Typography component="h3" variant="h3" color="inherit" gutterBottom>
        Welcome
      </Typography>
      <Typography variant="p">
        To the left is the menu where you can see the current nominees or if
        your song isn't there you can nominate it!
      </Typography>
    </>
  );
}
export default Home;
