import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TServiceProps } from '~/services/types';
import { Input } from '~/components';
import { postObjHandler, FormTemplateViz, baseSchema } from '~/services';

export default function BirthCertificateViz({
  service,
  toggleModal
}: TServiceProps) {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      location: '',
      town_hall: ''
    },
    validationSchema: Yup.object({
      ...baseSchema,
      town_hall: Yup.string().required(
        'Please enter the town where it was made'
      )
    }),
    onSubmit: async (values) => {
      await postObjHandler({
        values: values,
        collectionCategorie: service,
        subCollection: 'Documents/birthCertificates/birthCertificatesCollection'
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
        <div>
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='town_hall'
            type='text'
            value={formik.values.town_hall}
          />
          <div className='text-xs sm:text-sm text-red-600 tracking-wide'>
            {formik.touched.town_hall && formik.errors.town_hall ? (
              <p>{formik.errors.town_hall}</p>
            ) : null}
          </div>
        </div>
      </form>
    </FormTemplateViz>
  );
}
