import React from 'react';
import defaultPostImg from '../assets/hero-bg.jpg';
import Main from '../layout/main';
import LoadingSVG from '../assets/icons/LoadingSVG';
import { useGetDocumentData } from '~/lib/hooks/useGetDocumentData';
import { Button } from '~/components';
import { Link } from 'react-router-dom';

export default function PostDetails() {
  const { data, isLoading } = useGetDocumentData();

  if (isLoading) {
    return (
      <div className='flex min-h-[calc(100vh_-_theme(height.20))] w-full items-center justify-center'>
        <LoadingSVG className='mx-auto h-[40px] w-[40px] animate-spin text-primary' />
      </div>
    );
  }

  return (
    <Main>
      <div className='flex min-h-[calc(100vh_-_theme(height.20))] w-full items-center justify-center'>
        {data ? (
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
                      Expiration date: {data?.expiration ?? 'N/A'}
                    </p>
                  )}
                  {data.postID && (
                    <p className='text-xs sm:text-sm'>
                      Passport ID: {data?.postID ?? 'N/A'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center gap-4'>
            <p>No data to show!</p>
            <Link to='/'>
              <Button
                link={{
                  placeholder: 'Back to home',
                  primary: true,
                  classes: 'w-40 flex justify-center items-center',
                  text_first: true
                }}
              />
            </Link>
          </div>
        )}
      </div>
    </Main>
  );
}
