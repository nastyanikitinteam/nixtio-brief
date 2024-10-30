"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./form-textarea.module.scss";
import cn from "classnames";

import { TextareaProps } from "@/types/form";

const FormTextarea = ({ field, form, placeholder, rows = 1 }: TextareaProps) => {
  const [isErrored, setIsErrored] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setIsErrored(form.touched[field.name] && form.errors[field.name]);
  }, [form.errors, form.touched, field.name]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight(); // Початковий виклик
  }, [field.value]);

  return (
    <div className={cn(styles.container)}>
      <textarea
        ref={textareaRef}
        className={cn(styles.input, { [styles.error]: isErrored }, { [styles.filled]: field.value && !isErrored })}
        {...field}
        placeholder={placeholder}
        rows={rows}
        id={field.name}
        onInput={adjustTextareaHeight}
      />
      {isErrored && <p className={styles.errortext}>{form.errors[field.name]}</p>}
    </div>
  );
};

export default FormTextarea;
