import { useState } from "react";

export const useForm = (initValue) => {
  const [value, setValue] = useState(initValue);

  return [
    value,
    (e) => {
      setValue({
        ...value,
        [e.target.name]: e.target.value,
      });
    },
    (field) => {
      setValue({
        ...value,
        ...field,
      });
    },
  ];
};

export const useCustomStateHook = (initValue) => {
  const [value, setValue] = useState(initValue);

  return [
    value,
    (field) => {
      setValue({
        ...value,
        ...field,
      });
    },
  ];
};
