"use client";
import { useState, useEffect } from "react";
import styles from "./form-input.module.scss";
import cn from "classnames";

import { InputProps } from "@/types/form";

const FormInput = ({ field, form, placeholder, type }: InputProps) => {
  const [isErrored, setIsErrored] = useState<boolean>(false);

  useEffect(() => {
    setIsErrored(form.touched[field.name] && form.errors[field.name]);
  }, [form.errors, form.touched, field.name]);

  return (
    <div className={cn(styles.container)}>
      <input
        className={cn(styles.input, { [styles.error]: isErrored }, { [styles.filled]: field.value && !isErrored })}
        {...field}
        type={type}
        placeholder={placeholder}
        id={field.name}
      />
      {isErrored && <p className={styles.errortext}>{form.errors[field.name]}</p>}
    </div>
  );
};

export default FormInput;
