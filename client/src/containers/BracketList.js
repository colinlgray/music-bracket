import React from "react";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { map, filter } from "lodash";

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2)
  },
  player: {
    height: "80px"
  }
}));

function BracketList(props) {
  const classes = useStyles();
  const startedBrackets = filter(
    props.model,
    m => m.creationState === "started"
  );
  return (
    <>
      <Typography component="h4" variant="h4" color="inherit" gutterBottom>
        Top songs
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary={"1. Old Town Road remix ft. Billy Ray Cyrus"}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary={"2. Old Town Road"} />
        </ListItem>
      </List>
      <Typography component="h4" variant="h4" gutterBottom>
        Other brackets
      </Typography>
      <List>
        {map(startedBrackets, m => (
          <ListItem key={m.id}>
            <Card className={classes.card}>
              <Link href={`/bracket/${m.id}`}>
                <Typography component="div">{m.name || "Unnamed"}</Typography>
              </Link>
            </Card>
          </ListItem>
        ))}
      </List>
    </>
  );
}
export default BracketList;
