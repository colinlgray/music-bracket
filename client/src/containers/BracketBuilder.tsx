import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "react-router-dom";
import { Search, SearchResults, CompetitorSelection } from "../components";
import Grid from "@material-ui/core/Grid";
import { Bracket, Competitor, Track } from "../models";
import { map } from "lodash";
import uuid from "uuid/v4";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));

type RouteParams = { id: string };
type Props = { model: Bracket };

export default function BracketBuilder(
  props: RouteComponentProps<RouteParams> & Props
) {
  const classes = useStyles();
  const [competitors, setCompetitors] = useState<Array<Competitor>>([]);
  const makeBracket = () => {
    props.history.push(`/bracket/${props.model.id}`);
    props.model.save();
  };
  return (
    <>
      <Typography component="h3" variant="h3" color="inherit" gutterBottom>
        Select Tracks
      </Typography>
      <Paper>
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
          <Grid item xs={12}>
            <CompetitorSelection
              onAddCompetitor={(competitor: Competitor) => {
                props.model.addCompetitor(competitor);
                competitor.save();
              }}
              onRemoveCompetitor={(competitor: Competitor) => {
                props.model.removeCompetitor(competitor);
                competitor.save();
              }}
              competitors={competitors}
              selected={props.model.competitors}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid item xs={12} className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={makeBracket}
          className={classes.button}
        >
          Submit
        </Button>
      </Grid>
    </>
  );
}
