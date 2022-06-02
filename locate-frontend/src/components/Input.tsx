import React from 'react';
import classNames from 'classnames';

export default function Input({ onChange, onBlur, value, name, type }: Prop) {
  const labelName = name.replaceAll('_', ' ');
  return (
    <div>
      <label
        htmlFor={name}
        className='block text-sm font-medium text-gray-700 capitalize'
      >
        {labelName}
      </label>

      <input
        type={type}
        name={name}
        id={name}
        autoComplete={name}
        className={classNames('mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md')}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </div>
  );
}

type Prop = {
  onChange: () => void,
  onBlur: () => void,
  name: string,
  type: string,
  value: string,  
}
