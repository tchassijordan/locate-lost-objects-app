import { firestoreDB } from '~/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { TServices } from '~/services/types';
import { useQuery } from 'react-query';

export default function getDocumentsCollection({
  serviceFamily,
  documentCollection,
  documentType
}: TProps): TResult | undefined {
  const { data, isLoading, isError } = useQuery<Record<string, string>[]>(
    [serviceFamily, documentCollection, documentType],
    async () => {
      const result: Record<string, string>[] = [];
      const querySnapshot = await getDocs(
        collection(
          firestoreDB,
          `objects/${serviceFamily}/Documents/${documentType}/${documentCollection}Collection`
        )
      );
      querySnapshot.forEach((doc) =>
        result.push({ ...doc.data(), id: doc.id })
      );
      return result;
    }
  );
  return { data, isLoading, isError };
}

export type TProps = {
  serviceFamily: TServices;
  documentCollection: string;
  documentType: string;
};

type TResult = {
  data?: Record<string, string>[];
  isLoading: boolean;
  isError: boolean;
};
