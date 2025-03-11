/** @format */
import InputField from "../../../../components/InputField/InputField";
import LocationForm from "../../../../components/CityCheckoutForm/LocationForm";

const INPUT_FIELDS_INFOR = [
  { id: "name", label: "Full name", name: "name" },
  {
    id: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "+84 | 0213 456 789",
    name: "phone",
  },
];

export default function PersonalInfor() {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div className={`columnContent`} style={{ marginBottom: "1rem" }}>
        {INPUT_FIELDS_INFOR.map((field, i) => (
          <InputField
            form={"paymentInfor"}
            key={`infor-${i}`}
            field={field}
            isRequired={true}></InputField>
        ))}
      </div>
      <LocationForm></LocationForm>
    </div>
  );
}
