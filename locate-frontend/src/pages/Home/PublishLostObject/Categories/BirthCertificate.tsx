import React from 'react';
import { Input } from '../../../../components';

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
  onChange: () => void;
  onBlur: () => void;
  town_hall: string;
};
