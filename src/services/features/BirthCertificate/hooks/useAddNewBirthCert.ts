import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseSchema } from '~/services';
import { TServiceProps } from '~/services/types';
import { firestoreDB } from '~/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useMutation, useQueryClient } from 'react-query';

export default function useAddNewBirthCert({
  serviceType,
  onModalToggle: closeModal
}: Omit<TServiceProps, 'isMounted'>) {
  const queryClient = useQueryClient();

  const { mutateAsync: addPost } = useMutation(
    async (values: BirthCertificateData) =>
      await addDoc(
        collection(
          firestoreDB,
          `objects/${serviceType}/Documents/birthCertificates/birthCertificatesCollection`
        ),
        values
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([serviceType, 'birthCertificates']);
      }
    }
  );

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      location: '',
      town_hall: '',
      imgUrl: ''
    },
    validationSchema: Yup.object({
      ...baseSchema,
      town_hall: Yup.string().required(
        'Please enter the town where it was made'
      )
    }),
    onSubmit: async (values) => {
      await addPost(values);
      formik.resetForm();
      closeModal();
    }
  });
  return { ...formik };
}

type BirthCertificateData = {
  title: string;
  description: string;
  date: string;
  location: string;
  town_hall: string;
  imgUrl: string;
};
