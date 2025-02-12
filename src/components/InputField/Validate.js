/** @format */
import * as Yup from "yup";

// Email: required
export const emailValidate = Yup.string()
  .email("Invalid email format")
  .required("Email is required");

// user Password: required
export const passValidate = Yup.string().required("Password is required");

// visa password: 3 character
export const visaPassValidate = Yup.string()
  .matches(
    /^(?=(?:[^0-9]*[0-9]){3}[^0-9]*$).*$/,
    "Password must contain exactly 3 numbers"
  )
  .nullable();

// card code
export const cardCodeValidate = Yup.string()
  .matches(
    /^(?=(?:[^0-9]*[0-9]){16}[^0-9]*$).*$/,
    "Card code must contain exactly 16 characters"
  )
  .nullable();

// expired date
export const expiredDateValidate = Yup.string()
  .matches(
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    "Invalid date format (YYYY-MM-DD)"
  )
  .nullable();

// Full Name: Only text characters (not required)
export const nameValidate = Yup.string()
  .matches(/^[A-Za-zÀ-ỹ\s]+$/, "Full name can only contain letters")
  .nullable();

// Phone: Valid Vietnamese phone number (not required)
export const phoneValidate = Yup.string()
  .matches(/^(?:\+84|0)(?:\d{9}|\d{10})$/, "Invalid phone number format")
  .nullable();

// City/Province, Province, Ward, Specific Address: Letters & numbers only (not required)
export const txtNumValidate = Yup.string()
  .matches(/^[A-Za-z0-9À-ỹ\s]+$/, "Only letters and numbers are allowed")
  .nullable();

// Radio btn
export const payMethodValidate = Yup.string()
  .oneOf(["cod", "ePayment"], "You must select a payment method")
  .required("Payment method is required");
