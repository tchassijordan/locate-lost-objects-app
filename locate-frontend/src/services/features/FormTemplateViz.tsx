import React from 'react';
import LoadingSVG from '~/assets/icons/LoadingSVG';
import { Button } from '~/components';

export default function FormTemplateViz({
  isSubmitting,
  toggleModal,
  handleSubmit,
  resetForm,
  children
}: TProps) {
  return (
    <div>
      {children}
      <div className='space-x-8 flex items-center'>
        <div className='w-fit py-3 bg-gray-100 text-right '>
          <Button
            link={{
              placeholder: 'Cancel',
              secondary: true,
              classes: 'text-primary w-fit',
              action: () => {
                resetForm();
                toggleModal();
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
              action: handleSubmit,
              type: 'submit'
            }}
          />
        </div>
        {isSubmitting ? (
          <LoadingSVG className='text-primary animate-spin w-[40px] h-[40px]' />
        ) : null}
      </div>
    </div>
  );
}

type TProps = {
  isSubmitting: boolean;
  toggleModal: () => void;
  handleSubmit: () => void;
  resetForm: () => void;
  children: React.ReactNode;
};
