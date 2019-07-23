import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1)
    },
    icon: {
      marginLeft: theme.spacing(1)
    },
    mainContent: { paddingTop: theme.spacing(2) }
  })
);

function Home() {
  const classes = useStyles();
  return (
    <>
      <Typography component="h3" variant="h3" color="inherit" gutterBottom>
        Home
      </Typography>
      <Fab
        color="primary"
        variant="extended"
        href="/build"
        aria-label="New Bracket"
        className={classes.fab}
      >
        New bracket
        <AddIcon className={classes.icon} />
      </Fab>
    </>
  );
}
export default Home;
