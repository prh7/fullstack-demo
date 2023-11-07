import * as Yup from 'yup';

export const carFormValidationSchema =Yup.object().shape({
    brand: Yup.string()
      .required('The brand of the car is required'),
    model: Yup.string()
      .required('The model for the brand of the car is required')
      .matches(/^[ A-Za-z0-9_@./#&+-]*$/, 'The model can only contain alphabets, numbers and allowed special characters _@./#&+-'),
    year: Yup.number()
      .required('The year of car registration is required')
      .min(1950, 'The year of car registration must be above 1950')
      .max(2100, 'The year of car registration must be below 2100'),
    price: Yup.number()
      .required('The price for the car is required')
});
