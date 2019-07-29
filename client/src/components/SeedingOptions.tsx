import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) => ({
  title: {
    paddingLeft: theme.spacing(2)
  }
}));
export function SeedingOptions(props: {}) {
  const classes = useStyles();
  return (
    <Typography
      component="div"
      color="inherit"
      gutterBottom
      className={classes.title}
    >
      Seed By:
    </Typography>
  );
}
