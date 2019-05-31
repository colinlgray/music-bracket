import React from "react";
import { without } from "lodash";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "react-router-dom";
import Search from "./Search";
import Grid from "@material-ui/core/Grid";
import SelectedTracks from "./SelectedTracks";
import { get, post } from "../utils";
import Track from "../models/Track";

type RouteParams = { id: string };
type Props = { addNominee: (name: string) => void };

class BracketBuilder extends React.Component<
  RouteComponentProps<RouteParams> & Props
> {
  state = { tracks: [], error: null };
  componentWillMount() {
    this.fetchOrCreateBracket()
      .then(bracket => {
        this.setState({ tracks: bracket.tracks || [] });
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
    return get(`/api/brackets/${this.props.match.params.id}`)
      .then(({ parsedBody }) => {
        if (!parsedBody) {
          return this.newBracket();
        }
        this.setState({
          loading: false
        });
        return parsedBody;
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  async newBracket() {
    const { parsedBody } = await post("/api/brackets", {});
    this.props.history.replace(`/build/${parsedBody.id}`);
    return parsedBody;
  }
  render() {
    return (
      <>
        <Typography component="h3" variant="h3" color="inherit" gutterBottom>
          Select Tracks
        </Typography>
        <Grid container direction="row">
          <Grid item xs={6}>
            <Search
              onAddTrack={track => {
                this.setState({ tracks: this.state.tracks.concat(track) });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectedTracks
              tracks={this.state.tracks}
              onRemoveTrack={(track: Track) =>
                this.setState({ tracks: without(this.state.tracks, track) })
              }
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default BracketBuilder;
