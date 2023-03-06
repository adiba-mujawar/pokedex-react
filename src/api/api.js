import axios from "axios";

export function handleResponse(response) {
    if (
      response.status === 200 ||
      response.status === 202 ||
      response.statusText === "OK" ||
      response.statusText === "Created"
    )
      return response.data;
    if (response.status === 400) {
      // So, a server-side validation error occurred.
      // Server side validation returns a string error message, so parse as text instead of json.
      const error = response.statusText();
      throw new Error(error);
    }
    throw new Error("Network response was not ok.");
  }
  
  // In a real app, would likely call an error logging service.
  export function handleError(error) {
    console.error("API call failed. " + error);
    throw error;
  }

const httpRequest = (method, url, request, headers) => {
  return axios({
    method,
    url,
    data: request,
    headers,
  })
    .then((res) => {
      const result = handleResponse(res);
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(handleError(err));
    });
};

const get = (url, request, headers) => {
  let queryString = "";
  if (request && Object.keys(request).length > 0) {
    queryString += "?";
    let len = Object.keys(request).length,
      cnt = 0;
    for (let key in request) {
      cnt++;
      queryString += `${key}=${request[key].toString()}`;
      if (len > cnt) queryString += "&";
    }
  }
  return httpRequest("get", `${url}${queryString}`, request, headers);
};

const Api = {
    get
  };
  
  export default Api;