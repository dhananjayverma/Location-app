import axios from "axios";

let postData = axios.create({
  baseURL: "https://httpstat.us/200",
});

export const postLocation = (locationName: string, time: string) => {
  return postData.post("/location", { location: { locationName, time } });
};
