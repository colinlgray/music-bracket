import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps, Redirect } from "react-router-dom";
import {
  Search,
  SearchResults,
  CompetitorSelection,
  SeedingOptions
} from "../components";
import Grid from "@material-ui/core/Grid";
import { Bracket, Competitor, Track, CreationStates } from "../models";
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
  },
  cardHeader: {
    height: theme.spacing(10)
  }
}));

const headerText: { [step: number]: string } = {
  0: "Select Tracks",
  1: "Select Seeding",
  2: "Creating"
};

const MAX_STEP = 1;
const creationStateToStep: { [creationState: string]: number } = {
  created: 0,
  seeding: 1,
  started: 2
};

type RouteParams = { id: string };
type Props = { model: Bracket };

export default function BracketBuilder(
  props: RouteComponentProps<RouteParams> & Props
) {
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState<Array<Competitor>>([]);
  const [currStep, setStep] = useState<number>(
    creationStateToStep[props.model.creationState] || 0
  );
  const updateCreationStateForStep = (step: number) => {
    props.model.creationState = Object.keys(creationStateToStep)[
      step
    ] as CreationStates;
    props.model.save().catch(err => {
      console.log("oh no! an error", err);
    });
  };

  const makeBracket = () => {
    props.history.push(`/bracket/${props.model.id}`);
  };
  return (
    (!props.match.params.id && <Redirect to={`/build/${props.model.id}`} />) ||
    (props.model.creationState === "started" && (
      <Redirect to={`/bracket/${props.model.id}`} />
    )) || (
      <>
        <Typography component="h5" variant="h5" color="inherit" gutterBottom>
          {headerText[currStep]}
        </Typography>
        <Paper>
          <Grid container direction="row">
            <Grid container className={classes.cardHeader} alignItems="center">
              {currStep === 0 && (
                <Search
                  onChange={(searchResults: SearchResults) => {
                    setSearchResults(
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
              )}
              {currStep === 1 && (
                <SeedingOptions
                  onChange={(value: string) => {
                    props.model.sortBy(value);
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <CompetitorSelection
                bracket={props.model}
                editable={currStep === 0}
                selectable={searchResults}
                selected={props.model.competitors}
              />
            </Grid>
          </Grid>
        </Paper>
        <Grid container className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            disabled={currStep <= 0}
            onClick={() => {
              const newStep = currStep - 1;
              updateCreationStateForStep(newStep);
              setStep(newStep);
            }}
            className={classes.button}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={currStep > MAX_STEP || !props.model.competitors.length}
            onClick={() => {
              if (currStep === MAX_STEP) {
                makeBracket();
              }
              const newStep = currStep + 1;
              updateCreationStateForStep(newStep);
              setStep(newStep);
            }}
            className={classes.button}
          >
            Next
          </Button>
        </Grid>
      </>
    )
  );
}
