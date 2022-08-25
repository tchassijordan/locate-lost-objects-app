import { getDoc, doc } from 'firebase/firestore';
import { firestoreDB } from '~/firebase';
import { TObject } from '~/lib/types';

interface IProps {
  url: string;
}

const getDocumentData = async ({ url }: IProps) => {
  const docRef = doc(firestoreDB, 'objects', `${url}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as TObject;
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
    return null;
  }
};

export default getDocumentData;
