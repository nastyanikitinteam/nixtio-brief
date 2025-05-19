import { useFormikContext } from "formik";

import Wrapper from "@/app/components/Wrapper/Wrapper";
import Tooltip from "@/ui/Tooltip/Tooltip";
import Input from "@/ui/Input/Input";

import { inputs } from "../../config/components/companyDetails.config";

import type { Form } from "@/app/branding/interfaces/BrandingForm";

import styles from "./CompanyDetails.module.scss";

export default function CompanyDetails() {
  const {
    values: { company_details },
    handleChange,
    handleBlur,
    errors,
    touched,
  } = useFormikContext<Form["initialValues"]>();

  return (
    <Wrapper title="Company Details" label="10 min left">
      <div className={styles["block-1"]}>
        {["Your name", "Your email"].map((placeholder, index) => {
          const initialValue = index === 0 ? "name" : "email";

          return (
            <Input
              key={placeholder}
              name={`company_details.${initialValue}`}
              value={company_details[initialValue]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              isTextArea={false}
              error={errors.company_details?.[initialValue]}
              touched={touched.company_details?.[initialValue]}
            />
          );
        })}
      </div>

      <div className={styles["block-2"]}>
        {inputs.map((input, i) => {
          const keys: (keyof typeof company_details)[] = [
            "company_name",
            "product_description",
            "tagline_mission_statement",
            "company_positioning",
            "previous_design",
          ];

          return (
            <div key={keys[i]}>
              <h3>
                {input.title}
                {i === 2 && (
                  <Tooltip
                    className={styles["tooltip-width"]}
                    content={
                      <p>
                        Examples:
                        <br /> - tagline/slogan: See what&apos;s next. (Netflix)
                        <br /> - mission statement: To create a world where
                        anyone can belong anywhere. (Airbnb)
                      </p>
                    }
                  />
                )}
              </h3>

              <Input
                name={`company_details.${keys[i]}`}
                value={company_details[keys[i]]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={input.placeholder}
                isTextArea={i >= 1 ? true : false}
                error={i <= 1 ? errors.company_details?.[keys[i]] : ""}
                touched={i <= 1 ? touched.company_details?.[keys[i]] : false}
              />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}
