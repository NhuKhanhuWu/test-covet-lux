/** @format */
import useGetLocal from "../../../hooks/useGetLocal";
import InputField from "../../../components/InputField/InputField";
import GridContainer from "../../../components/GridContainer";

export default function PersonalInfor() {
  // get personal infor from local storage
  const infor = useGetLocal("personal_infor");
  const INPUT_FIELDS_INFOR = [
    { id: "name", label: "Full name", value: infor?.name },
    {
      id: "phone",
      label: "Phone",
      type: "tel",
      value: infor?.phone,
      placeholder: "+84 | 0213 456 789",
      pattern: "(\\+84|0)\\d{7,10}",
      maxLength: 10,
    },
  ];
  const ADDRESS = [
    { id: "city", label: "City/provine", value: infor?.city },
    { id: "provine", label: "Provine", value: infor?.provine },
    { id: "ward", label: "Ward", value: infor?.ward },
    {
      id: "specificAddress",
      label: "Specific Address",
      value: infor?.specificAddress,
    },
  ];

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
