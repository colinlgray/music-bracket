import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { debounce } from "lodash";
import SearchResults from "./SearchResults";
import { SEARCH_LIMIT } from "../constants";

const styles = theme => ({
  textInput: {
    width: theme.spacing(24),
    marginRight: theme.spacing(4)
  },
  button: {
    margin: theme.spacing(2)
  },
  searchResults: {
    margin: theme.spacing(2)
  },
  loadingIcon: {
    margin: theme.spacing(2)
  }
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.debouncedLookupSongs = debounce(this.lookupSongs.bind(this), 500);
  }
  state = {
    query: "",
    url: "",
    loading: false,
    searchResults: [],
    // searchResults: tracks,
    searchError: null,
    offset: 0
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
      {
        [key]: e.target.value,
        loading: true,
        searchError: null,
        hasHiddenSearchError: false
      },
      this.debouncedLookupSongs
    );
  };
  handleKeyPress = e => {
    if (e && e.keyCode === 13) {
      this.setState(
        {
          loading: true
        },
        this.lookupSongs
      );
    }
  };
  lookupSongs = () => {
    if (!this.state.query.trim().length) {
      return this.setState({
        loading: false,
        searchResults: [],
        totalResults: 0
      });
    }
    fetch(
      `/api/tracks/search?query=${encodeURI(
        this.state.query
      )}&limit=${SEARCH_LIMIT}&offset${this.state.offset}`
    )
      .then(res => res.json())
      .then(response => {
        this.setState({
          loading: false,
          searchResults: response.items,
          totalResults: response.total
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false, searchError: err });
      });
  };
  render() {
    const { classes, onAddTrack } = this.props;
    return (
      <Grid container direction="column">
        <Grid item xs={1}>
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
            error={this.state.searchError}
            hasHiddenError={this.state.hasHiddenSearchError}
            onAddTrack={track => onAddTrack(track)}
            onClose={() => {
              this.setState({ hasHiddenSearchError: true });
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Search);
