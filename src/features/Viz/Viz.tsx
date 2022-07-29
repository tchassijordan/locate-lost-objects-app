import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { PostItem, TSnackbarCategorie } from '~/components';
import categories from '~/lib/data';
import LoadingSVG from '~/assets/icons/LoadingSVG';
//use the text converter to transform the selected snack bar option into api format type collection name and optimize code base
import { textConverter } from '~/utils';
import { TFamily, getData } from '.';

export default function Viz({ family }: TFamily) {
  const [selectedCategorie, setSelectedCategorie] =
    useState<TSnackbarCategorie>('Birth Certificates');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{ [k: string]: string }[]>([]);

  async function Fetcher() {
    let bucket = undefined;
    if (selectedCategorie === 'CNI') bucket = selectedCategorie;
    const result = await getData({
      serviceFamily: family,
      subCollection: textConverter(selectedCategorie),
      bucket: bucket
    });
    setIsLoading(false);
    result && setData(result);
  }

  useEffect(() => {
    Fetcher();
  }, [selectedCategorie]);

  return (
    <div className='space-y-6'>
      <ul className='flex space-x-2 justify-start w-full'>
        {categories.map((categorie, index) => (
          <li
            key={index}
            className={cn(
              'capitalize rounded-full px-3 py-1 cursor-pointer text-sm',
              { 'bg-orange-600 text-gray-50': categorie === selectedCategorie },
              {
                'bg-gray-200 text-gray-700 hover:bg-orange-200':
                  categorie !== selectedCategorie
              }
            )}
            onClick={() => {
              setIsLoading(true);
              setSelectedCategorie(categorie);
            }}>
            {categorie}
          </li>
        ))}
      </ul>
      <div>
        {data.length != 0 && !isLoading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-7 lg:grid-cols-4 lg:gap-10'>
            {data.map((object, index) => (
              <div
                key={index}
                className='bg-gray-200 shadow-md'>
                <PostItem object={object} />
              </div>
            ))}
          </div>
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <LoadingSVG className='text-primary animate-spin w-[40px] h-[40px] mx-auto' />
          </div>
        )}
      </div>
    </div>
  );
}
