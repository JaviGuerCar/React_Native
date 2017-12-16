import axios from 'axios';

export function fetchHousesList(){
  return new Promise(function(resolve, reject) {
    const fetchURL = '/casas'
    axios.get(fetchURL)
    .then((response) => {
      console.log("axios get response: ", response);
      const miList = response.data && response.data.records ? response.data.records : []
      resolve(miList)
    })
    .catch((error) => {
      console.log("axios get response: ", error);
      reject(error)
    });
  })
}
