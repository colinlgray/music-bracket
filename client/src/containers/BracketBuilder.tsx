import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { Search, CompetitorSelection, SeedingOptions } from "../components";
import Grid from "@material-ui/core/Grid";
import { Bracket, Competitor, CreationStates } from "../models";
import {
  getBracket,
  addCompetitor,
  removeCompetitor,
  reorderCompetitors
} from "../store/bracket/actions";
import {
  searchSpotify,
  removeFromSearchResults,
  addSearchResult,
  reorderSearchResults
} from "../store/system/actions";
import { SearchRequest } from "../store/system/types";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AppState } from "../store";
import { isNumber } from "lodash";

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
type Props = {
  bracket: Bracket;
  searchResults: Array<Competitor>;
  isLoading: boolean;
};

function BracketBuilder(props: RouteComponentProps<RouteParams> & Props) {
  const classes = useStyles();
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
                  onChange={(request: SearchRequest) =>
                    dispatch(searchSpotify(request))
                  }
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
                selectable={props.searchResults}
                selected={props.bracket.competitors}
                onReorder={(params: {
                  listName: string;
                  startIndex: number;
                  endIndex: number;
                }) => {
                  if (params.listName === "selectable") {
                    dispatch(
                      reorderSearchResults({
                        startIndex: params.startIndex,
                        endIndex: params.endIndex
                      })
                    );
                  } else {
                    dispatch(
                      reorderCompetitors({
                        startIndex: params.startIndex,
                        endIndex: params.endIndex,
                        competitors: props.bracket.competitors
                      })
                    );
                  }
                }}
                onAddCompetitor={(c: Competitor, index: number) => {
                  dispatch(addCompetitor(c, index));
                  dispatch(removeFromSearchResults(c));
                }}
                onRemoveCompetitor={(
                  c: Competitor,
                  destinationIndex?: number
                ) => {
                  if (isNumber(destinationIndex)) {
                    dispatch(addSearchResult(c, destinationIndex));
                  }
                  dispatch(removeCompetitor(c));
                }}
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
    isLoading: state.bracket.isLoadingBracket,
    searchResults: state.system.searchResults
  };
}
export default connect(mapStateToProps)(BracketBuilder);
