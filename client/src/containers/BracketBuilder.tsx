import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { RouteComponentProps, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { isNumber } from "lodash";
import clsx from "clsx";
import { Search, CompetitorSelection, SeedingOptions } from "../components";
import { Bracket, Competitor, CreationStates } from "../types";
import {
  getBracket,
  addCompetitor,
  removeCompetitor,
  reorderCompetitors,
  reseedCompetitors,
  updateBracket
} from "../store/bracket/actions";
import {
  searchSpotify,
  removeFromSearchResults,
  addSearchResult,
  reorderSearchResults
} from "../store/system/actions";
import { SearchRequest } from "../store/system/types";
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
  },
  shrink: {
    display: "inline-block"
  },
  paper: {
    display: "inline-block",
    width: theme.spacing(100),
    transition: "width 500ms ease"
  },
  paperSmall: {
    width: theme.spacing(50)
  }
}));

const headerText: { [step: number]: string } = {
  0: "Select Tracks",
  1: "Select Seeding"
};

const MAX_STEP = 2;
const creationStateToStep: { [creationState: string]: number } = {
  created: 0,
  seeding: 1,
  naming: 2,
  started: 3
};

type RouteParams = { id: string };
type Props = {
  bracket: Bracket;
  searchResults: Array<Competitor>;
  totalResults: number;
  isLoading: boolean;
};

function BracketBuilder(props: RouteComponentProps<RouteParams> & Props) {
  const classes = useStyles();
  const currStep = creationStateToStep[props.bracket.creationState] || 0;

  const updateCreationStateForStep = (step: number) => {
    props.bracket.creationState = Object.keys(creationStateToStep)[
      step
    ] as CreationStates;
    dispatch(
      updateBracket({
        creationState: Object.keys(creationStateToStep)[step] as CreationStates
      })
    );
  };
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  useEffect(() => {
    dispatch(getBracket(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const makeBracket = () => {
    dispatch(
      updateBracket({
        name
      })
    );
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
        <div className={classes.shrink}>
          {currStep < 2 && (
            <Paper
              className={clsx(classes.shrink, classes.paper, {
                [classes.paperSmall]: currStep === 1
              })}
            >
              <Grid
                container
                className={classes.cardHeader}
                alignItems="center"
              >
                {currStep === 0 && (
                  <Search
                    onChange={(request: SearchRequest) =>
                      dispatch(searchSpotify(request))
                    }
                    totalResults={props.totalResults}
                  />
                )}
                {currStep === 1 && (
                  <SeedingOptions
                    onChange={(value: string) => {
                      if (value !== "custom") {
                        dispatch(reseedCompetitors(value));
                      }
                    }}
                  />
                )}
              </Grid>
              {props.isLoading && "Loading..."}

              <CompetitorSelection
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
            </Paper>
          )}
          {currStep === 2 && (
            <TextField
              label="Enter name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
              margin="normal"
            />
          )}
          <Grid container className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              disabled={currStep <= 0}
              onClick={() => {
                const newStep = currStep - 1;
                updateCreationStateForStep(newStep);
              }}
              className={classes.button}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={
                currStep > MAX_STEP || !props.bracket.competitors.length
              }
              onClick={() => {
                if (currStep === MAX_STEP) {
                  makeBracket();
                }
                const newStep = currStep + 1;
                updateCreationStateForStep(newStep);
              }}
              className={classes.button}
            >
              Next
            </Button>
          </Grid>
        </div>
      </>
    )
  );
}

function mapStateToProps(state: AppState) {
  return {
    bracket: state.bracket.currentBracket,
    isLoading: state.bracket.isLoadingBracket,
    searchResults: state.system.searchResults,
    totalResults: state.system.totalSearchResults
  };
}
export default connect(mapStateToProps)(BracketBuilder);
