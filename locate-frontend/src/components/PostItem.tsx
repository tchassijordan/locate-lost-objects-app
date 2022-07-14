import React from 'react';
import Button from './Button';
import pic from '../assets/hero-bg.jpg';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';

export default function PostItem({ object }: Props) {
  const { date, title, id } = object;

  return (
    <>
      <div>
        <img
          src={pic}
          alt={title}
          className='w-full object-cover object-center'
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
            }
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
  img?: string;
  date?: string;
  title?: string;
  icon?: JSX.Element;
  to?: '';
  apiPath?: '';
  id?: number
};
