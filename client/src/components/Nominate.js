import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  textInput: {
    width: theme.spacing.unit * 24,
    marginRight: theme.spacing.unit * 4
  },
  button: {
    marginTop: theme.spacing.unit * 2
  }
});

class Nominate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    name: "",
    artist: "",
    submitted: false,
    searchResults: []
  };
  componentDidMount() {
    this.setState({ submitted: false, name: "" });
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleChange = key => e => {
    this.setState({ [key]: e.target.value });
  };
  handleKeyPress = e => {
    if (e && e.keyCode === 13) {
      this.handleSubmit();
    }
  };
  handleSubmit = () => {
    if (this.state.name && !this.state.submitted) {
      this.props.addNominee(this.state.name);
      this.setState({ submitted: true });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <Typography component="h3" variant="h3" color="inherit" gutterBottom>
          Nominate
        </Typography>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-end"
        >
          <Grid item>
            <TextField
              className={classes.textInput}
              label="Song Name"
              value={this.state.name}
              onChange={this.handleChange("name")}
              margin="normal"
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.textInput}
              label="Artist"
              value={this.state.artist}
              onChange={this.handleChange("artist")}
              margin="normal"
            />
          </Grid>
          <Grid item>
            <IconButton
              color="primary"
              aria-label="Search"
              onClick={this.handleSubmit}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(Nominate);
