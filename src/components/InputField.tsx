import React from 'react';
import classNames from 'classnames';

export default function InputField({
  onChange,
  onBlur,
  value,
  name,
  type
}: Prop) {
  const labelName = name.replaceAll('_', ' ');
  return (
    <div>
      <label
        htmlFor={name}
        className='block text-sm font-medium capitalize text-gray-700'>
        {labelName}
      </label>

      <input
        type={type}
        name={name}
        id={name}
        autoComplete={name}
        className={classNames(
          'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm'
        )}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </div>
  );
}

type Prop = {
  onChange: any;
  onBlur: any;
  name: string;
  type: string;
  value: string;
};
