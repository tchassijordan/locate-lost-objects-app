import { firestoreDB } from '~/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { TServices } from '~/services/types';

export default async function postObjectData({
  serviceFamily,
  documentCollection,
  documentType
}: TProps): Promise<TResult | undefined> {
  try {
    const objArr: TResult = [];
    const querySnapshot = await getDocs(
      collection(
        firestoreDB,
        `objects/${serviceFamily}/Documents/${documentType}/${documentCollection}Collection`
      )
    );
    querySnapshot.forEach((doc) => objArr.push({ ...doc.data(), id: doc.id }));
    return objArr;
  } catch (e) {
    console.error('Error reading collection: ', e);
  }
}

export type TProps = {
  serviceFamily: TServices;
  documentCollection: string;
  documentType: string;
};

type TResult = { [k: string]: string }[];
