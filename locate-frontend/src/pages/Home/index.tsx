import React, { useState } from 'react';
import Main from '~/layout/main';
import { FoundObjViz } from '~/features/FoundObj';
import { LostObjViz } from '~/features/LostObj';
import { Button } from '~/components';
import { SearchIcon } from '@heroicons/react/outline';
import cn from 'classnames';
import { PostServiceViz } from '~/services';

export default function Home() {
  const [isFoundObj, setIsFoundObj] = useState(true);
  const featuredSectionHandler = () => setIsFoundObj(!isFoundObj);
  const [showModal, toggleShowModal] = useState(false);

  return (
    <Main>
      <div className='min-h-screen bg-gray-50'>
        <div className='grid grid-cols-1 grid-rows-2'>
          <div className='row-span-full col-span-full grid grid-cols-1 grid-rows-1 h-96 w-full relative items-center justify-center'>
            <div className='row-span-full col-span-full bg-hero-pattern bg-cover bg-center w-full h-full brightness-50'></div>
            <div className='row-span-full col-span-full z-10'>
              <div className='flex flex-col justify-center items-center space-y-3'>
                <div className='space-y-1'>
                  <h1 className='text-4xl text-gray-50 font-bold'>
                    Have you lost an Object or Artifact?
                  </h1>
                  <p className='text-2xl text-gray-200 block text-center m-0'>
                    Publish the object right now
                  </p>
                </div>
                <Button
                  link={{
                    placeholder: 'Register Object',
                    primary: true,
                    classes: 'w-fit',
                    action: () => toggleShowModal(!showModal)
                  }}
                />
              </div>
            </div>
          </div>
          <div className='row-start-2 col-span-full -mb-48 w-full self-center'>
            <form>
              <div className='flex shadow-xl w-7/12 mx-auto rounded-xl brightness-100'>
                <input
                  type='text'
                  className='px-8 py-6 border-none w-full rounded-l-xl focus:ring-0'
                  placeholder='Search an Object'
                />
                <Button
                  link={{
                    placeholder: 'Search',
                    primary: true,
                    classes:
                      'max-w-[10em] flex justify-center items-center rounded-none rounded-r-xl',
                    Icon: SearchIcon
                  }}
                />
              </div>
            </form>
          </div>
        </div>
        <div className='px-6 lg:px-0'>
          <div className='max-w-6xl mx-auto py-24 space-y-5'>
            <h1 className='text-2xl sm:text-3xl text-primary font-bold'>
              Featured Publications
            </h1>
            <div className='flex flex-col space-y-5 items-end'>
              <div className='flex space-x-4 right-0'>
                <button
                  className={cn(
                    'w-fit text-sm sm:text-base text-gray-700 hover:text-orange-500 hover:cursor-pointer transition-all duration-300',
                    { 'text-primary underline': isFoundObj }
                  )}
                  onClick={() => featuredSectionHandler()}>
                  Found Objects
                </button>
                <button
                  className={cn(
                    'w-fit text-sm sm:text-base text-gray-700 hover:text-orange-500 hover:cursor-pointer transition-all duration-300',
                    { 'text-primary underline': !isFoundObj }
                  )}
                  onClick={() => featuredSectionHandler()}>
                  Lost Objects
                </button>
              </div>
              <div className='w-full'>
                {isFoundObj ? <FoundObjViz /> : <LostObjViz />}
              </div>
            </div>
            <PostServiceViz
              showModal={showModal}
              setShowModal={() => toggleShowModal(!showModal)}
            />
          </div>
        </div>
      </div>
    </Main>
  );
}
