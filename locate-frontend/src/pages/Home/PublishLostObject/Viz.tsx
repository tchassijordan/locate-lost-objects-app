/* 
  ====================================================================================
  Data isn't being sent because sendPostObjData hook isn't functioning correctly
  ====================================================================================
*/

import React, { useEffect, useState } from 'react';
import categories from '../../../lib/data';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingSVG from '../../../assets/icons/LoadingSVG';
import cn from 'classnames';
import {
  Snackbar,
  TSnackbarCategorie,
  Input,
  Button,
  BirthCertificate,
  Passports
} from '../../../components';
import ApiSelector from '../../../utils/ApiSelector';
import { sendPostObjData } from '.';
import { Transition } from '@headlessui/react';

export default function Viz({ isActive, switchIsActive }: TProps) {
  const [selected, setSelected] = useState<TSnackbarCategorie>('all');
  const [path, setPath] = useState('api/Lost-Objects');
  const [publishingCategorie, setPublishingCategorie] = useState<
    'lostObjects' | 'foundObjects'
  >('lostObjects');

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      location: '',
      town_hall: '',
      city: '',
      ville_deliverance: '',
      expiration: '',
      postID: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Please enter a title for this object'),
      description: Yup.string().required(
        'Please enter a vivid description of this object'
      ),
      date: Yup.string()
        .required('Accepted format YYYY-MM-DD')
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Accepted format YYYY-MM-DD')
    }),
    onSubmit: async (values) => {
      sendPostObjData({
        values: values,
        path: path
      }).then((status) => status === 200 && rester);
    }
  });

  const rester = () => {
    formik.resetForm();
    switchIsActive();
  };

  useEffect(() => {
    //change path state to match activated selected
    const renderedPath = ApiSelector({
      selectedCat: selected,
      family: publishingCategorie
    });
    if (renderedPath !== undefined) {
      setPath(renderedPath);
    }
  }, [selected, publishingCategorie]);

  const publishObjCategories: TPublishCategories[] = [
    'lostObjects',
    'foundObjects'
  ];

  return (
    <Transition
      show={isActive}
      enter='transition-opacity duration-500'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-300'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      unmount={true}
      className='fixed w-screen h-screen flex items-center justify-center overflow-scroll -top-5 left-0 bg-gray-300 z-20 m-0'>
      <div className='bg-gray-100 py-8 px-10 space-y-6 rounded-md shadow-xl'>
        <Snackbar
          categories={categories}
          selectedCat={selected}
          selectedCatHandler={(prop) => setSelected(prop)}
        />
        <ul className='flex space-x-2 justify-start w-full'>
          {publishObjCategories.map((categorie, index) => (
            <li
              key={index}
              className={cn(
                'capitalize rounded-full px-3 py-1 cursor-pointer text-sm',
                {
                  'bg-orange-600 text-gray-50':
                    categorie === publishingCategorie
                },
                {
                  'bg-gray-200 text-gray-700 hover:bg-orange-200':
                    categorie !== publishingCategorie
                }
              )}
              onClick={() => {
                setPublishingCategorie(categorie);
              }}>
              {categorie}
            </li>
          ))}
        </ul>
        <form
          onSubmit={formik.handleSubmit}
          className='space-y-4'>
          <div className='grid grid-cols-3 space-x-4'>
            <div>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                name='title'
                type='text'
              />
              <div className='text-xs sm:text-sm text-red-600 tracking-wide'>
                {formik.touched.title && formik.errors.title ? (
                  <p>{formik.errors.title}</p>
                ) : null}
              </div>
            </div>
            <div className=''>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
                name='date'
                type='text'
              />
              <div className='text-xs sm:text-sm text-red-600 tracking-wide'>
                {formik.touched.date && formik.errors.date ? (
                  <p>{formik.errors.date}</p>
                ) : null}
              </div>
            </div>
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              name='location'
              type='text'
            />
          </div>
          <div>
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              name='description'
              type='text'
            />
            <div className='text-xs sm:text-sm text-red-600 tracking-wide'>
              {formik.touched.description && formik.errors.description ? (
                <p>{formik.errors.description}</p>
              ) : null}
            </div>
          </div>
          {selected === 'Birth Certificate' && (
            <BirthCertificate
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              town_hall={formik.values.town_hall}
            />
          )}
          {selected === 'Passports' && (
            <Passports
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              expiration={formik.values.expiration}
              ville_deliverance={formik.values.ville_deliverance}
              postID={formik.values.postID}
            />
          )}
          <div className='space-x-8 flex items-center'>
            <div className='w-fit py-3 bg-gray-100 text-right '>
              <Button
                link={{
                  placeholder: 'Cancel',
                  secondary: true,
                  classes: 'text-primary w-fit',
                  action: () => {
                    formik.resetForm();
                    switchIsActive();
                  }
                }}
              />
            </div>
            <div className='w-fit py-3 bg-gray-100 text-right '>
              <Button
                link={{
                  placeholder: 'Publish',
                  primary: true,
                  classes: 'w-fit',
                  action: formik.handleSubmit,
                  type: 'submit'
                }}
              />
            </div>
            {formik.isSubmitting ? (
              <LoadingSVG className='text-primary animate-spin w-[40px] h-[40px]' />
            ) : null}
          </div>
        </form>
      </div>
    </Transition>
  );
}

type TProps = {
  isActive: true | false;
  switchIsActive: () => void;
};

type TPublishCategories = 'lostObjects' | 'foundObjects';
