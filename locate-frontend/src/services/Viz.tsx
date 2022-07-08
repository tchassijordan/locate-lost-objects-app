import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import cn from 'classnames';
import categories from '~/lib/data';
import { Snackbar, TSnackbarCategorie } from '~/components';
import { Passport, BirthCertificate, CNI, Others, OtherDocs } from '.';
import { TServices } from './types';

export default function Viz({ showModal, setShowModal }: TProps) {
  const [selected, setSelected] =
    useState<TSnackbarCategorie>('Birth Certificate');
  const [serviceCategorie, setSeriveCategorie] =
    useState<TServices>('lostObjects');

  const serviceCategorieArray: TPublishCategories[] = [
    'lostObjects',
    'foundObjects'
  ];

  return (
    <Transition
      show={showModal}
      enter='transition-opacity duration-500'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-300'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      unmount={true}
      className='fixed w-screen h-screen grid items-center justify-center overflow-scroll -top-5 left-0 bg-gray-900 z-20 m-0'>
      <div className='bg-gray-100 py-8 px-10 space-y-6 rounded-md shadow-xl'>
        <Snackbar
          categories={categories}
          selectedCat={selected}
          selectedCatHandler={(prop) => setSelected(prop)}
        />
        <ul className='flex space-x-2 justify-start w-full'>
          {serviceCategorieArray.map((categorie, index) => (
            <li
              key={index}
              className={cn(
                'capitalize rounded-full px-3 py-1 cursor-pointer text-sm',
                {
                  'bg-orange-600 text-gray-50': categorie === serviceCategorie
                },
                {
                  'bg-gray-200 text-gray-700 hover:bg-orange-200':
                    categorie !== serviceCategorie
                }
              )}
              onClick={() => {
                setSeriveCategorie(categorie);
              }}>
              {categorie}
            </li>
          ))}
        </ul>
        <div>
          {selected === 'Birth Certificate' && (
            <BirthCertificate
              service={serviceCategorie}
              toggleModal={setShowModal}
            />
          )}
          {selected === 'Passports' && (
            <Passport
              service={serviceCategorie}
              toggleModal={setShowModal}
            />
          )}
          {selected === 'CNI' && (
            <CNI
              service={serviceCategorie}
              toggleModal={setShowModal}
            />
          )}
          {selected === 'Other Documents' && <OtherDocs />}
          {selected === 'Non documents' && <Others />}
        </div>
      </div>
    </Transition>
  );
}

type TProps = {
  showModal: true | false;
  setShowModal: () => void;
};

type TPublishCategories = 'lostObjects' | 'foundObjects';
