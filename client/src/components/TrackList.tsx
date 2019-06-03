import React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CompetitorDisplay from "./CompetitorDisplay";
import Grid from "@material-ui/core/Grid";
import { Competitor } from "../models";
const styles = (theme: Theme) => ({});

type Props = {
  competitors: Array<Competitor>;
};

export function TrackList(props: Props) {
  const { competitors } = props;
  return (
    <Grid container direction="column">
      <Grid item>
        <List>
          {competitors.map((competitor: Competitor) => (
            <ListItem key={competitor.id}>
              <CompetitorDisplay
                track={competitor.track}
                viewState="selected"
                onClickCta={() => {
                  console.log("delete");
                }}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(TrackList);
