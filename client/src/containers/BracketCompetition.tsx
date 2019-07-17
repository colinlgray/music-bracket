import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { RouteComponentProps } from "react-router-dom";
import Bracket from "../models/Bracket";
import { Competitor } from "../models";
import CompetitorDisplay from "../components/CompetitorDisplay";

type RouteParams = { id: string };
type Props = { model: Bracket };

function BracketCompetition(props: RouteComponentProps<RouteParams> & Props) {
  return (
    <>
      <Typography component="h3" variant="h3" color="inherit" gutterBottom>
        {props.model.name || "Round One:"}
      </Typography>
      <Grid container direction="column">
        {props.model.competitors.map((c: Competitor) => {
          return (
            <Grid item xs={12}>
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

export default BracketCompetition;
