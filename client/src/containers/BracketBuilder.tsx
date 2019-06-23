import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "react-router-dom";
import { Search, SearchResults, CompetitorSelection } from "../components";
import Grid from "@material-ui/core/Grid";
import { Bracket, Competitor, Track } from "../models";
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
                  return new Competitor({
                    index: -1,
                    type: "track",
                    spotifyId: result.id,
                    track: new Track(result),
                    id: uuid()
                  });
                })
              );
              return null;
            }}
          />
        </Grid>
        <CompetitorSelection
          onAddCompetitor={(competitor: Competitor) => {
            props.model.addCompetitor(competitor);
            props.model.save();
          }}
          onRemoveCompetitor={(competitor: Competitor) => {
            props.model.removeCompetitor(competitor);
            props.model.save();
          }}
          competitors={competitors}
          selected={props.model.competitors}
        />
      </Grid>
    </>
  );
}
