import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Link } from "react-router-dom";

export default class ListItemLink extends React.Component {
  renderLink = React.forwardRef((itemProps, ref) => (
    <Link to={this.props.to} {...itemProps} ref={ref} />
  ));

  render() {
    const { icon, primary, secondary } = this.props;
    return (
      <li>
        <ListItem button component={this.renderLink}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText inset primary={primary} secondary={secondary} />
        </ListItem>
      </li>
    );
  }
}
