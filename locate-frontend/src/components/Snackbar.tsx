import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import cn from 'classnames';

export default function Snackbar({
  categories,
  selectedCat,
  selectedCatHandler
}: TSnackbarProps) {
  return (
    <Listbox
      value={selectedCat}
      onChange={selectedCatHandler}
      name='object categories'>
      {({ open }) => (
        <>
          <Listbox.Label className='block text-sm sm:text-base font-medium text-gray-700'>
            Select Categorie
          </Listbox.Label>
          <div className='mt-1 relative'>
            <Listbox.Button className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm'>
              <span className='flex items-center'>
                <span className='ml-3 block truncate'>{selectedCat}</span>
              </span>
              <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
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
              <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                {categories.map((categorie, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      cn(
                        active ? 'text-gray-700 bg-gray-300' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={categorie} onClick={() => selectedCatHandler(categorie)}>
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          <span
                            className={cn(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}>
                            {categorie}
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
  categories: TSnackbarCategorie[];
  selectedCatHandler: (selected: TSnackbarCategorie) => void;
  selectedCat: TSnackbarCategorie;
};

export type TSnackbarCategorie =
  | 'all'
  | 'all documents'
  | 'CNI'
  | 'Passports'
  | 'Birth Certificate'
  | 'Other Documents'
  | 'Non documents';
