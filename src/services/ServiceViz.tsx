import React, { useState, Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import cn from 'classnames';
import documentTypes from '~/lib/data';
import { Snackbar, TDocumentTypes } from '~/components';
import { Passport, BirthCertificate, IdCard } from '.';
import { TServices } from './types';

export default function ServiceViz({ showModal, setShowModal }: TProps) {
  const [activeDocumentType, setActiveDocumentType] =
    useState<TDocumentTypes>('Birth Certificates');
  const [activeServiceType, setServiceType] =
    useState<TServices>('lostObjects');

  const serviceTypes: TPublishCategories[] = ['lostObjects', 'foundObjects'];

  return (
    <Transition
      show={showModal}
      unmount
      appear
      as={Fragment}>
      <Dialog
        open={showModal}
        onClose={setShowModal}
        className='fixed inset-0 z-20 grid h-screen w-screen items-center justify-center'>
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
              <Dialog.Panel className='w-full max-w-3xl transform space-y-6 overflow-hidden rounded-md bg-gray-100 p-8  text-left align-middle shadow-xl transition-all'>
                <Snackbar
                  documentTypes={documentTypes}
                  activeDocumentType={activeDocumentType}
                  onTypeChange={(prop) => setActiveDocumentType(prop)}
                />
                <ul className='flex w-full justify-start space-x-2'>
                  {serviceTypes.map((service, index) => (
                    <li
                      key={index}
                      className={cn(
                        'cursor-pointer rounded-full px-3 py-1 text-sm capitalize',
                        {
                          'bg-orange-600 text-gray-50':
                            service === activeServiceType
                        },
                        {
                          'bg-gray-200 text-gray-700 hover:bg-orange-200':
                            service !== activeServiceType
                        }
                      )}
                      onClick={() => {
                        setServiceType(service);
                      }}>
                      {service}
                    </li>
                  ))}
                </ul>
                <div>
                  <BirthCertificate
                    serviceType={activeServiceType}
                    onModalToggle={setShowModal}
                    isMounted={activeDocumentType === 'Birth Certificates'}
                  />
                  <Passport
                    serviceType={activeServiceType}
                    onModalToggle={setShowModal}
                    isMounted={activeDocumentType === 'Passports'}
                  />
                  <IdCard
                    serviceType={activeServiceType}
                    onModalToggle={setShowModal}
                    isMounted={activeDocumentType === 'CNI'}
                  />
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
