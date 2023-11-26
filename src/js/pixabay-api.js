
import axios from 'axios';

const KEY = '40858309-c006559b48084651189398a1c';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
}

