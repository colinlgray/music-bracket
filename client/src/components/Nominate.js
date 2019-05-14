import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class Nominate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    name: ""
  };
  handleChange = key => event => {
    this.setState({ [key]: event.target.value });
  };
  handleSubmit = () => {
    this.props.addNominee(this.state.name);
  };
  render() {
    return (
      <>
        <Typography component="h3" variant="h3" color="inherit" gutterBottom>
          Nominate a song
        </Typography>
        <Typography component="div">
          <TextField
            id="standard-name"
            label="Song Name"
            value={this.state.name}
            onChange={this.handleChange("name")}
            margin="normal"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            style={{ float: "right", marginTop: "16px" }}
          >
            Submit
          </Button>
        </Typography>
      </>
    );
  }
}
