import { TSnackbarCategorie } from '../components/index';

export default function ApiSelector({ selectedCat, family }: TApiProps) {
  if (family === 'lostObjects' && selectedCat === 'all') {
    return 'api/Lost-Objects';
  } else if (family === 'foundObjects' && selectedCat === 'all') {
    return 'api/Found-Objects';
  }
  switch (selectedCat) {
    case 'all documents':
      return 'api/Documents';
    case 'CNI':
      return 'api/CNI';
    case 'Passports':
      return 'api/Passports';
    case 'Birth Certificate':
      return 'api/Birth-certificate';
    case 'Other Documents':
      return 'api/Others-Documents';
    case 'Non documents':
      return 'api/Others-Lost-Objects';
    default:
      return 'api/Lost-Objects';
  }
}

export type TApiProps = {
  selectedCat: TSnackbarCategorie;
  family: 'lostObjects' | 'foundObjects';
};
