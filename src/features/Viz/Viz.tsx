import React, { useState } from 'react';
import cn from 'classnames';
import { PostCard, TDocumentTypes } from '~/components';
import documentTypes from '~/lib/data';
import LoadingSVG from '~/assets/icons/LoadingSVG';
import { textConverter } from '~/utils';
import { TServiceType, useGetDocumentsCollection } from '.';

export default function Viz({ serviceType }: TServiceType) {
  const [activeDocumentType, setActiveDocumentType] =
    useState<TDocumentTypes>('Birth Certificates');

  const { documentType, documentCollection } =
    textConverter(activeDocumentType);

  const result = useGetDocumentsCollection({
    serviceType: serviceType,
    documentCollection,
    documentType
  });

  const data = result?.data || [];
  const isLoading = result?.isLoading || false;

  return (
    <div className='space-y-6'>
      <ul className='flex w-full justify-start space-x-2'>
        {documentTypes.map((type, index) => (
          <li
            key={index}
            className={cn(
              'cursor-pointer rounded-full px-3 py-1 text-sm capitalize',
              {
                'bg-orange-600 text-gray-50': type === activeDocumentType
              },
              {
                'bg-gray-200 text-gray-700 hover:bg-orange-200':
                  type !== activeDocumentType
              }
            )}
            onClick={() => {
              setActiveDocumentType(type);
            }}>
            {type}
          </li>
        ))}
      </ul>
      <div>
        {data.length != 0 && !isLoading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-7 lg:grid-cols-4 lg:gap-10'>
            {data.map((item, index) => (
              <div
                key={index}
                className='bg-gray-200 shadow-md'>
                <PostCard
                  data={Object.assign({}, item, {
                    itemMetaData: {
                      serviceType: serviceType,
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
