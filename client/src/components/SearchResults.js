import React from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import InfoMessage from "./InfoMessage";
import Track from "./Track";

const styles = theme => ({
  loadingIcon: {
    margin: theme.spacing(2)
  },
  errorMessage: {
    margin: theme.spacing(2),
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
      onClose,
      onAddTrack
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
        {items.map((t, idx) => {
          return (
            <ListItem key={t.id}>
              <Track
                track={t}
                primaryIcon={<AddIcon />}
                secondaryIcon={<CheckIcon />}
                onClickCta={() => {
                  onAddTrack(t);
                }}
              />
            </ListItem>
          );
        })}
      </Typography>
    );
  }
}

export default withStyles(styles)(SearchResults);
