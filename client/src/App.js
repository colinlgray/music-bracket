import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems } from "./components/ListItems";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Nominate from "./components/Nominate";
import Nominations from "./components/Nominations";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit * 2
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginTop: theme.spacing.unit * 8
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  bodyText: {
    marginBottom: "24px"
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  navList: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  notifications: {
    display: "none"
  }
});

class App extends React.Component {
  state = {
    nominees: ["1. Old Town Road remix ft. Billy Ray Cyrus", "2. Old Town Road"]
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Router>
          <CssBaseline />
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes.appBarShift)}
          >
            <Toolbar disableGutters className={classes.toolbar}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Song of the Summer: 2019
              </Typography>
              <IconButton color="inherit">
                <Badge
                  badgeContent={0}
                  color="secondary"
                  className={classes.notifications}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, classes.drawerPaperClose)
            }}
          >
            <List className={classes.navList}>{mainListItems}</List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Route path="/" exact component={Home} />
            <Route
              path="/nominate/"
              render={props => (
                <Nominate
                  {...props}
                  addNominee={name => {
                    this.state.nominees.push(
                      `${this.state.nominees.length + 8}. ${name}`
                    );
                  }}
                />
              )}
            />
            <Route
              path="/nominations/"
              render={props => (
                <Nominations {...props} nominees={this.state.nominees} />
              )}
            />
          </main>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
