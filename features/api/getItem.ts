import axios from 'axios';

interface Params {
    name: string
    world: string;
    page: number
}

export const getItems = async (params: Params): Promise<any> => {
  if(params.world == "any"){
    params.world = ""
  }
  const endpoint = `api/items/?name=${params.name}&world=${params.world}&page=${params.page}`;
  const response = await axios.get(endpoint);
  return response.data
}

export const getItemDetail = async (slug: string): Promise<any> => {
  const endpoint = `/api/items/${slug}`;
  const response = await axios.get(endpoint);
  return response.data
}