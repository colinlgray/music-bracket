import React, { useState, useEffect } from "react";

export default function ModelLoader(props) {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    props.model[props.type](props.match.params.id)
      .then(model => {
        setModel(model);
      })
      .catch(error => setError(error));
  }, [props.model, props.match.params.id, props.type]);

  if (model) {
    const { Component, ...remaining } = props;
    return <Component {...remaining} model={model} />;
  } else if (error) {
    const { ErrorComponent } = props;
    if (ErrorComponent) {
      return <ErrorComponent error={error} />;
    }
    return <div>sorry something has gone wrong</div>;
  }
  return <div>Loading...</div>;
}
