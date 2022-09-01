import { firestoreDB } from '~/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { TServices } from '~/services/types';
import { useQuery } from 'react-query';

export default function useGetDocumentsCollection({
  serviceType,
  documentCollection,
  documentType
}: TGetCollectionsProps): TResult | undefined {
  const { data, isLoading, isError } = useQuery<Record<string, string>[]>(
    [serviceType, documentCollection, documentType],
    async () => {
      const result: Record<string, string>[] = [];
      const querySnapshot = await getDocs(
        collection(
          firestoreDB,
          `objects/${serviceType}/Documents/${documentType}/${documentCollection}Collection`
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

export type TGetCollectionsProps = {
  serviceType: TServices;
  documentCollection: string;
  documentType: string;
};

type TResult = {
  data?: Record<string, string>[];
  isLoading: boolean;
  isError: boolean;
};
