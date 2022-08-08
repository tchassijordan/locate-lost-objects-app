import { firestoreDB } from '~/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { TServices } from '~/services/types';

export default async function postObjectData({
  serviceFamily,
  subCollection,
  bucket
}: TProps): Promise<TResult | undefined> {
  try {
    const objArr: TResult = [];
    const querySnapshot = await getDocs(
      collection(
        firestoreDB,
        `objects/${serviceFamily}/Documents/${
          bucket ? bucket : subCollection
        }/${subCollection}Collection`
      )
    );
    querySnapshot.forEach((doc) => objArr.push({ ...doc.data(), id: doc.id }));
    return objArr;
  } catch (e) {
    console.error('Error reading collection: ', e);
  }
}

type TProps = {
  serviceFamily: TServices;
  subCollection: string;
  bucket?: string;
};

type TResult = { [k: string]: string }[];
