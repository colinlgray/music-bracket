import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BarChartIcon from "@material-ui/icons/BarChart";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { Link } from "react-router-dom";

class ListItemLink extends React.Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;

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

export const mainListItems = (
  <div>
    <ListItemLink to="/" primary="Home" icon={<DashboardIcon />} />
    <ListItemLink
      to="/nominate"
      primary="Nominate a song"
      icon={<RateReviewIcon />}
    />
    <ListItemLink
      to="/nominations"
      primary="Current Nominations"
      icon={<BarChartIcon />}
    />
  </div>
);
