import React from "react";
import Typography from "@material-ui/core/Typography";
import Search from "./Search";
import Grid from "@material-ui/core/Grid";
import SelectedTracks from "./SelectedTracks";
import { makeRequest } from "../utils";

class Build extends React.Component {
  state = { tracks: [], error: null };
  componentWillMount() {
    this.fetchOrCreateBracket()
      .then(bracket => {
        console.log("bracket", bracket);
        // this.setState({ tracks: bracket.tracks });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  }
  fetchOrCreateBracket() {
    console.log("fetchOrCreateBracket", this.props.match.params.id);
    if (!this.props.match.params.id) {
      return this.newBracket();
    }
    return makeRequest(`/api/brackets/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          loading: false
        });
        return response;
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  }
  newBracket() {
    return makeRequest("/api/brackets", {
      method: "POST"
    }).then(respJson => {
      this.props.history.replace(`/build/${respJson.id}`);
      console.log("respJson", respJson);
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

export default Build;
