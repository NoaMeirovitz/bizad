const serverUrl = "http://localhost:3001/";

export const handleRequest = function (
  apiRoute: string,
  body: object
): Promise<Response> {
  return fetch(`${serverUrl}${apiRoute}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const get = function (apiRoute: string): Promise<Response> {
  return fetch(`${serverUrl}${apiRoute}`);
};

export const deleteRequest = function (
  apiRoute: string,
  body: object
): Promise<Response> {
  return fetch(`${serverUrl}${apiRoute}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
