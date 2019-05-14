import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { grey, green } from "@material-ui/core/colors";

const buttonTheme = createMuiTheme({
  palette: { primary: grey, secondary: green },
  typography: { useNextVariants: true }
});

class Nominate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    name: "",
    submitted: false
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
    return (
      <>
        <Typography component="h3" variant="h3" color="inherit" gutterBottom>
          Nominate
        </Typography>
        <Typography component="div">
          <TextField
            id="standard-name"
            label="Song Name"
            value={this.state.name}
            onChange={this.handleChange("name")}
            margin="normal"
            fullWidth
            inputRef={el => (this.inputField = el)}
          />
          <MuiThemeProvider theme={buttonTheme}>
            <Button
              variant="contained"
              color={this.state.submitted ? "secondary" : "primary"}
              onClick={this.handleSubmit}
              style={{ float: "right", marginTop: "16px" }}
            >
              {this.state.submitted ? "Done" : "Submit"}
            </Button>
          </MuiThemeProvider>
        </Typography>
      </>
    );
  }
}

export default Nominate;
