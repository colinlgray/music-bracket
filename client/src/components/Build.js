import React from "react";
import Typography from "@material-ui/core/Typography";
import Search from "./Search";
import Grid from "@material-ui/core/Grid";
import SelectedTracks from "./SelectedTracks";
import uuid from "uuid/v4";

class Build extends React.Component {
  state = { tracks: [], offset: 0 };
  componentWillMount() {
    console.log(this.props.history.id);
    this.fetchBracket().then(bracket => {
      if (!bracket) {
        this.props.history.replace(`/build/${uuid()}`);
      } else {
        console.log("has a bracket", bracket);
      }
    });
    console.log(this.props.history.location.pathname);
    console.log("did mount", uuid());
  }
  fetchBracket() {
    return fetch(`/api/brackets/${this.props.history.id}`)
      .then(res => res.json())
      .then(response => {
        console.log("resp", response);
        this.setState({
          loading: false,
          tracks: response.items
        });
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  }
  render() {
    return (
      <>
        <Typography component="h3" variant="h3" color="inherit" gutterBottom>
          Select Tracks
        </Typography>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-end"
        >
          <Grid item xs={6}>
            <Search />
          </Grid>
          <Grid item xs={6} />
          <SelectedTracks tracks={this.state.tracks} />
        </Grid>
      </>
    );
  }
}

export default Build;
