"use client";

import { useState } from "react";

import type { FormikErrors, FormikTouched } from "formik";

import cn from "classnames";
import styles from "./Checkbox.module.scss";

export default function Checkbox({
  slug,
  checked,
  innerText,
  size,
  variant,
  onClick,
  error,
  touched,
}: {
  slug?: string;
  checked?: string | string[];
  innerText?: string;
  size: string;
  variant: number;
  onClick?: () => void;
  error?:
    | string
    | string[]
    | FormikErrors<string[] | { type: string; value: string }>
    | undefined;
  touched?:
    | boolean
    | FormikTouched<string[] | { type: string; value: string }>
    | undefined;
}) {
  const [isChecked, setIsChecked] = useState(false);
  const dimension = variant === 1 ? 24 : size === "lg" ? 10 : 6;

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.wrapper} onClick={onClick ?? handleCheck}>
      <div
        className={cn(styles.checkbox, {
          [styles["checkbox--lg"]]: size === "lg",
          [styles["checkbox--sm"]]: size === "sm",
          [styles["checkbox--checked"]]:
            checked && slug
              ? Array.isArray(checked)
                ? checked.includes(slug)
                : checked === slug
              : isChecked,
          [styles["checkbox--error"]]: touched && error,
        })}
      >
        <svg width={dimension} height={dimension}>
          <use fill="white" xlinkHref={`sprite.svg#check-v${variant}`} />
        </svg>
      </div>

      {innerText && <p className={styles["inner-text"]}>{innerText}</p>}
    </div>
  );
}
