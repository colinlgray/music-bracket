export function makeRequest(url, params = {}) {
  let newParams = params;
  if (params.method === "post") {
    newParams = {
      headers: {
        "Content-Type": "application/json"
      },
      referrer: "no-referrer",
      ...params
    };
  }

  return fetch(url, newParams).then(response => {
    if (response.status >= 400) {
      console.error(response);
      return new Error(response.statusText);
    }
    return response.json();
  });
}
