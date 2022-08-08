import React, { useState, Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import cn from 'classnames';
import categories from '~/lib/data';
import { Snackbar, TSnackbarCategorie } from '~/components';
import { Passport, BirthCertificate, CNI } from '.';
import { TServices } from './types';

export default function Viz({ showModal, setShowModal }: TProps) {
  const [selected, setSelected] =
    useState<TSnackbarCategorie>('Birth Certificates');
  const [serviceCategorie, setSeriveCategorie] =
    useState<TServices>('lostObjects');

  const serviceCategorieArray: TPublishCategories[] = [
    'lostObjects',
    'foundObjects'
  ];

  return (
    <Transition
      show={showModal}
      unmount
      appear
      as={Fragment}>
      <Dialog
        open={showModal}
        onClose={setShowModal}
        className='fixed w-screen h-screen grid items-center justify-center inset-0 z-20'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black bg-opacity-70' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className='w-full max-w-3xl space-y-6 transform overflow-hidden rounded-md bg-gray-100 p-8  text-left align-middle shadow-xl transition-all'>
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
                          'bg-orange-600 text-gray-50':
                            categorie === serviceCategorie
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
                  {selected === 'Birth Certificates' && (
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
                  {/* selected === 'Other Documents' && <OtherDocs />}
              { selected === 'Non documents' && <Others /> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

type TProps = {
  showModal: true | false;
  setShowModal: () => void;
};

type TPublishCategories = 'lostObjects' | 'foundObjects';
