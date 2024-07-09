import axios from 'axios';

interface Query{
  world: string
  year: string
  month: string
}

export const getStory = async (param:Query): Promise<any> => {
  const endpoint = "/api/scenario";
  const response = await axios.get(endpoint, {
    params: {
      world: param.world,
      year: param.year,
      month: param.month
    }
  });
  return response.data
}