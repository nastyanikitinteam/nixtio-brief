import { Fragment } from "react";

import { useFormikContext, type FormikErrors } from "formik";
import type { Form as ProductForm } from "@/app/product/interfaces/Form";
import type { BrandingForm } from "@/app/branding/interfaces/BrandingForm";

import cn from "classnames";
import styles from "./Toggler.module.scss";

export default function Toggler({
  name,
  option,
  setOption,
  setOptionTouched,
  defaultOptions,
  error,
  touched,
}: {
  name: string;
  option: string;
  setOption: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => Promise<
    | void
    | FormikErrors<ProductForm["initialValues"]>
    | FormikErrors<BrandingForm["initialValues"]>
  >;
  setOptionTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => Promise<
    | void
    | FormikErrors<ProductForm["initialValues"]>
    | FormikErrors<BrandingForm["initialValues"]>
  >;
  defaultOptions: string[];
  error: string | undefined;
  touched: boolean | undefined;
}) {
  const { setFieldValue, setFieldTouched } =
    useFormikContext<ProductForm["initialValues"]>();

  const resetFields = () => {
    if (name === "frontend.need_frontend" && option !== "Yes, we do") {
      [
        "is_react",
        "specific_requests",
        "languages",
        "need_animation",
        "animation",
        "requirements",
      ].forEach((key) => {
        setFieldValue(
          `frontend.${key}`,
          key === "is_react" ? false : key === "languages" ? [] : ""
        );

        if (!["is_react", "specific_requests", "requirements"].includes(key)) {
          setFieldTouched(`frontend.${key}`, false);
        }
      });
    }

    if (
      (name === "backend.need_backend" && option !== "Yes, we do") ||
      (name === "frontend.need_frontend" && option === "No, we don't")
    ) {
      ["CMS", "SEO_settings", "external_services", "security_settings"].forEach(
        (key) => {
          setFieldValue(
            `backend.${key}`,
            key === "external_services" ? [] : ""
          );
          setFieldTouched(`backend.${key}`, false);
        }
      );
    }

    if (name === "branding_design.need_branding_design") {
      setFieldValue("branding_design.branding_options", []);
      setFieldTouched("branding_design.branding_options", false);
    }

    if (name === "branding_design.need_print_files") {
      setFieldValue("branding_design.printing_requirements", "");
      setFieldTouched("branding_design.printing_requirements", false);
    }
  };

  return (
    <div className={styles.toggler}>
      {defaultOptions.map((opt, index) => (
        <Fragment key={opt}>
          <button
            className={cn(styles.btn, {
              [styles["btn--active"]]: opt === option,
              [styles["btn--error"]]: touched && error,
            })}
            type="button"
            onClick={async () => {
              resetFields();
              await setOption(name, opt);
              setOptionTouched(name, true);
            }}
          >
            <p className="p2">{opt}</p>
            {opt === option && (
              <svg width="24" height="24">
                <use fill="white" xlinkHref={`sprite.svg#check-v1`} />
              </svg>
            )}
          </button>

          {index === 0 && (
            <div
              className={cn(styles.separator, {
                [styles["separator--active"]]: !option,
              })}
              onClick={() => {
                resetFields();
                setOption(name, "");
              }}
            >
              <svg width="24" height="24">
                <use
                  fill={!option ? "white" : "#696F77"}
                  xlinkHref={`sprite.svg#slash`}
                />
              </svg>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
