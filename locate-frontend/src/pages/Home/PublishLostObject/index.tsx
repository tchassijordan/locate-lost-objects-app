import React, { useEffect, useState } from 'react';
import {
  Snackbar,
  TSnackbarCategorie,
  Input,
  Button
} from '../../../components';
import categories from '../../../lib/data';
import Modal from '../../../Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  //CNI,
  BirthCertificate,
  //DiffObjects,
  //OtherDocuments,
  Passports
  //Documents
} from './Categories';

export default function PublishLostObject({ isActive, switchIsActive }: TProps) {
  const [selected, setSelected] = useState<TSnackbarCategorie>('all');
  const [path, setPath] = useState('api/Lost-Objects');

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      location: '',
      image: '',
      town_hall: '',
      city: '',
      ville_deliverance: '',
      expiration: '',
      postID: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Please enter your first name'),
      description: Yup.string().required('Please enter your last name'),
      location: Yup.string().required('Please enter your address'),
      region: Yup.string().required('Please enter your region')
    }),
    onSubmit: async () => {
      postData();
    }
  });

  const postData = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await fetch(`http://127.0.0.1:8000/${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(formik.values)
    });
    return response.json();
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

  const submitBtnProps = {
    placeholder: 'Publish',
    primary: true,
    classes: 'w-fit'
  };

  const cancelBtnProps = {
    placeholder: 'Cancel',
    secondary: true,
    classes: 'text-primary w-fit',
    action: switchIsActive,
  };

  return (
    <div>
      {isActive ? (
        <Modal>
          <div className='fixed z-20 top-[10%] w-3/5 bg-gray-100 py-8 px-10 space-y-6 rounded-md shadow-xl'>
            <Snackbar
              categories={categories}
              selectedCat={selected}
              selectedCatHandler={(prop) => setSelected(prop)}
            />
            <form
              action='#'
              method='POST'
              onSubmit={formik.handleSubmit}
              className='space-y-4'>
              <div className='grid grid-cols-3 space-x-4'>
                <Input
                  onChange={() => formik.handleChange}
                  onBlur={() => formik.handleBlur}
                  value={formik.values.title}
                  name='title'
                  type='text'
                />
                <Input
                  onChange={() => formik.handleChange}
                  onBlur={() => formik.handleBlur}
                  value={formik.values.date}
                  name='date'
                  type='text'
                />
                <Input
                  onChange={() => formik.handleChange}
                  onBlur={() => formik.handleBlur}
                  value={formik.values.location}
                  name='location'
                  type='text'
                />
              </div>
              <Input
                onChange={() => formik.handleChange}
                onBlur={() => formik.handleBlur}
                value={formik.values.description}
                name='description'
                type='text'
              />
              {selected === 'Birth Certificate' && (
                <BirthCertificate
                  onChange={() => formik.handleChange}
                  onBlur={() => formik.handleBlur}
                  town_hall={formik.values.town_hall}
                />
              )}
              {selected === 'Passports' && (
                <Passports
                  onChange={() => formik.handleChange}
                  onBlur={() => formik.handleBlur}
                  expiration={formik.values.expiration}
                  ville_deliverance={formik.values.ville_deliverance}
                  postID={formik.values.postID}
                />
              )}
              <div className='space-x-8 flex'>
                <div className='w-fit py-3 bg-gray-100 text-right '>
                  <Button link={cancelBtnProps} />
                </div> 
                <div className='w-fit py-3 bg-gray-100 text-right ' onClick={() => switchIsActive()}>
                  <Button link={submitBtnProps} />
                </div>
              </div>
            </form>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

type TProps = {
  isActive: true | false;
  switchIsActive: () => void;
};
