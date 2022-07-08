import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TServiceProps } from '~/services/types';
import { Input } from '~/components';
import { postObjHandler, FormTemplateViz, baseSchema } from '~/services';

export default function Passport({ service, toggleModal }: TServiceProps) {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      location: '',
      town_isssued: '',
      expiration_date: '',
      passport_number: '',
      passport_owner: ''
    },
    validationSchema: Yup.object({
      ...baseSchema,
      passport_number: Yup.string()
        .required('You must provide a passport number')
        .matches(/^\d{7}/, 'Passport number must be 7 digits'),
      passport_owner: Yup.string().required(
        'You must specify the owner of this CNI'
      ),
      expiration_date: Yup.string().matches(
        /^\d{4}-\d{2}-\d{2}$/,
        'Accepted format YYYY-MM-DD'
      )
    }),
    onSubmit: async (values) => {
      await postObjHandler({
        values: values,
        collectionCategorie: service,
        subCollection: 'Documents/passports/passportsCollection'
      });
      formik.resetForm();
      toggleModal();
    }
  });

  return (
    <FormTemplateViz
      isSubmitting={formik.isSubmitting}
      toggleModal={toggleModal}
      handleSubmit={formik.handleSubmit}
      resetForm={formik.resetForm}>
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
        <div className='grid grid-cols-3 space-x-4'>
          <div>
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='passport_number'
              type='text'
              value={formik.values.passport_number}
            />
            <div className='text-xs sm:text-sm text-red-600 tracking-wide'>
              {formik.touched.passport_number &&
              formik.errors.passport_number ? (
                <p>{formik.errors.passport_number}</p>
              ) : null}
            </div>
          </div>
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='town_isssued'
            type='text'
            value={formik.values.town_isssued}
          />
          <div>
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='expiration_date'
              type='text'
              value={formik.values.expiration_date}
            />
            <div className='text-xs sm:text-sm text-red-600 tracking-wide'>
              {formik.touched.expiration_date &&
              formik.errors.expiration_date ? (
                <p>{formik.errors.expiration_date}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className=''>
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passport_owner}
            name='passport_owner'
            type='text'
          />
          <div className='text-xs sm:text-sm text-red-600 tracking-wide'>
            {formik.touched.passport_owner && formik.errors.passport_owner ? (
              <p>{formik.errors.passport_owner}</p>
            ) : null}
          </div>
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
      </form>
    </FormTemplateViz>
  );
}
