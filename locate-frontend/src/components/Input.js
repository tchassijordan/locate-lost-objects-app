import classNames from 'classnames';
import ClassNames from 'classnames';

export default function Input({ onChange, onBlur, value, name, type }) {
  const labelName = name.replaceAll('_', ' ');
  return (
    <>
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
    </>
  );
}
