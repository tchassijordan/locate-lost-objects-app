import React from 'react';
import Button from './Button';
import pic from '../assets/hero-bg.jpg';
import { TBtnLink } from './Button';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';

export default function PostItem({ object }: Props) {
  const { date, title } = object;
  
  const btnProps: TBtnLink = {
    placeholder: 'Explore',
    primary: true,
    Icon: ArrowNarrowRightIcon,
    classes: 'w-32 flex justify-center items-center',
    text_first: true,
    to: 'post_object',
  };

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
        <Button link={btnProps} />
      </div>
    </>
  );
}

interface Props {
  object: TPostItem;
}

type TPostItem = {
  img?: string;
  date: string;
  title: string;
  icon?: JSX.Element;
  to?: '';
};
