import { useFormikContext } from "formik";

import Wrapper from "@/app/components/Wrapper/Wrapper";
import Tooltip from "@/ui/Tooltip/Tooltip";
import Input from "@/ui/Input/Input";

import { inputs } from "../../config/components/targetAudience.config";

import type { BrandingForm as Form } from "@/app/branding/interfaces/BrandingForm";

import styles from "./TargetAudience.module.scss";

export default function TargetAudience() {
  const {
    values: { target_audience },
    handleChange,
    handleBlur,
    errors,
    touched,
  } = useFormikContext<Form["initialValues"]>();

  return (
    <Wrapper title="Target Audience" label="6 min left">
      <div className={styles["block-1"]}>
        {inputs.map((input, i) => {
          const keys: (keyof typeof target_audience)[] = [
            "target_audience",
            "customer_need",
            "user_journey",
            "product_insights",
          ];

          return (
            <div key={keys[i]}>
              <h3>
                {input.title}
                {i === 0 && (
                  <Tooltip
                    className={styles["tooltip-width"]}
                    content={
                      <p>
                        Describe them according to the following parameters or
                        in free form:
                        <br /> - demographics: gender, age, marital status,
                        religion, other;
                        <br /> - sociography: social status, education,
                        occupation, monthly income, other
                      </p>
                    }
                  />
                )}
              </h3>

              <Input
                name={`target_audience.${keys[i]}`}
                value={target_audience[keys[i]]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={input.placeholder}
                isTextArea={true}
                error={errors.target_audience?.[keys[i]]}
                touched={touched.target_audience?.[keys[i]]}
              />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}
