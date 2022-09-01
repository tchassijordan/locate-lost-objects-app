import React from 'react';
import Button from './Button';
import pic from '../assets/hero-bg.jpg';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';
import { TGetCollectionsProps } from '~/features/Viz/hooks/useGetDocumentsCollection';
import { Link } from 'react-router-dom';

export default function PostCard({ data }: TPostCardProps) {
  const { date, title, id, imgUrl, itemMetaData } = data;

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
            itemMetaData,
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

interface TPostCardProps {
  data: TPostCard;
}

type TPostCard = {
  imgUrl?: string;
  date?: string;
  title?: string;
  itemMetaData?: TGetCollectionsProps;
  id?: string;
};
