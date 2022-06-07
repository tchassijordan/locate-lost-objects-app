import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

export default function Button({ link }: TBtnProps) {
  let style: string;

  if (link.primary)
    style =
      'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all';
  else if (link.secondary) style = '';
  else style = '';

  return (
    <button
      className={cn(link.classes, style)}>
      {link.Icon && (
        <link.Icon
          className={cn(
            'h-5 w-5 text-orange-500 group-hover:text-orange-400 inset-y-0 flex items-center',
            {
              'order-10 ml-3 my-auto': link.text_first
            },
            { 'absolute left-0 pl-3': !link.text_first }
          )}
          aria-hidden
        />
      )}
      {link.to ? (
        <Link to={link.to}>{link.placeholder}</Link>
      ) : (
        link.placeholder
      )}
    </button>
  );
}

export type TBtnProps = {
  link: TBtnLink;
};

export type TBtnLink = {
  placeholder: string;
  classes?: string;
  primary?: boolean;
  secondary?: boolean;
  to?: string;
  text_first?: boolean;
  Icon?: (props: any) => JSX.Element;
};
