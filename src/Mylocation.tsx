import axios from "axios";

let post_Data = axios.create({
  baseURL: "https://httpstat.us/200",
});

export const post_Location = (locationName: string, time: string) => {
  return post_Data.post("/location", { location: { locationName, time } });
};
