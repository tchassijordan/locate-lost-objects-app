import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

export default function Button({
  Icon,
  placeholder,
  type,
  classes,
  primary,
  secondary,
  to
}: TProps) {
  let style: string;

  if (primary)
    style =
      'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all';
  else if (secondary) style = '';
  else style = '';

  return (
    <button
      type={type}
      className={cn(classes , style)}>
      {Icon && (
        <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
          {Icon}
        </span>
      )}
      {to ? <Link to={to}>{placeholder}</Link> : placeholder}
    </button>
  );
}

type TProps = {
  Icon?: JSX.Element;
  placeholder: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  classes?: string;
  primary?: boolean;
  secondary?: boolean;
  to?: string;
};
