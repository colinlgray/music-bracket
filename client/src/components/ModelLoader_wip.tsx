import * as React from "react";
import { Subtract } from "utility-types";
import { BaseModel } from "../models";
import { RouteComponentProps } from "react-router-dom";

type RouteParams = { id: string };

export interface Props {
  Component: React.ComponentType;
}
interface State {
  model: BaseModel;
}
export default class ModelLoader<T> extends React.Component<
  Props & RouteComponentProps<RouteParams>,
  State
> {
  render() {
    return "wip";
    // if (this.state.model) {
    //   const { Component, ...remaining } = this.props;
    //   return <Component {...remaining as T} model={this.state.model} />;
    // } else {
    //   return "not ready";
    // }
  }
}
