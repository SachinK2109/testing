import { IconBrandSafari } from "@tabler/icons-react";
import { Radio, Checkbox, Select } from "antd";
import { useState } from "react";

const radioOptions = [
  { label: "In stock", value: "available" },
  { label: "Out of stock", value: "unavailable" },
];

const RadioComponent = () => {
  const [RadioValues, setRadioValues] = useState("available");

  const onChange = (e) => {
    setRadioValues(e.target.value);
  };

  return (
    <Radio.Group
      options={radioOptions}
      value={RadioValues}
      onChange={onChange}
    />
  );
};

const checkboxOptions = [
  { label: "Newest First", value: "new" },
  { label: "Featured", value: "featured" },
  { label: "Name Ascending", value: "name-ascending" },
  { label: "Name Descending", value: "name-descending" },
  { label: "Price Ascending", value: "price-ascending" },
  { label: "Price Descending", value: "price-descending" },
];

const CheckboxGroupComponent = () => {
  const [checkedValues, setCheckedValues] = useState([]);

  const onChange = (checkedValues) => {
    setCheckedValues(checkedValues);
  };

  return (
    <Checkbox.Group
      options={checkboxOptions}
      value={checkedValues}
      onChange={onChange}
    />
  );
};

const selectOptions = [
  {
    label: "Pringles",
    value: "pringles",
  },
  {
    label: "Cheetos",
    value: "Cheetos",
  },
  {
    label: "Pepsi",
    value: "pepsi",
  },
  {
    label: "Lays",
    value: "lays",
  },
];

const SelectGroupComponent = () => {
  return (
    <Select
      mode="multiple"
      allowClear
      style={{
        width: "100%",
      }}
      placeholder="Please select"
      // onChange={handleChange}
      options={selectOptions}
    />
  );
};

export const getItems = [
  {
    key: "1",
    label: "Brands",
    children: <SelectGroupComponent />,
  },
  {
    key: "2",
    label: "Availability",
    children: <RadioComponent />,
  },
  {
    key: "3",
    label: "Filters",
    children: <CheckboxGroupComponent />,
  },
];
