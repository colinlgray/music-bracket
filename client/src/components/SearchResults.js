import React from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  loadingIcon: {
    margin: theme.spacing.unit * 2
  }
});

function SearchResults(props) {
  if (props.loading) {
    return <CircularProgress className={props.classes.loadingIcon} />;
  }
  return <Typography component="div">{props.SearchResults}</Typography>;
}

export default withStyles(styles)(SearchResults);
