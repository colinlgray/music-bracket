import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { get } from "../utils/http";
import { RouteComponentProps } from "react-router-dom";
import Bracket from "../models/Bracket";

type RouteParams = { id: string };
type Props = { model: Bracket };

function BracketCompetition(props: RouteComponentProps<RouteParams> & Props) {
  return (
    <>
      <Typography component="h3" variant="h3" color="inherit" gutterBottom>
        {props.model.name || "Round One:"}
      </Typography>
      <Grid container direction="row">
        Bracket {props.model.id}
      </Grid>
    </>
  );
}

export default BracketCompetition;
