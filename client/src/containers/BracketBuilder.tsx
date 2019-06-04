import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "react-router-dom";
import { Search, SearchResults, TrackList } from "../components";
import Grid from "@material-ui/core/Grid";
import { Track, Bracket, Competitor } from "../models";
import { map } from "lodash";

type RouteParams = { id: string };
type Props = { model: Bracket };

export default function BracketBuilder(
  props: RouteComponentProps<RouteParams> & Props
) {
  const bracket = props.model;
  const [tracks, setTracks] = useState<Array<Track>>([]);

  return (
    <>
      <Typography component="h3" variant="h3" color="inherit" gutterBottom>
        Select Tracks
      </Typography>
      <Grid container direction="row">
        <Grid item xs={12}>
          <Search
            onChange={(searchResults: SearchResults) => {
              setTracks(
                map(searchResults.items, r => {
                  // TODO PLEASE CHANGE THIS
                  const t = new Track(r);
                  return new Competitor(t);
                })
              );
              return null;
            }}
          />
        </Grid>
        <Grid item xs={6} />
        <TrackList competitors={tracks} />
        <Grid item xs={6}>
          <TrackList competitors={bracket.competitors} />
        </Grid>
      </Grid>
    </>
  );
}
