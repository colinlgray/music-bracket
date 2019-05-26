import React from "react";

import Typography from "@material-ui/core/Typography";
import Search from "./Search";
import Grid from "@material-ui/core/Grid";
import SelectedTracks from "./SelectedTracks";
import { makeRequest } from "../utils";

class BracketBuilder extends React.Component {
  state = { tracks: [], error: null };
  componentWillMount() {
    this.fetchOrCreateBracket()
      .then(bracket => {
        this.setState({ tracks: bracket.tracks });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  }
  fetchOrCreateBracket() {
    if (!this.props.match.params.id) {
      return this.newBracket();
    }
    return makeRequest(`/api/brackets/${this.props.match.params.id}`)
      .then(response => {
        if (!response) {
          return this.newBracket();
        }
        this.setState({
          loading: false
        });
        return response;
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  newBracket() {
    return makeRequest("/api/brackets", {
      method: "POST",
      body: {}
    }).then(respJson => {
      this.props.history.replace(`/build/${respJson.id}`);
      return respJson;
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

export default BracketBuilder;
