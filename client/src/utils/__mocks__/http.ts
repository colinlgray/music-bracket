interface IHttpResponse<T> extends Response {
  parsedBody?: T;
}

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
  return Promise.resolve(new Response());
};
