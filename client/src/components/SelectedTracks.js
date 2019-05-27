import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import Track from "./Track";
import Grid from "@material-ui/core/Grid";
const styles = theme => ({});

export function SelectedTracks(props) {
  const { tracks = [], onRemoveTrack } = props;
  return (
    <Grid container direction="column">
      <Grid item>
        <List>
          {tracks.map(track => (
            <ListItem key={track.id}>
              <Track
                track={track}
                primaryIcon={<DeleteIcon />}
                onClickCta={() => {
                  onRemoveTrack(track);
                }}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(SelectedTracks);
