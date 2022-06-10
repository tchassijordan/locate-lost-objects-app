import React from 'react';
import { PostItem } from '../../../components/index';

export default function FeaturedLostObjects({ objects }: Props) {
  return (
    <div className='grid grid-cols-4 grid-rows-2 gap-10'>
      {objects.map((object, index) => (
        <div
          key={index}
          className='bg-gray-200 shadow-md'>
          <PostItem
            object={object}
          />
        </div>
      ))}
    </div>
  );
}

type Props = {
  objects: ObjectItem[];
};

type ObjectItem = {
  img: string;
  date: string;
  title: string;
};
