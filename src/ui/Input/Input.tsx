"use client";

import { useRef, useEffect } from "react";

import cn from "classnames";
import styles from "./Input.module.scss";

export default function Input({
  name,
  value,
  className = "",
  onChange,
  onBlur,
  placeholder,
  isTextArea,
  error,
  touched,
  showErrorText = true,
}: {
  name: string;
  value: string;
  className?: string;
  onChange: (e: React.ChangeEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  placeholder: string;
  isTextArea: boolean;
  error?: string | undefined;
  touched?: boolean | undefined;
  showErrorText?: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "59px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return isTextArea ? (
    <div className={styles["input-block"]}>
      <textarea
        name={name}
        ref={textareaRef}
        className={cn(styles.input, styles["input--textarea"], className, {
          [styles["input--active"]]: value,
          [styles["input--error"]]: touched && error,
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      {touched && error && showErrorText && (
        <p className="error-message">{error}</p>
      )}
    </div>
  ) : (
    <div className={styles["input-block"]}>
      <input
        name={name}
        type="text"
        className={cn(styles.input, className, {
          [styles["input--active"]]: value,
          [styles["input--error"]]: touched && error,
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      {touched && error && showErrorText && (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
}
