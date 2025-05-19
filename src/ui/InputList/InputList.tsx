"use client";

import { ReactNode, CSSProperties } from "react";

import get from "lodash/get";

import { useFormikContext } from "formik";

import Input from "../Input/Input";
import Button from "../Button/Button";

import type { Form as ProductForm } from "@/app/product/interfaces/Form";
import type { BrandingForm } from "@/app/branding/interfaces/BrandingForm";
import type { InputList } from "@/interfaces/InputList";

import cn from "classnames";
import styles from "./InputList.module.scss";

export default function InputList({
  title,
  style,
  gap,
  name,
  value,
  multipleString,
  isContent = false,
  placeholders,
  isTextArea = false,
  btnText,
}: {
  title: ReactNode;
  style?: CSSProperties;
  gap: "lg" | "sm";
  name: string;
  value: string[] | InputList[] | { page: string; description: string }[];
  multipleString: boolean;
  isContent?: boolean;
  placeholders: string[];
  isTextArea?: boolean;
  btnText: string;
}) {
  const { handleChange, handleBlur, setFieldValue, errors, touched } =
    useFormikContext<
      ProductForm["initialValues"] & BrandingForm["initialValues"]
    >();

  return (
    <div className={styles["input-list"]}>
      {title}

      <div
        className={cn(styles["input-block"], {
          [styles["input-block-gap-lg"]]: gap === "lg",
          [styles["input-block-gap-sm"]]: gap === "sm",
        })}
        style={style}
      >
        {value.map((_, index) => (
          <div
            key={`${name}[${index}]`}
            className={cn({
              [styles.multiple]: multipleString,
            })}
          >
            <div className={styles["input-close-group"]}>
              <Input
                name={
                  multipleString
                    ? `${name}[${index}].name_or_url`
                    : isContent
                      ? `${name}[${index}].description`
                      : `${name}[${index}]`
                }
                value={
                  multipleString
                    ? (value[index] as InputList)?.name_or_url
                    : isContent
                      ? (value[index] as { page: string; description: string })
                          .description
                      : (value[index] as string)
                }
                className={index > 0 ? styles["input-close"] : undefined}
                onChange={(e) => {
                  handleChange(e);
                  if (isContent) {
                    setFieldValue(`${name}[${index}].page`, `${index + 1}`);
                  }
                }}
                onBlur={handleBlur}
                placeholder={`${index + 1}. ${placeholders[0] || ""}`}
                isTextArea={isTextArea}
                error={
                  !multipleString
                    ? Array.isArray(get(errors, name))
                      ? get(errors, name).join(", ")
                      : get(errors, name)
                    : ""
                }
                touched={!multipleString ? get(touched, name) : false}
                showErrorText={index === value.length - 1}
              />

              {index > 0 && (
                <div
                  className={styles["close-icon"]}
                  onClick={() => {
                    const updatedValues = [...value];
                    updatedValues.splice(index, 1);
                    setFieldValue(name, updatedValues);
                  }}
                >
                  <svg width="14" height="14">
                    <use xlinkHref="sprite.svg#close" />
                  </svg>
                </div>
              )}
            </div>

            {multipleString && (
              <Input
                name={`${name}[${index}].likes_dislikes`}
                value={(value[index] as InputList)?.likes_dislikes || ""}
                onChange={handleChange}
                placeholder={placeholders[1]}
                isTextArea={true}
              />
            )}
          </div>
        ))}
      </div>

      {value.length < 10 && (
        <Button
          type="button"
          text={btnText}
          onClick={() =>
            setFieldValue(name, [
              ...value,
              multipleString
                ? { name_or_url: "", likes_dislikes: "" }
                : isContent
                  ? { page: "", description: "" }
                  : "",
            ])
          }
        />
      )}
    </div>
  );
}
