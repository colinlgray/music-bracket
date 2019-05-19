import React from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import InfoMessage from "./InfoMessage";
import Track from "./Track";

const styles = theme => ({
  loadingIcon: {
    margin: theme.spacing.unit * 2
  },
  errorMessage: {
    margin: theme.spacing.unit * 2,
    verticalAlign: "middle",
    display: "flex",
    alignItems: "center"
  }
});

class SearchResults extends React.Component {
  componentWillUnmount() {
    this.setState({ infoMessageOpen: true });
  }
  render() {
    const {
      error,
      loading,
      items = [],
      classes,
      hasHiddenError,
      onClose
    } = this.props;
    if (loading) {
      return <CircularProgress className={classes.loadingIcon} />;
    } else if (error) {
      return hasHiddenError ? null : (
        <InfoMessage
          variant="error"
          className={classes.errorMessage}
          message="Sorry, an error has occured"
          onClose={onClose}
        />
      );
    }
    return (
      <Typography component="div">
        {items.map(i => {
          return (
            <ListItem key={i.id}>
              <Track track={i} />
            </ListItem>
          );
        })}
      </Typography>
    );
  }
}

export default withStyles(styles)(SearchResults);
