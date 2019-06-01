import React from "react";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "react-router-dom";
import Search from "./Search";
import Grid from "@material-ui/core/Grid";
import SelectedTracks from "./SelectedTracks";
import { get, post } from "../utils";
import Competitor from "../models/Competitor";
import { Bracket } from "../models/Bracket";

type RouteParams = { id: string };
type Props = { addNominee: (name: string) => void };
type State = { bracket: Bracket | null; loading: boolean; error: Error | null };

class BracketBuilder extends React.Component<
  RouteComponentProps<RouteParams> & Props,
  State
> {
  state: State = { bracket: null, error: null, loading: false };
  componentWillMount() {
    this.fetchOrCreateBracket()
      .then(bracket => {
        this.setState({ bracket });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  }
  componentWillUnmount() {}

  async fetchOrCreateBracket() {
    try {
      if (!this.props.match.params.id) {
        return this.newBracket();
      }
      this.setState({ loading: true });
      const { parsedBody } = await get(
        `/api/brackets/${this.props.match.params.id}`
      );
      console.log(parsedBody);
      return new Bracket(parsedBody);
    } catch (error) {
      this.setState({ loading: false });
      throw error;
    }
  }

  async newBracket() {
    const { parsedBody } = await post("/api/brackets", {});
    this.props.history.replace(`/build/${parsedBody.id}`);
    return new Bracket(parsedBody);
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
              onAddCompetitor={c => {
                if (this.state.bracket != null) {
                  this.state.bracket.addCompetitor(c);
                }
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectedTracks
              onRemoveCompetitor={(competitor: Competitor) => {
                if (this.state.bracket) {
                  this.state.bracket.removeCompetitor(competitor);
                }
              }}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default BracketBuilder;
