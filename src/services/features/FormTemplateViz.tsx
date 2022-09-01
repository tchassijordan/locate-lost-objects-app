import React, { useRef, useState } from 'react';
import { Button, Loader } from '~/components';
import { TServices } from '~/services';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { imagesDB } from '~/firebase';

export default function FormTemplateViz({
  isSubmitting,
  toggleModal,
  handleSubmit,
  resetForm,
  children,
  service,
  imageStateHandler
}: TProps) {
  const imgRef = useRef<HTMLInputElement>(null);
  const [uploadingStatus, setUploadingStatus] = useState(false);

  const imageHandler = ({ service, file }: TImgHandlerProps) => {
    setUploadingStatus(true);
    const storageRef = ref(imagesDB, `${service}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', null, null, async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      setUploadingStatus(false);
      imageStateHandler(downloadURL);
    });
  };

  const uploadTrigger = () => {
    if (imgRef.current !== null && imgRef.current.files !== null) {
      const file = imgRef.current.files[0];
      imageHandler({
        service,
        file
      });
    }
  };

  return (
    <div>
      {children}
      <div className='col-span-6 my-3'>
        <label className='mb-2 block text-sm font-medium text-gray-700'>
          Photo
        </label>
        <div className='flex flex-col space-y-1'>
          <div className='flex'>
            <label
              htmlFor='file-upload'
              className='rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
              Change
              <input
                type='file'
                id='file-upload'
                name='imgUrl'
                className='hidden'
                ref={imgRef}
                onChange={uploadTrigger}
              />
            </label>
            <Loader
              isLoading={uploadingStatus}
              size={40}
            />
          </div>
          {imgRef.current !== null && imgRef.current?.files !== null && (
            <span className='text-gray-600'>
              {imgRef.current.files[0]?.name}
            </span>
          )}
        </div>
      </div>
      <div className='flex items-center space-x-8'>
        <div className='w-fit bg-gray-100 py-3 text-right '>
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
        <div className='w-fit bg-gray-100 py-3 text-right '>
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
        <Loader
          isLoading={isSubmitting}
          size={40}
        />
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
  service: TServices;
  imageStateHandler: (url: string) => void;
};

type TImgHandlerProps = {
  service: TServices;
  file: File;
};
