import axios from 'axios';

export const getNews = async (): Promise<any> => {
  const endpoint = "/api/news";
  const response = await axios.get(endpoint);
  return response.data
}