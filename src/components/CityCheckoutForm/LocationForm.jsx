/** @format */

import { useFormikContext } from "formik";
import address from "./vietnamAddressTest.json";
import GridContainer from "../GridContainer";
import InputField, { SelectInput } from "../InputField/InputField";

const LocationForm = ({ elClass }) => {
  const { values, setFieldValue } = useFormikContext(); // Get Formik context

  const selectedProvinceData = address.find((p) => p.Name === values.city);
  const districts = selectedProvinceData ? selectedProvinceData.Districts : [];
  const selectedDistrictData = districts.find(
    (d) => d.Name === values.district
  );
  const wards = selectedDistrictData ? selectedDistrictData.Wards : [];

  return (
    <GridContainer numCol={2} gap={1.5} elClass={elClass}>
      {/* City/Province */}
      <SelectInput
        value={values.city} // Use Formik state
        onChangeFunc={(e) => {
          setFieldValue("city", e.target.value); // Update Formik state
          setFieldValue("district", ""); // Reset dependent fields
          setFieldValue("ward", "");
        }}
        options={address}
        placeholder="City/Province"
        name="city"
      />

      {/* District */}
      <SelectInput
        value={values.district}
        onChangeFunc={(e) => {
          setFieldValue("district", e.target.value);
          setFieldValue("ward", "");
        }}
        options={districts}
        disabled={!values.city}
        placeholder="District"
        name="district"
      />

      {/* Ward */}
      <SelectInput
        value={values.ward}
        onChangeFunc={(e) => setFieldValue("ward", e.target.value)}
        options={wards}
        disabled={!values.district}
        placeholder="Ward"
        name="ward"
      />

      {/* Specific Address */}
      <InputField
        field={{
          id: "specificAddress",
          label: "Specific Address",
          name: "specificAddress",
        }}
      />
    </GridContainer>
  );
};

export default LocationForm;
