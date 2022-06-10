import React, { useState } from 'react';
import Main from '../../layout/main';
import FeaturedFoundObjects from './FeaturedObjSection/FeaturedFoundObjects';
import FeaturedLostObjects from './FeaturedObjSection/FeaturedLostObjects';
import { postData, LostPostData } from './data';
import { Button } from '../../components';
import { SearchIcon } from '@heroicons/react/outline';
import cn from 'classnames';

const searchBtnProps = {
  placeholder: 'Search',
  primary: true,
  classes:
    'max-w-[10em] flex justify-center items-center rounded-none rounded-r-xl',
  Icon: SearchIcon
};

export default function Home() {
  const [isFoundObj, setIsFoundObj] = useState(true);
  const featuredSectionHandler = () => setIsFoundObj(!isFoundObj);

  return (
    <div>
      <Main>
        <div className='min-h-screen bg-gray-50'>
          <div className='grid grid-cols-1 grid-rows-2'>
            <div className='row-span-full col-span-full bg-hero-pattern h-96 w-full bg-cover bg-center'></div>
            <div className='row-start-2 col-span-full -mb-48 w-full self-center'>
              <form>
                <div className='flex shadow-xl w-7/12 mx-auto rounded-xl'>
                  <input
                    type='text'
                    className='px-8 py-6 border-none w-full rounded-l-xl focus:ring-0'
                    placeholder='Search an Object'
                  />
                  <Button link={searchBtnProps} />
                </div>
              </form>
            </div>
          </div>
          <div>
            <div className='max-w-6xl mx-auto py-24 space-y-5'>
              <h1 className='text-2xl sm:text-3xl text-primary font-bold'>
                Featured Publications
              </h1>
              <div className='flex flex-col space-y-5 items-end'>
                <div className='flex space-x-4 right-0'>
                  <button
                    className={cn(
                      'w-fit text-xs sm:text-sm text-gray-700 hover:text-orange-500 hover:cursor-pointer transition-all duration-300',
                      { 'text-primary underline': isFoundObj }
                    )}
                    onClick={() => featuredSectionHandler()}>
                    Found Objects
                  </button>
                  <button
                    className={cn(
                      'w-fit text-xs sm:text-sm text-gray-700 hover:text-orange-500 hover:cursor-pointer transition-all duration-300',
                      { 'text-primary underline': !isFoundObj }
                    )}
                    onClick={() => featuredSectionHandler()}>
                    Lost Objects
                  </button>
                </div>
                {isFoundObj ? (
                  <FeaturedFoundObjects objects={postData} />
                ) : (
                  <FeaturedLostObjects objects={LostPostData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </Main>
    </div>
  );
}
