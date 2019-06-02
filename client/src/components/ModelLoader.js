import * as React from "react";
import { Subtract } from "utility-types";
import { BaseModel } from "../models";
import { RouteComponentProps } from "react-router-dom";

export default class ModelLoader extends React.Component {
  constructor() {
    super();
    this.state = {
      model: null
    };
  }
  render() {
    if (this.state.model) {
      const { Component, ...remaining } = this.props;
      return <Component {...remaining} model={this.state.model} />;
    } else {
      return "not ready";
    }
  }
}
