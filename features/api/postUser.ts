import axios from "axios";

interface formData{
  discord: string,
  name: string,
  password: string
}

export const postUser = async (param:formData): Promise<any> => {
  const endpoint = "/api/user/signup";
  const response = await axios.post(endpoint, {
    discord: param.discord,
    name: param.name,
    password: param.password
  });
  return response.data
}