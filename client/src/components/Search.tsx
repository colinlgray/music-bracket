import React from "react";
import TextField from "@material-ui/core/TextField";
import { WithStyles } from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
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
  step: number;
}

class Search extends React.Component<Props, State> {
  debouncedLookupSongs: () => void;
  constructor(props: Props) {
    super(props);
    this.debouncedLookupSongs = debounce(this.lookupSongs.bind(this), 500);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }
  state = {
    query: "",
    url: "",
    loading: false,
    searchResults: [],
    searchError: null,
    offset: 0,
    hasHiddenSearchError: false,
    totalResults: 0,
    step: 10
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
        searchError: null,
        hasHiddenSearchError: false
      },
      this.debouncedLookupSongs
    );
  }
  handleKeyPress = (e: KeyboardEvent) => {
    if (e && e.target instanceof HTMLInputElement && e.keyCode === 13) {
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
    } else {
      this.setState({ loading: true });
      fetch(
        `/api/tracks/search?query=${encodeURI(this.state.query)}&limit=${
          this.state.step
        }&offset=${this.state.offset}`
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
    }
  };

  displayText() {
    if (this.state.loading) {
      return "loading";
    } else if (this.state.searchResults.length) {
      return `${this.state.offset + 1}/${this.state.offset + 10} out of ${
        this.state.totalResults
      }`;
    }
    return "";
  }

  handleChangePage(event: unknown, newPage: number) {
    this.setState({ offset: newPage * this.state.step }, this.lookupSongs);
  }

  handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    this.setState({ step: parseInt(event.target.value, 10) }, this.lookupSongs);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item>
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
        <Grid item>
          {this.state.searchResults.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={this.state.totalResults}
              rowsPerPage={this.state.step}
              page={this.state.offset / this.state.step}
              backIconButtonProps={{
                "aria-label": "Previous Page"
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page"
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Search);
