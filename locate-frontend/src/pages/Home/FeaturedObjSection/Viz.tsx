import React, { useState, useEffect } from 'react';
import { PostItem, TSnackbarCategorie } from '../../../components/index';
import categories from '../../../lib/data';
import LoadingSVG from '../../../assets/icons/LoadingSVG';
import useFetch, { TFProps } from '../../../lib/hooks/useFetch';
import ApiSelector, { TApiProps } from '../../../utils/ApiSelector';
import cn from 'classnames';

export default function Viz({ requestMethod, family, isFoundObj }: TVizProps) {
  const defaultPath =
    family === 'lostObjects' ? 'api/Lost-Objects' : 'api/Found-Objects';
  
  const [selectedCat, setSelectedCat] = useState<TSnackbarCategorie>('all');
  const [path, setPath] = useState<string>(defaultPath);
  const [APIObjects, setAPIObjects] = useState<ObjectItem[]>();
  const [isLoading, setIsLoading] = useState(true);

  const params: TFProps = {
    path: path,
    requestType: requestMethod,
    foundObject: isFoundObj
  };

  const apiProps: TApiProps = {
    selectedCat: selectedCat,
    family: family
  };

  async function Fetcher() {
    const res = await useFetch(params);
    setAPIObjects(res);
    setIsLoading(false);
  }

  useEffect(() => {
    const renderedPath = ApiSelector(apiProps);
    renderedPath && setPath(renderedPath);
    Fetcher();
    // eslint-disable-next-line
  }, [selectedCat, path]);

  console.log(APIObjects);

  return (
    <div className='space-y-6'>
      <ul className='flex space-x-2 justify-start w-full'>
        {categories.map((categorie, index) => (
          <li
            key={index}
            className={cn(
              'capitalize rounded-full px-3 py-1 cursor-pointer text-sm',
              { 'bg-orange-600 text-gray-50': categorie === selectedCat },
              {
                'bg-gray-200 text-gray-700 hover:bg-orange-200':
                  categorie !== selectedCat
              }
            )}
            onClick={() => {
              setIsLoading(true);
              setSelectedCat(categorie);
            }}>
            {categorie}
          </li>
        ))}
      </ul>
      <div className='grid grid-cols-4 grid-rows-2 gap-10'>
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
  id: number;
};

export type TVizProps = {
  requestMethod: 'GET' | 'POST' | 'PUT' | 'DELETE';
  family: 'lostObjects' | 'foundObjects';
  isFoundObj?: boolean;
};
