import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { RouteComponentProps } from "react-router-dom";
import { Competitor, Bracket } from "../types";
import CompetitorDisplay from "../components/CompetitorDisplay";
import { AppState } from "../store";
import { getBracket } from "../store/bracket/actions";

type RouteParams = { id: string };
type Props = { bracket: Bracket; isLoading: boolean };

function BracketCompetition(props: RouteComponentProps<RouteParams> & Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.bracket.id !== props.match.params.id) {
      dispatch(getBracket(props.match.params.id));
    }
  }, [dispatch, props.match.params.id, props.bracket.id]);

  return (
    <>
      <Typography component="h3" variant="h3" color="inherit" gutterBottom>
        {props.bracket.name || "Round One:"}
      </Typography>
      <Grid container direction="column">
        {!props.isLoading &&
          props.bracket.competitors.map((c: Competitor) => {
            return (
              <Grid item xs={12} key={c.id}>
                <CompetitorDisplay
                  competitor={c}
                  displayedOn="competition"
                  onClickCta={() => {
                    console.log("this will do something one day");
                  }}
                />
              </Grid>
            );
          })}
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
