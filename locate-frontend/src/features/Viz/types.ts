import { TSnackbarCategorie } from '~/components';

export type TFamily = {
  family: 'lostObjects' | 'foundObjects';
};

export type Collections = TSnackbarCategorie | 'all' | 'all documents';
