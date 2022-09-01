import React from 'react';
import { TServiceProps } from '~/services/types';
import { InputField } from '~/components';
import { FormTemplateViz } from '~/services';
import useAddNewBirthCert from './hooks/useAddNewBirthCert';

export default function BirthCertificateViz({
  serviceType,
  onModalToggle,
  isMounted
}: TServiceProps) {
  const {
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
    resetForm,
    values,
    errors,
    touched,
    setFieldValue
  } = useAddNewBirthCert({ serviceType, onModalToggle });

  const imageStateHandler = (url: string) => {
    setFieldValue('imgUrl', url);
  };

  if (!isMounted) return null;

  return (
    <FormTemplateViz
      isSubmitting={isSubmitting}
      toggleModal={onModalToggle}
      handleSubmit={handleSubmit}
      resetForm={resetForm}
      service={serviceType}
      imageStateHandler={imageStateHandler}>
      <form
        onSubmit={handleSubmit}
        className='space-y-4'>
        <div className='grid grid-cols-3 space-x-4'>
          <InputField
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            name='title'
            type='text'
            hasError={!!touched.title && !!errors.title}
            errorMsg={errors.title}
          />
          <InputField
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.date}
            name='date'
            type='text'
            hasError={!!touched.date && !!errors.date}
            errorMsg={errors.date}
          />
          <InputField
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.location}
            name='location'
            type='text'
          />
        </div>
        <InputField
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          name='description'
          type='text'
          hasError={!!touched.description && !!errors.description}
          errorMsg={errors.description}
        />
        <InputField
          onChange={handleChange}
          onBlur={handleBlur}
          name='town_hall'
          type='text'
          value={values.town_hall}
          hasError={!!touched.town_hall && !!errors.town_hall}
          errorMsg={errors.town_hall}
        />
      </form>
    </FormTemplateViz>
  );
}
