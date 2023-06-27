import axios from "axios";

// export const app = axios.create({
//   baseURL:
//     "https://fa4uvgt6dzfkaf4khpwslybcgy0niuvd.lambda-url.us-east-2.on.aws/",
// });

export const createSession = async (email, password) => {
  return axios.post(
    "https://javbstvpofyg5dxpvk2v7fppqy0qoibr.lambda-url.us-east-2.on.aws/",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
