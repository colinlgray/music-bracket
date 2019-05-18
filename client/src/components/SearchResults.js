import React from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  loadingIcon: {
    margin: theme.spacing.unit * 2
  }
});

function SearchResults({ loading, items = [], classes }) {
  if (loading) {
    return <CircularProgress className={classes.loadingIcon} />;
  }
  return (
    <Typography component="div">
      {items.map(i => {
        return (
          <ListItem key={i.id}>
            <ListItemText primary={i.name} />
          </ListItem>
        );
      })}
    </Typography>
  );
}

export default withStyles(styles)(SearchResults);
