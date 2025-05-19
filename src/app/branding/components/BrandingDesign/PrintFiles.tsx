import { useFormikContext } from "formik";

import Toggler from "@/ui/Toggler/Toggler";
import Input from "@/ui/Input/Input";

import { printInputs } from "../../config/components/brandingDesign.config";
import { renderError } from "@/lib/helpers";

import type { BrandingForm as Form } from "@/app/branding/interfaces/BrandingForm";

import styles from "./BrandingDesign.module.scss";

export default function PrintFiles() {
  const {
    values: { branding_design },
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext<Form["initialValues"]>();

  return (
    <>
      {["Business cards", "White paper", "Write your option"].some((option) =>
        branding_design.branding_options.includes(option)
      ) && (
        <div className={styles["block-3"]}>
          <h3>Does the company need print files?</h3>

          <Toggler
            name="branding_design.need_print_files"
            option={branding_design.need_print_files}
            setOption={setFieldValue}
            setOptionTouched={setFieldTouched}
            defaultOptions={["Yes, we do", "No, we don't"]}
            error={errors.branding_design?.need_print_files}
            touched={touched.branding_design?.need_print_files}
          />

          {renderError(errors, touched, "branding_design.need_print_files")}

          {branding_design.need_print_files === "Yes, we do" && (
            <div className={styles.inputs}>
              {printInputs.map((title, i) => {
                const keys: (keyof typeof branding_design)[] = [
                  "printing_requirements",
                  "print_shop_info",
                  "add_requirements",
                ];

                return (
                  <div key={keys[i]}>
                    <h3>{title}</h3>

                    <Input
                      name={`branding_design.${keys[i]}`}
                      value={branding_design[keys[i]] as string}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={`Add here ${i ? "(optional)" : ""}`}
                      isTextArea={true}
                      error={
                        i !== 8
                          ? (errors.branding_design?.[keys[i]] as string)
                          : ""
                      }
                      touched={
                        i !== 8
                          ? (touched.branding_design?.[keys[i]] as boolean)
                          : false
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
