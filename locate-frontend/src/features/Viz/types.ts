import { TSnackbarCategorie } from '~/components';

export type TObjectItem = {
  img: string;
  date: string;
  title: string;
  id: number;
};

export type TVizProps = {
  requestMethod: 'GET' | 'POST' | 'PUT' | 'DELETE';
  family: 'lostObjects' | 'foundObjects';
  isFoundObj?: boolean;
};

export type Collections = TSnackbarCategorie | 'all' | 'all documents';
