import axios from 'axios';


export const api = axios.create({
  baseURL: 'https://paradygmaty-db.onrender.com/',
});