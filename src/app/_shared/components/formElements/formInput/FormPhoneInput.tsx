"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./form-input.module.scss";
import cn from "classnames";

import { PhoneInputProps } from "@/types/form";

const FormPhoneInput = ({ field, form, placeholder, type }: PhoneInputProps) => {
  const [isErrored, setIsErrored] = useState<boolean>(false);

  useEffect(() => {
    setIsErrored(form.touched[field.name] && form.errors[field.name]);
  }, [form.errors, form.touched, field.name]);

  const checkNumberInput = useCallback((event: any) => {
    const PHONE_REGEX = /^[0-9\+]+$/;
    const allowedKeys = ["Enter", "Tab", "Delete", "Backspace", "Shift", "+", "v", "c", "a"];
    if (!PHONE_REGEX.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }, []);

  return (
    <div className={styles.container}>
      <input
        onKeyDown={checkNumberInput}
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

export default FormPhoneInput;
