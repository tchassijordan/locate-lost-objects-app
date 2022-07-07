import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

export default function Button({ link }: TBtnProps) {
  let style: string;
  const baseStyle =
    'group relative flex justify-center items-center py-2 px-4 border text-sm font-medium text-white rounded-md focus:outline-none focus:ring-0 transition-all';

  if (link.primary)
    style = cn(
      'w-full bg-primary hover:bg-orange-700 border-transparent',
      baseStyle
    );
  else if (link.secondary)
    style = cn(
      'border-2 border-primary w-full hover:border-orange-700',
      baseStyle
    );
  else style = '';

  return (
    <button
      className={cn(link.classes, style)}
      onClick={link.action}
      type={link.type}>
      {link.Icon && (
        <link.Icon
          className={cn(
            'h-5 w-5 text-orange-500 group-hover:text-orange-400 inset-y-0 flex items-center',
            {
              'order-10 ml-2 text-gray-200': link.text_first
            },
            { '-order-1 mr-3 text-gray-200': !link.text_first }
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
  id?: number;
};

export type TBtnLink = {
  placeholder: string;
  classes?: string;
  primary?: boolean;
  secondary?: boolean;
  to?: string | {};
  text_first?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  Icon?: (props: any) => JSX.Element;
  action?: () => void;
};
