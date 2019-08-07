import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
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
import { getBracket } from "../store/bracket/actions";
import { map } from "lodash";
import uuid from "uuid/v4";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AppState } from "../store";

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
type Props = { bracket: Bracket; isLoading: boolean };

function BracketBuilder(props: RouteComponentProps<RouteParams> & Props) {
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState<Array<Competitor>>([]);
  const [currStep, setStep] = useState<number>(
    creationStateToStep[props.bracket.creationState] || 0
  );
  const updateCreationStateForStep = (step: number) => {
    props.bracket.creationState = Object.keys(creationStateToStep)[
      step
    ] as CreationStates;
    props.bracket.save().catch(err => {
      console.log("oh no! an error", err);
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBracket(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const makeBracket = () => {
    props.history.push(`/bracket/${props.bracket.id}`);
  };
  return (
    (props.bracket.id && !props.match.params.id && (
      <Redirect to={`/build/${props.bracket.id}`} />
    )) ||
    (props.bracket.creationState === "started" && (
      <Redirect to={`/bracket/${props.bracket.id}`} />
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
                    props.bracket.sortBy(value);
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {props.isLoading && "Loading..."}
              <CompetitorSelection
                bracket={props.bracket}
                editable={currStep === 0}
                selectable={searchResults}
                selected={props.bracket.competitors}
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
            disabled={currStep > MAX_STEP || !props.bracket.competitors.length}
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

function mapStateToProps(state: AppState) {
  return {
    bracket: state.bracket.currentBracket,
    isLoading: state.bracket.isLoadingBracket
  };
}
export default connect(mapStateToProps)(BracketBuilder);
