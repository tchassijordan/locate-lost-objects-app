import React from 'react';
import { TServiceProps } from '~/services/types';
import { InputField } from '~/components';
import { FormTemplateViz } from '~/services';
import useAddNewIdCard from './hooks/useAddNewId';

export default function IdCard({
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
  } = useAddNewIdCard({ serviceType, onModalToggle });

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
            hasError={!!touched.location && !!errors.location}
            errorMsg={errors.location}
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
          value={values.owner}
          name='owner'
          type='text'
          hasError={!!touched.owner && !!errors.owner}
          errorMsg={errors.owner}
        />
        <InputField
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.numero_CNI}
          name='numero_CNI'
          type='text'
          hasError={!!touched.numero_CNI && !!errors.numero_CNI}
          errorMsg={errors.numero_CNI}
        />
      </form>
    </FormTemplateViz>
  );
}
