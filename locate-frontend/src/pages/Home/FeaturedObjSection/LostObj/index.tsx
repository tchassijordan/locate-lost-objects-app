import React, { useEffect, useState } from 'react';
import { PostItem, TSnackbarCategorie } from '../../../../components/index';
import categories from '../../../../lib/data';
import LoadingSVG from '../../../../assets/icons/LoadingSVG';
//import useFetch, { TFProps } from '../../../../lib/hooks/useFetch';

export default function LostObjects() {
  const [path, setPath] = useState<string>('api/Lost-Objects');
  const [selectedCat, setSelectedCat] = useState<TSnackbarCategorie>('all');
  const [APIObjects, setAPIObjects] = useState<ObjectItem[]>();
  const [isLoading, setIsLoading] = useState(true);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  // const params: TFProps = {
  //   path: path,
  //   requestType: 'GET'
  // };
  //const fetcher = useFetch(params);

  useEffect(() => {
    switch (selectedCat) {
      case 'all':
        setPath('api/Lost-Objects');
        break;
      case 'all documents':
        setPath('api/Documents');
        break;
      case 'CNI':
        setPath('api/CNI');
        break;
      case 'Passports':
        setPath('api/Passports');
        break;
      case 'Birth Certificate':
        setPath('api/Birth-certificate');
        break;
      case 'Other Documents':
        setPath('api/Others-Documents');
        break;
      case 'Non documents':
        setPath('api/Others-Lost-Objects');
        break;
    }
    const Fetcher=  async () => {
      const res = await fetch(`http://127.0.0.1:8000/${path}`,{headers})
      const json = await res.json();
      setAPIObjects(json);
      setIsLoading(false);
    }
    Fetcher();
    // eslint-disable-next-line
  }, [selectedCat, path]);

  return (
    <div className='flex flex-col space-y-6'>
      <ul className='flex space-x-2'>
        {categories.map((categorie, index) => (
          <li
            key={index}
            className='bg-gray-200 text-gray-700 hover:bg-orange-200 capitalize rounded-full px-3 py-1 cursor-pointer text-sm'
            onClick={() => setSelectedCat(categorie)}>
            {categorie}
          </li>
        ))}
      </ul>
      <div className='grid grid-cols-2 sm:grid-cols-4 grid-rows-2 gap-10'>
        {APIObjects && !isLoading ? (
          APIObjects.map((object, index) => (
            <div
              key={index}
              className='bg-gray-200 shadow-md'>
              <PostItem object={object} />
            </div>
          ))
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <LoadingSVG className='text-primary animate-spin w-[40px] h-[40px] mx-auto' />
          </div>
        )}
      </div>
    </div>
  );
}

type ObjectItem = {
  img: string;
  date: string;
  title: string;
};
