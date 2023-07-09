import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

function Pouya() {
  const { register, control, handleSubmit } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "test",
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <input {...register(`test.${index}.firstName`)} />
            <input {...register(`test.${index}.lastName`)} />
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => append({ firstName: "bill", lastName: "luo" })}
      >
        append
      </button>
      <input type="submit" />
    </form>
  );
}
export default Pouya;
