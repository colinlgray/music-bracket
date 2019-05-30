export interface IHttpResponse<T> extends Response {
  parsedBody?: T;
}

export const http = <T>(request: RequestInfo): Promise<IHttpResponse<T>> => {
  return new Promise((resolve, reject) => {
    let response: IHttpResponse<T>;
    fetch(request)
      .then(res => {
        response = res;
        return res.json();
      })
      .then(body => {
        if (response.ok) {
          response.parsedBody = body;
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const get = async <T>(
  path: string,
  args: RequestInit = { method: "get" }
): Promise<IHttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

export const post = async <T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  }
): Promise<IHttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

export const put = async <T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: "put",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  }
): Promise<IHttpResponse<T>> => {
  return await http<T>(new Request(path, args));
};

// export function makeRequest(url: string, params = { body: any }) {
//   let newParams = params;
//   if (get(params, "method", "").toLowerCase() === "post") {
//     if (!params.body || !isObject(params.body)) {
//       return Promise.reject(
//         new Error(
//           `Expected an object for the 'body key', received ${typeof params.body}`
//         )
//       );
//     }
//     const { body, ...remainingParams } = params;
//     newParams = {
//       headers: {
//         "Content-Type": "application/json"
//       },
//       referrer: "no-referrer",
//       body: JSON.stringify(body),
//       ...remainingParams
//     };
//   }
//   return fetch(url, newParams).then(response => {
//     if (response.status === 404) {
//       return Promise.resolve(null);
//     } else if (response.status >= 400) {
//       return Promise.reject(new Error(response.statusText));
//     }
//     return response.json();
//   });
// }
