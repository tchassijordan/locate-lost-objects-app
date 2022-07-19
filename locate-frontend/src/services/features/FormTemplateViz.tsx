import React, { useRef, useState } from 'react';
import LoadingSVG from '~/assets/icons/LoadingSVG';
import { Button } from '~/components';
import { TServices } from '~/services';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { imagesDB } from '~/firebase';

export default function FormTemplateViz({
  isSubmitting,
  toggleModal,
  handleSubmit,
  resetForm,
  children,
  service
}: TProps) {
  const imgRef = useRef<HTMLInputElement>(null);
  const [downloadImgUrl, setDownloadImgUrl] = useState('');
  const [uploadingStatus, setUploadingStatus] = useState(false);

  const imageHandler = ({ service, file }: TImgHandlerProps) => {
    setUploadingStatus(true);
    const storageRef = ref(imagesDB, `${service}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', null, null, async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      setDownloadImgUrl(downloadURL);
      setUploadingStatus(false);
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

  console.log('download Url', downloadImgUrl);

  return (
    <div>
      {children}
      <div className='col-span-6 my-3'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Photo
        </label>
        <div className='flex'>
          <label
            htmlFor='file-upload'
            className='bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'>
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
          {uploadingStatus ? (
            <LoadingSVG className='text-primary animate-spin w-[40px] h-[40px] ml-3' />
          ) : null}
        </div>
      </div>
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
  service: TServices;
};

type TImgHandlerProps = {
  service: TServices;
  file: File;
};
