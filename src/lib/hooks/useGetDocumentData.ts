import { useLocation } from 'react-router';
import { getDoc, doc } from 'firebase/firestore';
import { firestoreDB } from '~/firebase';
import { TObject } from '~/lib/types';
import { useQuery } from 'react-query';
import { TGetCollectionsProps } from '~/features/Viz/hooks/useGetDocumentsCollection';

interface ILocation {
  pathname: string;
  state: {
    itemMetaData: TGetCollectionsProps;
    id: string;
  };
}

export function useGetDocumentData() {
  const location = useLocation() as ILocation;
  const { serviceType, documentType, documentCollection } =
    location.state.itemMetaData;
  const { id: documentId } = location.state;

  return useQuery<TObject | undefined>(
    [serviceType, documentType, documentId],
    async () => {
      const docRef = doc(
        firestoreDB,
        'objects',
        `/${serviceType}/Documents/${documentType}/${documentCollection}Collection/${documentId}`
      );
      const docSnapShot = await getDoc(docRef);

      if (!docSnapShot.exists()) {
        return;
      }

      return docSnapShot.data() as TObject;
    }
  );
}
