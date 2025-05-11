import axios from 'axios';
import {GOOGLE_API_KEY} from '@env'
const GlobalApi = {
  searchByText: (query, location = null) => {
    const baseUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
    const params = {
      query,
      key: GOOGLE_API_KEY,
    };

    if (location) {
      params.location = `${location.latitude},${location.longitude}`;
      params.radius = 5000; 
    }

    return axios.get(baseUrl, { params });
  },
};

export default GlobalApi;