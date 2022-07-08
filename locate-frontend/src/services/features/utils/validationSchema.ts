import * as Yup from 'yup';

const baseValidation = {
  title: Yup.string().required('Please enter a title for this object'),
  description: Yup.string().required(
    'Please enter a vivid description of this object'
  ),
  date: Yup.string()
    .required('Accepted format YYYY-MM-DD')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Accepted format YYYY-MM-DD')
};

export default baseValidation;
