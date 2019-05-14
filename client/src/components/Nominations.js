import React from "react";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

function Nominations(props) {
  return (
    <>
      <Typography component="h3" variant="h3" color="inherit" gutterBottom>
        Nominations
      </Typography>
      <Typography variant="h6">
        <List>
          {props.nominees.map(val => {
            return (
              <ListItem key={val}>
                <ListItemText primary={val} />
              </ListItem>
            );
          })}
        </List>
      </Typography>
    </>
  );
}
export default Nominations;
