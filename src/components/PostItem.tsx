import React from 'react';
import Button from './Button';
import pic from '../assets/hero-bg.jpg';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import { TProps } from '~/features/Viz/hooks/useGetDocumentsCollection';
import { Link } from 'react-router-dom';

export default function PostItem({ object }: Props) {
  const { date, title, id, imgUrl, apiPath } = object;

  return (
    <>
      <div className='h-36'>
        <img
          src={imgUrl?.length == 0 ? pic : imgUrl}
          alt='post image thumbnail'
          className='h-full w-full object-cover object-center'
        />
      </div>
      <div className='space-y-3 p-6'>
        <div className='m-0 space-y-1'>
          <h2 className='text-gray-900'>{title}</h2>
          <p className='text-xs text-gray-600 sm:text-sm'>{date}</p>
        </div>
        <Link
          to={`post_object/${id}`}
          state={{
            apiPath,
            id: id
          }}>
          <Button
            link={{
              placeholder: 'Explore',
              primary: true,
              Icon: ArrowNarrowRightIcon,
              classes: 'w-32 flex justify-center items-center',
              text_first: true
            }}
          />
        </Link>
      </div>
    </>
  );
}

interface Props {
  object: TPostItem;
  id?: number;
}

type TPostItem = {
  imgUrl?: string;
  date?: string;
  title?: string;
  icon?: JSX.Element;
  to?: '';
  apiPath?: TProps;
  id?: string;
  children?: React.ReactNode;
};
