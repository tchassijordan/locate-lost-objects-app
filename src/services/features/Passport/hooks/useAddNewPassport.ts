import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseSchema } from '~/services';
import { TServiceProps } from '~/services/types';
import { firestoreDB } from '~/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useMutation, useQueryClient } from 'react-query';

export default function useAddNewPassport({
  serviceType,
  onModalToggle: closeModal
}: Omit<TServiceProps, 'isMounted'>) {
  const queryClient = useQueryClient();

  const { mutateAsync: addPost } = useMutation(
    async (values: PassportData) =>
      await addDoc(
        collection(
          firestoreDB,
          `objects/${serviceType}/Documents/passports/passportsCollection`
        ),
        values
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([serviceType, 'passports']);
      }
    }
  );

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      location: '',
      town_isssued: '',
      expiration_date: '',
      passport_number: '',
      passport_owner: '',
      imgUrl: ''
    },
    validationSchema: Yup.object({
      ...baseSchema,
      passport_number: Yup.string()
        .required('You must provide a passport number')
        .matches(/^\d{7}/, 'Passport number must be 7 digits'),
      passport_owner: Yup.string().required(
        'You must specify the owner of this CNI'
      ),
      expiration_date: Yup.string().matches(
        /^\d{4}-\d{2}-\d{2}$/,
        'Accepted format YYYY-MM-DD'
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

type PassportData = {
  title: string;
  description: string;
  date: string;
  location: string;
  town_isssued: string;
  expiration_date: string;
  passport_number: string;
  passport_owner: string;
  imgUrl: string;
};
