import React from 'react';
import Button from './Button';
import pic from '../assets/hero-bg.jpg';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';

export default function PostItem({ object }: Props) {
  const { date, title, id, imgUrl } = object;

  return (
    <>
      <div className='h-36'>
        <img
          src={imgUrl?.length == 0 ? pic : imgUrl}
          alt='post image thumbnail'
          className='w-full h-full object-cover object-center'
        />
      </div>
      <div className='p-6 space-y-3'>
        <div className='space-y-1 m-0'>
          <h2 className='text-gray-900'>{title}</h2>
          <p className='text-xs sm:text-sm text-gray-600'>{date}</p>
        </div>
        {/* dynamic routing isn't functioning */}
        <Button
          link={{
            placeholder: 'Explore',
            primary: true,
            Icon: ArrowNarrowRightIcon,
            classes: 'w-32 flex justify-center items-center',
            text_first: true,
            to: {
              pathname: `post_object/${id}`,
              state: { object }
            },
            disabled: true
          }}
        />
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
  apiPath?: '';
  id?: number;
  children?: React.ReactNode;
};
