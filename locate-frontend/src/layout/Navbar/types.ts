export type TNavigationLink = {
  name: string;
  current: boolean;
  href: string;
};

export type TProps = {
  links: TNavigationLink[];
  user: TUser;
};

export type TUser = {
  first_name?: string;
  last_name?: string;
};
