import axios from "axios";

const calAPI = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      'Authorization': 'Bearer my-token',
    }
});

export default calAPI