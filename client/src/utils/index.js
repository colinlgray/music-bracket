const { get, isObject } = require("lodash");

export function makeRequest(url, params = {}) {
  let newParams = params;
  if (get(params, "method", "").toLowerCase() === "post") {
    if (!params.body || !isObject(params.body)) {
      return Promise.reject(
        new Error(
          `Expected an object for the 'body key', received ${typeof params.body}`
        )
      );
    }
    const { body, ...remainingParams } = params;
    newParams = {
      headers: {
        "Content-Type": "application/json"
      },
      referrer: "no-referrer",
      body: JSON.stringify(body),
      ...remainingParams
    };
  }
  return fetch(url, newParams).then(response => {
    if (response.status === 404) {
      return Promise.resolve(null);
    } else if (response.status >= 400) {
      return Promise.reject(new Error(response.statusText));
    }
    return response.json();
  });
}
