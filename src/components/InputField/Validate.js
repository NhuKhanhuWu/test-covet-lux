/** @format */
import * as Yup from "yup";

// Email: required
export const emailValidation = Yup.string()
  .email("Invalid email format")
  .required("Email is required");

// Password: requied
export const passwordValidation = Yup.string().required("Password is required");

// Full Name: Only text characters (not required)
export const fullNameValidation = Yup.string()
  .matches(/^[A-Za-zÀ-ỹ\s]+$/, "Full name can only contain letters")
  .nullable();

// Phone: Valid Vietnamese phone number (not required)
export const phoneValidation = Yup.string()
  .matches(/^(?:\+84|0)(?:\d{9}|\d{10})$/, "Invalid phone number format")
  .nullable();

// City/Province, Province, Ward, Specific Address: Letters & numbers only (not required)
export const textNumberValidation = Yup.string()
  .matches(/^[A-Za-z0-9À-ỹ\s]+$/, "Only letters and numbers are allowed")
  .nullable();
