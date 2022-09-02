import React, { useState } from 'react';
import { useLocation } from 'react-router';
import defaultPostImg from '../assets/hero-bg.jpg';
import Main from '../layout/main';
import LoadingSVG from '../assets/icons/LoadingSVG';
import { getDocumentData } from '~/utils';
import { TGetCollectionsProps } from '~/features/Viz/hooks/useGetDocumentsCollection';
import { TObject } from '~/lib/types';

interface ILocation {
  pathname: string;
  state: {
    itemMetaData: TGetCollectionsProps;
    id: string;
  };
}

export default function PostDetails() {
  const location = useLocation() as ILocation;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TObject>();

  const fetcher = async () => {
    if (loading) {
      const url = `/${location.state.itemMetaData.serviceType}/Documents/${location.state.itemMetaData.documentType}/${location.state.itemMetaData.documentCollection}Collection/${location.state.id}`;
      const data = await getDocumentData({ url });
      if (typeof data === null) return;
      setData(data as TObject);
      setLoading(false);
    }
  };

  fetcher();

  return (
    <Main>
      <div className='flex min-h-[calc(100vh_-_theme(height.20))] w-full items-center justify-center'>
        {!loading && data ? (
          <div className='flex max-w-6xl space-x-10 py-16 px-4'>
            <div className='h-full basis-3/6 shadow-md'>
              <img
                className='h-full w-full rounded-md object-cover object-center'
                src={data.imgUrl ? data.imgUrl : defaultPostImg}
                alt='post thumbnail'
              />
            </div>
            <div className='flex max-h-96 basis-2/5 flex-col space-y-4 overflow-y-scroll'>
              <h1 className='text-xl sm:text-2xl'>{data.title}</h1>
              <div className='space-y-3'>
                <p className='text-xs tracking-wide text-gray-800 sm:text-sm'>
                  {data.description}
                </p>
                <div className='flex space-x-4 font-bold text-gray-500'>
                  <p className='text-xs sm:text-sm'>Date: {data.date}</p>
                  <p className='text-xs sm:text-sm'>
                    Location: {data.location}
                  </p>
                  {data.expiration && (
                    <p className='text-xs sm:text-sm'>
                      Expiration date: {data.expiration}
                    </p>
                  )}
                  {data.postID && (
                    <p className='text-xs sm:text-sm'>
                      Passport ID: {data.postID}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LoadingSVG className='mx-auto h-[40px] w-[40px] animate-spin text-primary' />
        )}
      </div>
    </Main>
  );
}
