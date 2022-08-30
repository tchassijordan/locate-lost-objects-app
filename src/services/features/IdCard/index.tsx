import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TServiceProps } from '~/services/types';
import { InputField } from '~/components';
import { postObjHandler, FormTemplateViz, baseSchema } from '~/services';

export default function IdCard({ service, onModalToggle }: TServiceProps) {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      location: '',
      numero_CNI: '',
      owner: '',
      imgUrl: ''
    },
    validationSchema: Yup.object({
      ...baseSchema,
      numero_CNI: Yup.string()
        .required('You must provide a valid CNI number')
        .matches(/^\d{9}/, 'CNI number must be 9 digits'),
      owner: Yup.string().required('You must specify the owner of this CNI')
    }),
    onSubmit: async (values) => {
      await postObjHandler({
        values: values,
        collectionCategorie: service,
        subCollection: 'Documents/CNI/cniCollection'
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
        <div className=''>
          <InputField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.owner}
            name='owner'
            type='text'
          />
          <div className='text-xs tracking-wide text-red-600 sm:text-sm'>
            {formik.touched.owner && formik.errors.owner ? (
              <p>{formik.errors.owner}</p>
            ) : null}
          </div>
        </div>
        <div>
          <InputField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.numero_CNI}
            name='numero_CNI'
            type='text'
          />
          <div className='text-xs tracking-wide text-red-600 sm:text-sm'>
            {formik.touched.numero_CNI && formik.errors.numero_CNI ? (
              <p>{formik.errors.numero_CNI}</p>
            ) : null}
          </div>
        </div>
      </form>
    </FormTemplateViz>
  );
}
