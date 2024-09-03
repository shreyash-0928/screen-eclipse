import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTA4NDdiODJiODgzZmQ4YmY5YWViOTY2ODBiY2EyZCIsIm5iZiI6MTcyNDkyNzAxMC42ODgwOCwic3ViIjoiNjZkMDQ1YTJlMzQxMzcwYTA2ZWM0MThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.OGDUA65BUHZ7GGsgzjpHOJ3pczejxBS_9cZFSjAZK74'
  }
});

export default instance;
