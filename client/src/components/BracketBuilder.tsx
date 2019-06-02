import React from "react";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "react-router-dom";
import Search from "./Search";
import Grid from "@material-ui/core/Grid";
import SelectedTracks from "./SelectedTracks";
import { Track, Bracket, Competitor } from "../models";

type RouteParams = { id: string };
type Props = { model: Bracket };

export default function BracketBuilder(
  props: RouteComponentProps<RouteParams> & Props
) {
  console.log("tlkjh;ladsf");
  const bracket = props.model;
  return (
    <>
      <Typography component="h3" variant="h3" color="inherit" gutterBottom>
        Select Tracks
      </Typography>
      <Grid container direction="row">
        <Grid item xs={6}>
          <Search
            onAddCompetitor={(t: Track) => {
              console.log("?", t);
              bracket.addCompetitor(new Competitor(t));
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectedTracks
            competitors={bracket.competitors}
            onRemoveCompetitor={(competitor: Competitor) => {
              bracket.removeCompetitor(competitor);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
