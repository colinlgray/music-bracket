import React from "react";
import TextField from "@material-ui/core/TextField";
import { WithStyles } from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles";
import { debounce } from "lodash";
import { SEARCH_LIMIT } from "../constants";
import Track from "../models/Track";
import Grid from "@material-ui/core/Grid";

const styles = (theme: Theme) => ({
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

export interface SearchResults {
  items: Array<any>;
  total: number;
}

interface Props extends WithStyles<typeof styles> {
  onChange?: (response: SearchResults) => any;
}

interface State {
  query: string;
  url: string;
  loading: boolean;
  searchResults: Array<Track>;
  searchError: any;
  offset: number;
  hasHiddenSearchError: boolean;
  totalResults: number;
}

class Search extends React.Component<Props, State> {
  debouncedLookupSongs: () => void;

  constructor(props: Props) {
    super(props);
    this.debouncedLookupSongs = debounce(this.lookupSongs.bind(this), 500);
  }
  state = {
    query: "",
    url: "",
    loading: false,
    searchResults: [],
    searchError: null,
    offset: 0,
    hasHiddenSearchError: false,
    totalResults: 0
  };
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState(
      {
        query: e.target.value,
        loading: true,
        searchError: null,
        hasHiddenSearchError: false
      },
      this.debouncedLookupSongs
    );
  }
  handleKeyPress = (e: KeyboardEvent) => {
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
      this.setState({
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
          searchResults: response.items.map(
            (serverResponse: any) => new Track(serverResponse)
          ),
          totalResults: response.total
        });
        if (this.props.onChange) {
          this.props.onChange(response);
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false, searchError: err });
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <TextField
          className={classes.textInput}
          label="Search"
          value={this.state.query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.handleChange(e);
          }}
          margin="normal"
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(Search);
