import React from 'react';
import { Input } from '..';

export default function Passport({
  onChange,
  onBlur,
  ville_deliverance,
  expiration,
  postID
}: TBCProps) {
  return (
    <div className='space-y-4'>
      <Input
        onChange={onChange}
        onBlur={onBlur}
        name='ville_deliverance'
        type='text'
        value={ville_deliverance}
      />
      <Input
        onChange={onChange}
        onBlur={onBlur}
        name='expiration'
        type='text'
        value={expiration}
      />
      <Input
        onChange={onChange}
        onBlur={onBlur}
        name='postID'
        type='text'
        value={postID}
      />
    </div>
  );
}

export type TBCProps = {
  onChange: any;
  onBlur: any;
  ville_deliverance: string;
  expiration: string;
  postID: string;
};
