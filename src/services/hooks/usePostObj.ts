import { firestoreDB } from '~/firebase';
import { addDoc, collection, DocumentReference } from 'firebase/firestore';
import { TServices } from '../types';

export default async function postObjectData({
  values,
  collectionCategorie,
  subCollection
}: TProps): Promise<DocumentReference<any> | undefined> {
  try {
    const docRef = await addDoc(
      collection(
        firestoreDB,
        `objects/${collectionCategorie}/${subCollection}`
      ),
      values
    );
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

type TProps = {
  values: any;
  collectionCategorie: TServices;
  subCollection: string;
};
