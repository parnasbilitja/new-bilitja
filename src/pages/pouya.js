import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "../../styles/newTour/Reserve.module.scss";
function Pouya() {
  const { register, control, handleSubmit } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "test",
  });

  return <div className={styles["shimmer"]}>sd</div>;
}
export default Pouya;
