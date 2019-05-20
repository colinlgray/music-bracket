import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
const styles = theme => ({});

export function SelectedTracks(props) {
  const { tracks = [] } = props;
  return (
    <List>
      {tracks.map(track => (
        <ListItem key={track.id}>
          <ListItemText primary={track.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default withStyles(styles)(SelectedTracks);
