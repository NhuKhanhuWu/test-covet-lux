/** @format */
import { useState } from "react";
import styles from "../Checkout.module.css";

import ListHeader from "../../../components/ListHeader/ListHeader.jsx";
import InputField from "../../../components/InputField/InputField";
import { Field } from "formik";

const INPUT_FIELDS_EPAYMENT = [
  {
    id: "cardCode",
    label: "Card code",
    placeholder: "0123 4567 8901 2345",
    name: "cardCode",
  },
  {
    id: "expiredDate",
    label: "Expired date",
    placeholder: "DD/MM/YY",
    type: "date",
    name: "expiredDate",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "3 character",
    name: "password",
    isPassword: true,
    type: "password",
  },
  {
    id: "ownerName",
    label: "Owner name",
    placeholder: "John Wilson",
    name: "ownerName",
  },
];

function Cod({ setMethod }) {
  return (
    <div
      style={{
        marginBottom: "2rem",
        paddingBottom: "2rem",
        borderBottom: "solid 1px var(--gray)",
      }}>
      <Field
        required
        type="radio"
        name="paymentMethod"
        value="cod"
        id="cod"
        onClick={() => setMethod("cod")}></Field>
      <label htmlFor="cod" className={styles.paymentLabel}>
        COD
      </label>
    </div>
  );
}

function EPayment({ setMethod, currMethod }) {
  const [isShowPass, setShowPass] = useState(false);

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <Field
          onClick={() => setMethod("ePayment")}
          required
          type="radio"
          name="paymentMethod"
          value="ePayment"
          id="ePayment"></Field>
        <label htmlFor="ePayment" className={styles.paymentLabel}>
          Online payment
        </label>
      </div>
      {currMethod === "ePayment" && (
        <div className={`columnContent ${styles.ePayForm}`}>
          {INPUT_FIELDS_EPAYMENT.map((field, i) => (
            <InputField
              form={"paymentInfor"}
              isEpayment={true}
              field={field}
              key={`payment-${i}`}
              isPassword={field.isPassword}
              isShowPass={isShowPass}
              setShowPass={setShowPass}></InputField>
          ))}
          <p className={`copyRight ${styles.noteTxt}`}>
            We won't store your card infor
          </p>
        </div>
      )}
    </>
  );
}

export default function Payment() {
  const [currMethod, setMethod] = useState("cod");

  return (
    <div>
      <ListHeader
        title={"Payment information"}
        className={styles.header}></ListHeader>
      <Cod setMethod={setMethod}></Cod>

      <EPayment currMethod={currMethod} setMethod={setMethod}></EPayment>
    </div>
  );
}
