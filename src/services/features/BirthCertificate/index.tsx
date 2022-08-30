import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TServiceProps } from '~/services/types';
import { InputField } from '~/components';
import { postObjHandler, FormTemplateViz, baseSchema } from '~/services';

export default function BirthCertificateViz({
  service,
  onModalToggle
}: TServiceProps) {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      location: '',
      town_hall: '',
      imgUrl: ''
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
      onModalToggle();
    }
  });

  const imageStateHandler = (url: string) => {
    formik.setFieldValue('imgUrl', url);
  };

  return (
    <FormTemplateViz
      isSubmitting={formik.isSubmitting}
      toggleModal={onModalToggle}
      handleSubmit={formik.handleSubmit}
      resetForm={formik.resetForm}
      service={service}
      imageStateHandler={imageStateHandler}>
      <form
        onSubmit={formik.handleSubmit}
        className='space-y-4'>
        <div className='grid grid-cols-3 space-x-4'>
          <div>
            <InputField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              name='title'
              type='text'
            />
            <div className='text-xs tracking-wide text-red-600 sm:text-sm'>
              {formik.touched.title && formik.errors.title ? (
                <p>{formik.errors.title}</p>
              ) : null}
            </div>
          </div>
          <div className=''>
            <InputField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
              name='date'
              type='text'
            />
            <div className='text-xs tracking-wide text-red-600 sm:text-sm'>
              {formik.touched.date && formik.errors.date ? (
                <p>{formik.errors.date}</p>
              ) : null}
            </div>
          </div>
          <InputField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
            name='location'
            type='text'
          />
        </div>
        <div>
          <InputField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            name='description'
            type='text'
          />
          <div className='text-xs tracking-wide text-red-600 sm:text-sm'>
            {formik.touched.description && formik.errors.description ? (
              <p>{formik.errors.description}</p>
            ) : null}
          </div>
        </div>
        <div>
          <InputField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name='town_hall'
            type='text'
            value={formik.values.town_hall}
          />
          <div className='text-xs tracking-wide text-red-600 sm:text-sm'>
            {formik.touched.town_hall && formik.errors.town_hall ? (
              <p>{formik.errors.town_hall}</p>
            ) : null}
          </div>
        </div>
      </form>
    </FormTemplateViz>
  );
}
