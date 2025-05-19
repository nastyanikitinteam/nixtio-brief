"use client";

import { useFormikContext } from "formik";

import Wrapper from "@/app/components/Wrapper/Wrapper";
import Toggler from "@/ui/Toggler/Toggler";
import Checkbox from "@/ui/Checkbox/Checkbox";
import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import PrintFiles from "./PrintFiles";

import { get } from "lodash";

import {
  options,
  optionKeysMap,
  socialMedia,
} from "../../config/components/brandingDesign.config";
import { renderError } from "@/lib/helpers";
import { showErrorToast } from "@/lib/helpers";

import type { BrandingForm as Form } from "@/app/branding/interfaces/BrandingForm";

import cn from "classnames";
import styles from "./BrandingDesign.module.scss";

export default function BrandingDesign({ isLoading }: { isLoading: boolean }) {
  const {
    values: { branding_design },
    submitForm,
    validateForm,
    handleChange,
    handleBlur,
    setFieldValue,
    setTouched,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext<Form["initialValues"]>();

  const isErrorObject = (path: string) => {
    const error = get(errors, path);
    return typeof error === "object";
  };

  type Option =
    | "Business cards"
    | "Cover for social media"
    | "White paper"
    | "Presentation"
    | "Pitch deck"
    | "Write your option";

  const remove = (option: Option) => {
    if (optionKeysMap[option]) {
      setFieldValue(`branding_design.${optionKeysMap[option]}`, "");

      if (option === "Business cards" || option === "Write your option") {
        setFieldTouched(`branding_design.${optionKeysMap[option]}`, false);
      }

      if (option === "Cover for social media") {
        setFieldValue("branding_design.social_media", []);
        setFieldTouched("branding_design.social_media", false);
      }
    }

    if (
      ["Business cards", "White paper", "Write your option"].every(
        (option) => !branding_design.branding_options.includes(option)
      )
    ) {
      setFieldValue("branding_design.need_print_files", "");
      setFieldTouched("branding_design.need_print_files", false);
    }
  };

  type NestedObject<T> = {
    [key: string]: T | NestedObject<T>;
  };

  const markAllFieldsTouched = <T extends object>(
    obj: NestedObject<T>
  ): NestedObject<T> => {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] =
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
          ? markAllFieldsTouched(obj[key] as NestedObject<T>)
          : obj[key];
      return acc;
    }, {} as NestedObject<T>);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formikErrors = await validateForm();

    if (Object.keys(formikErrors).length > 0) {
      showErrorToast();
      setTouched(markAllFieldsTouched(formikErrors));
    } else {
      submitForm();
    }
  };

  return (
    <Wrapper title="Branding Design" label="3 min left">
      <div className={styles.blocks}>
        <div className={styles["block-1"]}>
          <h3>Does the company need branded materials?</h3>

          <Toggler
            name="branding_design.need_branding_design"
            option={branding_design.need_branding_design}
            setOption={setFieldValue}
            setOptionTouched={setFieldTouched}
            defaultOptions={["Yes, we do", "No, we don't"]}
            error={errors.branding_design?.need_branding_design}
            touched={touched.branding_design?.need_branding_design}
          />

          {renderError(errors, touched, "branding_design.need_branding_design")}
        </div>

        {branding_design.need_branding_design === "Yes, we do" && (
          <div className={styles["block-2"]}>
            <h3>Select which option you prefer</h3>

            <div className={styles.options}>
              {options.map((option, i) => {
                const isOwnOption = option.text === "Write your option";

                const isChecked = branding_design.branding_options.includes(
                  option.text
                );

                const keys: (keyof typeof branding_design)[] = [
                  "business_cards",
                  "social_media_cover",
                  "white_paper",
                  "presentation",
                  "pitch_deck",
                  "write_your_option",
                ];

                return (
                  <div
                    key={option.text}
                    className={cn(styles.option, {
                      [styles["option--checked"]]: !isOwnOption && isChecked,
                    })}
                  >
                    <Checkbox
                      slug={option.text}
                      checked={branding_design.branding_options}
                      innerText={option.text}
                      size="lg"
                      variant={1}
                      onClick={async () => {
                        remove(option.text as Option);
                        await setFieldValue(
                          "branding_design.branding_options",
                          branding_design.branding_options.includes(option.text)
                            ? branding_design.branding_options.filter(
                                (text) => text !== option.text
                              )
                            : [...branding_design.branding_options, option.text]
                        );

                        setFieldTouched(
                          "branding_design.branding_options",
                          true
                        );
                      }}
                      error={errors.branding_design?.branding_options}
                      touched={touched.branding_design?.branding_options}
                    />

                    {isChecked && (
                      <Input
                        name={`branding_design.${keys[i]}`}
                        value={branding_design[keys[i]] as string}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={option.placeholder}
                        isTextArea={!isOwnOption}
                        error={errors.branding_design?.[keys[i]] as string}
                        touched={touched.branding_design?.[keys[i]] as boolean}
                      />
                    )}

                    {branding_design.branding_options.includes(
                      "Cover for social media"
                    ) &&
                      option.text === "Cover for social media" && (
                        <>
                          <div className={styles["social-media"]}>
                            {socialMedia.map((app) => (
                              <Checkbox
                                key={app}
                                slug={app}
                                checked={branding_design.social_media}
                                innerText={app}
                                size="lg"
                                variant={1}
                                onClick={async () => {
                                  if (app === "Other") {
                                    setFieldValue(
                                      "branding_design.social_media_other",
                                      ""
                                    );
                                    setFieldTouched(
                                      "branding_design.social_media_other",
                                      false
                                    );
                                  }

                                  await setFieldValue(
                                    "branding_design.social_media",
                                    branding_design.social_media.includes(app)
                                      ? branding_design.social_media.filter(
                                          (media) => media !== app
                                        )
                                      : [...branding_design.social_media, app]
                                  );

                                  setFieldTouched(
                                    "branding_design.social_media",
                                    true
                                  );
                                }}
                                error={errors.branding_design?.social_media}
                                touched={touched.branding_design?.social_media}
                              />
                            ))}

                            {!isErrorObject("branding_design.social_media") &&
                              renderError(
                                errors,
                                touched,
                                "branding_design.social_media"
                              )}
                          </div>

                          {branding_design.social_media.includes("Other") && (
                            <Input
                              name="branding_design.social_media_other"
                              value={branding_design.social_media_other}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Write here"
                              isTextArea={false}
                              error={errors.branding_design?.social_media_other}
                              touched={
                                touched.branding_design?.social_media_other
                              }
                            />
                          )}
                        </>
                      )}
                  </div>
                );
              })}

              {!isErrorObject("branding_design.branding_options") &&
                renderError(
                  errors,
                  touched,
                  "branding_design.branding_options"
                )}
            </div>

            <PrintFiles />
          </div>
        )}
      </div>

      <div className={styles.btn}>
        <Button
          className={styles.custom}
          type="submit"
          text="Send"
          isLoading={isLoading}
          onClick={(e) => handleSubmit(e)}
        />
      </div>
    </Wrapper>
  );
}
