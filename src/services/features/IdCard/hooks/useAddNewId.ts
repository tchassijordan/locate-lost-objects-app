import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseSchema } from '~/services';
import { TServiceProps } from '~/services/types';
import { firestoreDB } from '~/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useMutation, useQueryClient } from 'react-query';

export default function useAddNewIdCard({
  serviceType,
  onModalToggle: closeModal
}: Omit<TServiceProps, 'isMounted'>) {
  const queryClient = useQueryClient();

  const { mutateAsync: addPost } = useMutation(
    async (values: IdCardData) =>
      await addDoc(
        collection(
          firestoreDB,
          `objects/${serviceType}/Documents/CNI/cniCollection`
        ),
        values
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([serviceType, 'CNI']);
      }
    }
  );

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      location: '',
      numero_CNI: '',
      owner: '',
      imgUrl: ''
    },
    validationSchema: Yup.object({
      ...baseSchema,
      numero_CNI: Yup.string()
        .required('You must provide a valid CNI number')
        .matches(/^\d{9}/, 'CNI number must be 9 digits'),
      owner: Yup.string().required('You must specify the owner of this CNI')
    }),
    onSubmit: async (values) => {
      await addPost(values);
      formik.resetForm();
      closeModal();
    }
  });
  return { ...formik };
}

type IdCardData = {
  title: string;
  description: string;
  date: string;
  location: string;
  numero_CNI: string;
  owner: string;
  imgUrl: string;
};
