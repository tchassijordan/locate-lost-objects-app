import React from 'react';
import { Input } from '..';

export default function BirthCertificate({
  onChange,
  onBlur,
  town_hall
}: TBCProps) {
  return (
    <Input
      onChange={onChange}
      onBlur={onBlur}
      name='town_hall'
      type='text'
      value={town_hall}
    />
  );
}

export type TBCProps = {
  onChange: any;
  onBlur: any;
  town_hall: string;
};
