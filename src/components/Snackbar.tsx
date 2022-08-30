import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import cn from 'classnames';

export default function Snackbar({
  documentTypes,
  activeDocumentType,
  onTypeChange
}: TSnackbarProps) {
  return (
    <Listbox
      value={activeDocumentType}
      onChange={onTypeChange}
      name='object categories'>
      {({ open }) => (
        <>
          <Listbox.Label className='block text-sm font-medium text-gray-700 sm:text-base'>
            Publish an Object
          </Listbox.Label>
          <div className='relative mt-1'>
            <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 sm:text-sm'>
              <span className='flex items-center'>
                <span className='ml-3 block truncate'>
                  {activeDocumentType}
                </span>
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                <SelectorIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {documentTypes.map((documentType, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      cn(
                        active ? 'bg-gray-300 text-gray-700' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={documentType}
                    onClick={() => onTypeChange(documentType)}>
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <span
                            className={cn(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}>
                            {documentType}
                          </span>
                        </div>

                        {selected && (
                          <span
                            className={cn(
                              active ? 'text-white' : 'text-primary',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}>
                            <CheckIcon
                              className='h-5 w-5'
                              aria-hidden='true'
                            />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export type TSnackbarProps = {
  documentTypes: TDocumentTypes[];
  onTypeChange: (type: TDocumentTypes) => void;
  activeDocumentType: TDocumentTypes;
};

export type TDocumentTypes =
  | 'CNI'
  | 'Passports'
  | 'Birth Certificates'
  | 'Other Docs';
