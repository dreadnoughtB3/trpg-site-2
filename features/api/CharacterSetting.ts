import axios from 'axios';

interface Param {
  body: String;
  name: String;
  specie: String;
  world: String;
  sex: String;
  age: number;
  id: String;
}

export const getCharacterSettings = async (name?: string, world?: string): Promise<any> => {
  const endpoint = "/api/character/chara_setting";
  if(world == "any"){
    world = undefined
  }
  const response = await axios.get(endpoint, {
    params: {
      name: name,
      world: world
    }
  });
  return response.data
}

export const getCharacterSetting = async (slug: string): Promise<any> => {
  const endpoint = `/api/character/chara_setting/${slug}`;
  const response = await axios.get(endpoint);
  return response.data
}

export const patchCharacterSetting = async (slug: string, params: Param): Promise<any> => {
  const endpoint = `/api/character/chara_setting/${slug}`;
  const response = await fetch(endpoint, {
    method: "PATCH",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      name: params.name,
      world: params.world,
      sex: params.sex,
      age: Number(params.age),
      species: Number(params.specie),
      id: params.id,
      body: params.body.replace(/\r?\n/g, "\n")
    })
  });
  return response.status
}

export const postCharacterSetting = async (params: Param): Promise<any> => {
  const endpoint = "/api/character/chara_setting";
  const response = await axios.post(endpoint, {
    name: params.name,
    world: params.world,
    sex: params.sex,
    age: Number(params.age),
    specie: Number(params.specie),
    body: params.body.replace(/\r?\n/g, "\n"),
    user_id: localStorage.getItem('uid')
  });
  return response.data
}