import axios from "axios";

import API_DOMAIN from './constant'

const calAPI = axios.create({
    baseURL: API_DOMAIN,
    headers: {
      'Authorization': 'Bearer my-token',
    }
});

export default calAPI