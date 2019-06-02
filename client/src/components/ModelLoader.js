import * as React from "react";

export default class ModelLoader extends React.Component {
  constructor() {
    super();
    this.state = {
      model: null,
      error: null
    };
  }
  componentDidMount() {
    this.props.model
      .fetchOrCreate(this.props.match.params.id)
      .then(model => {
        this.setState({ model });
      })
      .catch(error => this.setState({ error }));
  }
  render() {
    if (this.state.model) {
      const { Component, ...remaining } = this.props;
      return <Component {...remaining} model={this.state.model} />;
    } else if (this.state.error) {
      const ErrorComponent = this.props;
      if (ErrorComponent) {
        return <ErrorComponent error={this.state.error} />;
      }
      return "sorry something has gone wrong";
    }
    return "not ready";
  }
}
