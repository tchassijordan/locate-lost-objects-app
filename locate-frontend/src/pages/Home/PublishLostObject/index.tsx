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
  Passports,
  TBtnLink
} from '../../../components';

export default function PublishLostObject({
  isActive,
  switchIsActive
}: TProps) {
  const [selected, setSelected] = useState<TSnackbarCategorie>('all');
  const [path, setPath] = useState('api/Lost-Objects');

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
    onSubmit: async (values) => postData(values)
  });

  const postData = async (values: any) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const request = new Request(`http://127.0.0.1:8000/${path}`, {
      method: 'POST',
      body: JSON.stringify(values)
    });
    try {
      const response = await fetch(request, { headers });
      if (response.status === 200) {
        formik.resetForm();
        switchIsActive();
      }
    } catch (error) {
      console.error('Error returned: ', error);
    }
  };

  useEffect(() => {
    //change path state to match activated selected
    if (selected === 'all') setPath('api/Lost-Objects');
    else if (selected === 'all documents') setPath('api/Documents');
    else if (selected === 'CNI') setPath('api/CNI');
    else if (selected === 'Passports') setPath('api/Passports');
    else if (selected === 'Birth Certificate') setPath('api/Birth-certificate');
    else if (selected === 'Other Documents') setPath('api/Others-Documents');
    else if (selected === 'Non documents') setPath('api/Others-Lost-Objects');
    else return;
  }, [selected]);

  const submitBtnProps: TBtnLink = {
    placeholder: 'Publish',
    primary: true,
    classes: 'w-fit',
    action: formik.handleSubmit,
    type: 'submit'
  };

  const cancelBtnProps = {
    placeholder: 'Cancel',
    secondary: true,
    classes: 'text-primary w-fit',
    action: () => {
      formik.resetForm();
      switchIsActive();
    }
  };

  return (
    <div
      className={cn(
        {
          'fixed w-screen h-screen flex items-center justify-center overflow-scroll top-0 left-0 bg-gray-300 z-20 ':
            isActive
        },
        { hidden: !isActive }
      )}>
      {isActive ? (
        <div className='bg-gray-100 py-8 px-10 space-y-6 rounded-md shadow-xl'>
          <Snackbar
            categories={categories}
            selectedCat={selected}
            selectedCatHandler={(prop) => setSelected(prop)}
          />
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
                <Button link={cancelBtnProps} />
              </div>
              <div className='w-fit py-3 bg-gray-100 text-right '>
                <Button link={submitBtnProps} />
              </div>
              {formik.isSubmitting ? (
                <LoadingSVG className='text-primary animate-spin w-[40px] h-[40px]' />
              ) : null}
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}

type TProps = {
  isActive: true | false;
  switchIsActive: () => void;
};
