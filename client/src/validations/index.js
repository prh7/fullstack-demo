import * as Yup from 'yup';

export const carFormValidationSchema =Yup.object().shape({
    brand: Yup.string()
      .required('Please choose a brand'),
    model: Yup.string()
      .required(`Please fill in model linked to the car's brand`)
      .matches(/^[ A-Za-z0-9_@./#&+-]*$/, 'The model can only contain alphabets, numbers and allowed special characters _@./#&+-'),
    year: Yup.number()
      .transform((value) => Number.isNaN(value) ? null : value )
      .required('Please fill in registration year of the car')
      .min(1950, 'Registration year of the must be greater than 1950')
      .max(2100, 'Registration year of the car must be less than 2100'),
    price: Yup.number()
      .transform((value) => Number.isNaN(value) ? null : value )
      .required('Please fill in price of the car'),
    propellant: Yup.string()
      .required('Please choose a propellant')
});
