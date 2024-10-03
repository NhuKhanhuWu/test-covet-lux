/** @format */
import { useState } from "react";
import styles from "./Checkout.module.css";

import ListHeader from "../../components/ListHeader/ListHeader";
import InputField from "../../components/InputField/InputField";

export default function Payment() {
  const [currMethod, setMethod] = useState("cod");
  const INPUT_FIELDS_EPAYMENT = [
    {
      id: "cardCode",
      label: "Card code",
      placeholder: "0123 4567 8901 2345",
    },
    {
      id: "expiredDate",
      label: "Expired date",
      placeholder: "DD/MM/YY",
      type: "date",
    },
    {
      id: "password",
      label: "Password",
      placeholder: "3 character",
      maxLength: 3,
    },
    { id: "ownerName", label: "Owner name", placeholder: "John Wilson" },
  ];

  return (
    <div>
      <ListHeader
        title={"Payment information"}
        className={styles.header}></ListHeader>
      <div
        style={{
          marginBottom: "2rem",
          paddingBottom: "2rem",
          borderBottom: "solid 1px var(--gray)",
        }}>
        <input
          required
          type="radio"
          name="payment-method"
          value="cod"
          id="cod"
          onClick={() => setMethod("cod")}></input>
        <label htmlFor="cod" className={styles.paymentLabel}>
          COD
        </label>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <input
          onClick={() => setMethod("ePayment")}
          required
          type="radio"
          name="payment-method"
          value="ePayment"
          id="ePayment"></input>
        <label htmlFor="ePayment" className={styles.paymentLabel}>
          Online payment
        </label>
      </div>
      {currMethod === "ePayment" && (
        <div className={`columnContent`}>
          {INPUT_FIELDS_EPAYMENT.map((field, i) => (
            <InputField
              form={"paymentInfor"}
              isRequired={currMethod === "ePayment"}
              isEpayment={true}
              field={field}
              key={`payment-${i}`}></InputField>
          ))}
          <p className={`copyRight ${styles.noteTxt}`}>
            We won't store your card infor
          </p>
        </div>
      )}
    </div>
  );
}
