import { TSnackbarCategorie } from '../components/index';

export default function ApiSelector({ selectedCat, family }: TApiProps) {
  if (family === 'lostObjects') {
    if (selectedCat === 'all') return 'api/Lost-Objects';
    switch (selectedCat) {
      case 'all documents':
        return 'api/Lost-Documents';
      case 'CNI':
        return 'api/Lost-CNI';
      case 'Passports':
        return 'api/Lost-Passports';
      case 'Birth Certificate':
        return 'api/Lost-Birth-certificate';
      case 'Other Documents':
        return 'api/Lost-Others-Documents';
      case 'Non documents':
        return 'api/Lost-Others-Lost-Objects';
      default:
        return 'api/Lost-Objects';
    }
  } else if (family === 'foundObjects') {
    if (selectedCat === 'all') return 'api/Found-Objects';
    switch (selectedCat) {
      case 'all documents':
        return 'api/Found-Documents';
      case 'CNI':
        return 'api/Found-CNI';
      case 'Passports':
        return 'api/Found-Passports';
      case 'Birth Certificate':
        return 'api/Found-Birth-certificate';
      case 'Other Documents':
        return 'api/Others-Found-Documents';
      case 'Non documents':
        return 'api/Others-Found-Objects';
      default:
        return 'api/Found-Objects';
    }
  }
}

export type TApiProps = {
  selectedCat: TSnackbarCategorie;
  family: 'lostObjects' | 'foundObjects';
};
