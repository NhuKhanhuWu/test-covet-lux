/** @format */
import { ErrorMessage, Field } from "formik";
import styles from "./InputField.module.css";

function TextInput({
  field,
  isEpayment = false,
  form = "",
  isPassword = false,
  isShowPass = false,
  setShowPass = () => {},
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

  return (
    <div className={styles.inputField}>
      <label htmlFor={field?.id}>{field?.label}</label>
      {/* input field */}
      <Field
        className={isEpayment ? "ePayment" : "inputInfor"}
        maxLength={field?.maxLength}
        form={form}
        type={type}
        placeholder={checkedPlaceholder}
        id={field?.id}
        name={field.name}></Field>

      {/* show pass btn */}
      {isPassword && (
        <p
          className="link"
          onClick={() => {
            setShowPass((isShowPass) => !isShowPass);
          }}>
          {isShowPass ? "Hide" : "Show"} password
        </p>
      )}

      {/* error message */}
      <ErrorMessage
        name={field.name || ""}
        component="p"
        className="text-red-500 text-m mt-1"
      />
    </div>
  );
}

export function TxtArea({ field, elClass }) {
  return (
    <div className={`${styles.inputField} ${elClass}`}>
      <label htmlFor={field?.id}>{field?.label}</label>
      <Field
        as="textarea"
        maxLength={field?.maxLength}
        pattern={field?.pattern}
        id={field?.id}></Field>
    </div>
  );
}

export function SelectInput({
  value = "",
  onChangeFunc = () => {},
  options = [],
  placeholder = "",
  name = "",
}) {
  return (
    <div className="relative">
      <label className="font-bold">{placeholder}</label>
      <Field
        as="select"
        name={name}
        value={value}
        onChange={(e) => {
          onChangeFunc(e);
        }}
        className="w-full h-[4rem] p-2 border-[1px] border-black rounded-none focus:outline-none focus:ring-1 focus:ring-[#fc6c22]">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((province) => (
          <option key={province.Id} value={province.Name}>
            {province.Name}
          </option>
        ))}
      </Field>

      {/* error message */}
      <ErrorMessage
        name={placeholder || ""}
        component="p"
        className="text-red-500 text-m mt-1"
      />
    </div>
  );
}

export default TextInput;
