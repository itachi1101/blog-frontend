// let production = process.env.REACT_APP_PRODUCTION;

let testing = false
const port = 5000;

// development url for herokuapp
//example testingURL = "https://app-name.herokuapp.com/";

export const API_HOSTNAME = testing
  ? `http://localhost:${port}/api/`
  : "https://aviral-blog-backend.onrender.com/api/";

export const getApiUrl = (url) => `${API_HOSTNAME}${url}`;