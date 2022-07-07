import { TObject } from '../../pages/PostObject';

const useFetch = async ({ path, requestType, foundObject }: TFProps): Promise<[]> => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  if (requestType === 'GET') {
    let res;
    if (foundObject) res = await fetch(`http://127.0.0.1:8001/${path}`, { headers });
    res = await fetch(`http://127.0.0.1:8000/${path}`, { headers });
    const json = await res.json();
    return json;
  }
  
  return [];
};

export default useFetch;

export type TFProps = {
  path: string;
  requestType?: 'GET' | 'PUT' | 'POST' | 'DELETE';
  body?: { [k: string]: string }[];
  foundObject?: boolean;
};

export type TFetch = {
  json: TObject[];
};
