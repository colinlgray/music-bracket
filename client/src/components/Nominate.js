import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { debounce } from "lodash";
import SearchResults from "./SearchResults";

const styles = theme => ({
  textInput: {
    width: theme.spacing.unit * 24,
    marginRight: theme.spacing.unit * 4
  },
  button: {
    margin: theme.spacing.unit * 2
  },
  searchResults: {
    margin: theme.spacing.unit * 2
  },
  loadingIcon: {
    margin: theme.spacing.unit * 2
  }
});

class Nominate extends React.Component {
  constructor(props) {
    super(props);
    this.debouncedLookupSongs = debounce(this.lookupSongs.bind(this), 500);
  }
  state = {
    query: "",
    url: "",
    loading: false,
    searchResults: []
  };
  componentDidMount() {
    this.setState({ name: "" });
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleChange = key => e => {
    this.setState(
      { [key]: e.target.value, loading: true },
      this.debouncedLookupSongs
    );
  };
  handleKeyPress = e => {
    if (e && e.keyCode === 13) {
      this.handleSubmit();
    }
  };
  lookupSongs = () => {
    fetch(`/api/songs?q=${encodeURI(this.state.query)}`)
      .then(res => res.text())
      .then(text => {
        console.log("text", text);
        this.setState({ loading: false });
      });
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
          <Grid item xs={12}>
            <TextField
              className={classes.textInput}
              label="Search"
              value={this.state.query}
              onChange={this.handleChange("query")}
              margin="normal"
            />
          </Grid>
          <Grid item className={classes.searchResults}>
            <SearchResults
              loading={this.state.loading}
              items={this.state.searchResults}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(Nominate);
