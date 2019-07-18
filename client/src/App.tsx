import React, { useState } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  BracketCompetition,
  BracketBuilder,
  BracketList,
  Home
} from "./containers";
import ListItemLink from "./components/ListItemLink";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BarChartIcon from "@material-ui/icons/BarChart";
import RateReviewIcon from "@material-ui/icons/RateReview";
import ModelLoader from "./components/ModelLoader";
import { Bracket } from "./models";
import useStyles from "./app.css";

function App() {
  const [open, setOpen] = useState(false);
  const [nominees] = useState([
    "1. Old Town Road remix ft. Billy Ray Cyrus",
    "2. Old Town Road"
  ]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => {
                setOpen(true);
              }}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Song of the Summer: 2019
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List className={classes.navList}>
            <ListItemLink to="/" primary="Home" icon={<DashboardIcon />} />
            <ListItemLink
              to="/build"
              primary="Build a bracket"
              icon={<RateReviewIcon />}
            />
            <ListItemLink
              to="/nominations"
              primary="Current Nominations"
              icon={<BarChartIcon />}
            />
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Route path="/" exact component={Home} />
          <Route
            path="/build/:id?"
            render={props => {
              return (
                <ModelLoader
                  {...props}
                  Component={BracketBuilder}
                  model={Bracket}
                  type="fetchOrCreate"
                />
              );
            }}
          />
          <Route
            path="/bracket/:id"
            render={props => {
              return (
                <ModelLoader
                  {...props}
                  Component={BracketCompetition}
                  model={Bracket}
                  type="fetch"
                />
              );
            }}
          />
          <Route
            path="/nominations/"
            render={props => {
              return (
                <ModelLoader
                  {...props}
                  Component={BracketList}
                  model={Bracket}
                  type="fetchAll"
                />
              );
            }}
          />
        </main>
      </Router>
    </div>
  );
}

export default App;
