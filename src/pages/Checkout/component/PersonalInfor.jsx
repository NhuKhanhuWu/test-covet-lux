/** @format */
import InputField from "../../../components/InputField/InputField";
import GridContainer from "../../../components/GridContainer";

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
const ADDRESS = [
  { id: "city", label: "City/provine", name: "city" },
  { id: "provine", label: "Provine", name: "province" },
  { id: "ward", label: "Ward", name: "ward" },
  {
    id: "specificAddress",
    label: "Specific Address",
    name: "specificAddress",
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
      <GridContainer numCol={2} gap={2}>
        {ADDRESS.map((field, i) => (
          <InputField
            form={"paymentInfor"}
            key={`address${i}`}
            field={field}
            isRequired={true}></InputField>
        ))}
      </GridContainer>
    </div>
  );
}
