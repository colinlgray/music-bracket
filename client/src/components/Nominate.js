import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { debounce } from "lodash";

const styles = theme => ({
  textInput: {
    width: theme.spacing.unit * 24,
    marginRight: theme.spacing.unit * 4
  },
  button: {
    marginTop: theme.spacing.unit * 2
  },
  searchResults: {
    marginTop: theme.spacing.unit * 2
  }
});

class Nominate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.waitForSubmit = debounce(this.handleSubmit, 500);
  }
  state = {
    query: "",
    url: "",
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
    this.waitForSubmit();
    this.setState({ [key]: e.target.value });
  };
  handleKeyPress = e => {
    if (e && e.keyCode === 13) {
      this.handleSubmit();
    }
  };
  handleSubmit = () => {
    if (this.state.query) {
      // this.props.addNominee(this.state.name);
      this.setState({
        url: `https://api.spotify.com/v1/search?q=${encodeURI(
          this.state.query
        )}`
      });
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
            <Typography component="div">{this.state.url}</Typography>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(Nominate);
