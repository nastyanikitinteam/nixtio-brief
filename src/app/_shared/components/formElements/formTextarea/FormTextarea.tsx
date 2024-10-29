"use client";
import { useState, useEffect } from "react";
import styles from "./form-textarea.module.scss";
import cn from "classnames";

import { TextareaProps } from "@/types/form";

const FormTextarea = ({ field, form, placeholder, rows }: TextareaProps) => {
  const [isErrored, setIsErrored] = useState<boolean>(false);

  useEffect(() => {
    setIsErrored(form.touched[field.name] && form.errors[field.name]);
  }, [form.errors, form.touched, field.name]);

  return (
    <div className={cn(styles.container)}>
      <textarea
        className={cn(styles.input, { [styles.error]: isErrored }, { [styles.filled]: field.value && !isErrored })}
        {...field}
        placeholder={placeholder}
        id={field.name}
        rows={rows}
      />
      {isErrored && <p className={styles.errortext}>{form.errors[field.name]}</p>}
    </div>
  );
};

export default FormTextarea;
