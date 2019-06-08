import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "react-router-dom";
import { Search, SearchResults, CompetitorSelection } from "../components";
import Grid from "@material-ui/core/Grid";
import { Bracket, Competitor } from "../models";
import { map } from "lodash";
import uuid from "uuid/v4";

type RouteParams = { id: string };
type Props = { model: Bracket };

export default function BracketBuilder(
  props: RouteComponentProps<RouteParams> & Props
) {
  const [competitors, setCompetitors] = useState<Array<Competitor>>([]);

  return (
    <>
      <Typography component="h3" variant="h3" color="inherit" gutterBottom>
        Select Tracks
      </Typography>
      <Grid container direction="row">
        <Grid item xs={12}>
          <Search
            onChange={(searchResults: SearchResults) => {
              setCompetitors(
                map(searchResults.items, result => {
                  return new Competitor({ track: result, id: uuid() });
                })
              );
              return null;
            }}
          />
        </Grid>
        <CompetitorSelection competitors={competitors} />
      </Grid>
    </>
  );
}
