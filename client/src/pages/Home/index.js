import React from "react";
import Typography from "@material-ui/core/Typography";

function Home() {
  return (
    <>
      <Typography component="h3" variant="h3" color="inherit" gutterBottom>
        Welcome
      </Typography>
      <Typography variant="h5" color="inherit" paragraph>
        What's that? Sorry I couldn't hear you over the sound of me getting my
        life together
      </Typography>
    </>
  );
}
export default Home;
