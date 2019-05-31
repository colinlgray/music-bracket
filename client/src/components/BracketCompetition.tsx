import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { get } from "../utils";
import { RouteComponentProps } from "react-router-dom";
import Bracket from "../models/Bracket";

type RouteParams = { id: string };

class BracketCompetition extends React.Component<
  RouteComponentProps<RouteParams>
> {
  state = { tracks: [], error: null };
  componentWillMount() {
    this.fetchBracket()
      .then((bracket: Bracket | null) => {
        if (bracket === null) {
          this.props.history.replace("/404");
        } else {
          this.setState({ tracks: bracket.tracks || [] });
        }
      })
      .catch((error: Error) => {
        console.error(error);
        this.setState({ error });
      });
  }
  async fetchBracket() {
    try {
      if (!this.props.match.params.id) {
        return null;
      }
      this.setState({ loading: true });
      const { parsedBody } = await get(
        `/api/brackets/${this.props.match.params.id}`
      );

      return new Bracket(parsedBody);
    } catch (error) {
      this.setState({ loading: false });
      throw error;
    }
  }

  render() {
    return (
      <>
        <Typography component="h3" variant="h3" color="inherit" gutterBottom>
          Select Tracks
        </Typography>
        <Grid container direction="row">
          Bracket
        </Grid>
      </>
    );
  }
}

export default BracketCompetition;
