import axios from 'axios';

export function fetchHousesList() {
  const fetchURL = '/casas'
  return axios.get(fetchURL)
  .then((response) => {
    console.log("axios get response:", response);
    const miList = response.data && response.data.records ? response.data.records : []
    return miList
  })
  .catch((error) => {
    console.log("axios get error:", error);
    return []
  })
}
