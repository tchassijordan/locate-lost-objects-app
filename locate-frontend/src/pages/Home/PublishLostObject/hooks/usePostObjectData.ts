/* 
  ===================================================
  Custom hook isn't functioning correctly
  ===================================================
*/

export default async function postObjectData({
  values,
  path
}: TProps): Promise<number> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const request = new Request(`http://127.0.0.1:8000/${path}`, {
    method: 'POST',
    body: JSON.stringify(values)
  });
  const response = await fetch(request, { headers });
  return response.status;
}

type TProps = {
  values: any;
  path: string;
};
