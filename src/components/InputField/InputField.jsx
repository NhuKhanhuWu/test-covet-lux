/** @format */
import { useRef, useState } from "react";
import styles from "./InputField.module.css";

function InputField({
  field,
  isEpayment,
  isRequired,
  form,
  isPassword,
  isShowPass,
  setShowPass,
}) {
  const checkedPlaceholder =
    field?.placeholder !== undefined ? field?.placeholder : field?.label;

  // toggle show password
  let type = field.type;
  if (field.type === "password") {
    if (isShowPass === true) {
      type = "text";
    } else {
      type = "password";
    }
  }

  // change value
  const [input, setInput] = useState(field?.value);
  function handleChangeValue(e) {
    e.preventDefault();
    setInput(e.value);
  }

  return (
    <div className={styles.inputField}>
      <label htmlFor={field?.id}>{field?.label}</label>
      <input
        onChange={(e) => handleChangeValue(e)}
        required={isRequired}
        className={isEpayment ? "ePayment" : "inputInfor"}
        maxLength={field?.maxLength}
        pattern={field?.pattern}
        form={form}
        type={type}
        value={input}
        placeholder={checkedPlaceholder}
        id={field?.id}></input>
      {isPassword && (
        <p
          className="link"
          onClick={() => {
            setShowPass(!isShowPass);
          }}>
          {isShowPass ? "Hide" : "Show"} password
        </p>
      )}
    </div>
  );
}

export default InputField;
