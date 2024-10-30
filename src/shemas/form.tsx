import * as yup from "yup";

export const validationOrder = yup.object().shape({
  fullName: yup.string().required("Please enter your full name."),
  // phoneNumber: yup.string().required("Please enter your phone number."),
  email: yup.string().email("Invalid email").required("Please enter your email address."),
  // message: yup.string(),
});
