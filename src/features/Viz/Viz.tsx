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

  const { documentType, documentCollection } = textConverter(selectedCategorie);

  async function Fetcher() {
    const result = await getData({
      serviceFamily: family,
      documentCollection,
      documentType
    });
    setIsLoading(false);
    result && setData(result);
  }

  useEffect(() => {
    Fetcher();
  }, [selectedCategorie]);

  return (
    <div className='space-y-6'>
      <ul className='flex w-full justify-start space-x-2'>
        {categories.map((categorie, index) => (
          <li
            key={index}
            className={cn(
              'cursor-pointer rounded-full px-3 py-1 text-sm capitalize',
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
                <PostItem
                  object={Object.assign({}, object, {
                    apiPath: {
                      serviceFamily: family,
                      documentType,
                      documentCollection
                    }
                  })}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <LoadingSVG className='mx-auto h-[40px] w-[40px] animate-spin text-primary' />
          </div>
        )}
      </div>
    </div>
  );
}
