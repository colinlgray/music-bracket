import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { RouteComponentProps } from "react-router-dom";
import { Bracket } from "../types";
import Fab from "@material-ui/core/Fab";
import { AppState } from "../store";
import { getBracket } from "../store/bracket/actions";
import useStyles from "../app.css";

type RouteParams = { id: string };
type Props = { bracket: Bracket; isLoading: boolean };

const InnerContent = (props: {
  loading: boolean;
  showErrorMessage: boolean;
  challongeUrl: string | null;
}) => {
  const classes = useStyles();
  if (props.loading) {
    return (
      <Typography
        component="h4"
        variant="h4"
        color="inherit"
        className={classes.bodyText}
      >
        Loading...
      </Typography>
    );
  } else if (props.showErrorMessage) {
    return (
      <div>
        <Typography
          component="h4"
          variant="h4"
          color="inherit"
          className={classes.bodyText}
        >
          Sorry, something has gone wrong
        </Typography>

        <Fab
          color="primary"
          variant="extended"
          onClick={() => {
            console.log("!!!");
          }}
          aria-label="Try again"
        >
          Try Again
        </Fab>
      </div>
    );
  }
  return <div>"import bracket here {props.challongeUrl}</div>;
};

function BracketCompetition(props: RouteComponentProps<RouteParams> & Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.bracket.id !== props.match.params.id) {
      dispatch(getBracket(props.match.params.id));
    }
  }, [dispatch, props.match.params.id, props.bracket.id]);
  const showErrorMessage = !props.isLoading && !props.bracket.challongeUrl;

  return (
    <>
      <Typography component="h3" variant="h3" color="inherit" gutterBottom>
        {!showErrorMessage && props.bracket.name}
      </Typography>
      <Grid container direction="column">
        <InnerContent
          showErrorMessage={showErrorMessage}
          challongeUrl={props.bracket.challongeUrl}
          loading={props.isLoading}
        />
      </Grid>
    </>
  );
}

function mapStateToProps(state: AppState) {
  return {
    bracket: state.bracket.currentBracket,
    isLoading: state.bracket.isLoadingBracket
  };
}
export default connect(mapStateToProps)(BracketCompetition);
