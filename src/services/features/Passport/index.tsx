import React from 'react';
import { TServiceProps } from '~/services/types';
import { InputField } from '~/components';
import { FormTemplateViz } from '~/services';
import useAddNewPassport from './hooks/useAddNewPassport';

export default function Passport({
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
  } = useAddNewPassport({ serviceType, onModalToggle });

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
        <div className='grid grid-cols-3 space-x-4'>
          <InputField
            onChange={handleChange}
            onBlur={handleBlur}
            name='passport_number'
            type='text'
            value={values.passport_number}
            hasError={!!touched.passport_number && !!errors.passport_number}
            errorMsg={errors.passport_number}
          />
          <InputField
            onChange={handleChange}
            onBlur={handleBlur}
            name='town_isssued'
            type='text'
            value={values.town_isssued}
          />
          <InputField
            onChange={handleChange}
            onBlur={handleBlur}
            name='expiration_date'
            type='text'
            value={values.expiration_date}
            hasError={!!touched.expiration_date && !!errors.expiration_date}
            errorMsg={errors.expiration_date}
          />
        </div>
        <InputField
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.passport_owner}
          name='passport_owner'
          type='text'
          hasError={!!touched.passport_owner && !!errors.passport_owner}
          errorMsg={errors.passport_owner}
        />
        <InputField
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          name='description'
          type='text'
          hasError={!!touched.description && !!errors.description}
          errorMsg={errors.description}
        />
      </form>
    </FormTemplateViz>
  );
}
