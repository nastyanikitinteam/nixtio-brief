import { useState } from "react";

import { useFormikContext } from "formik";

import Wrapper from "../../../components/Wrapper/Wrapper";
import Toggler from "@/ui/Toggler/Toggler";
import Switch from "@/ui/Switch/Switch";
import Input from "@/ui/Input/Input";
import Checkbox from "@/ui/Checkbox/Checkbox";
import Skeleton from "react-loading-skeleton";

import { languages } from "@/app/product/config/components/frontend.config";

import type { Form } from "@/app/product/interfaces/Form";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "./Frontend.module.scss";

export default function Frontend() {
  const {
    values: { frontend },
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext<Form["initialValues"]>();

  const [isLoading, setIsLoading] = useState(true);

  return (
    <Wrapper title="Front—End" label="3 min left">
      <div className={styles["block-1"]}>
        <h3>Does the company need front-end development?</h3>

        <Toggler
          name="frontend.need_frontend"
          option={frontend.need_frontend}
          setOption={setFieldValue}
          setOptionTouched={setFieldTouched}
          defaultOptions={["Yes, we do", "No, we don't"]}
          error={errors.frontend?.need_frontend}
          touched={touched.frontend?.need_frontend}
        />

        {touched.frontend?.need_frontend && errors.frontend?.need_frontend && (
          <p className="error-message">{errors.frontend.need_frontend}</p>
        )}
      </div>

      {frontend.need_frontend === "Yes, we do" && (
        <div className={styles["block-wrapper"]}>
          <div className={styles["block-2"]}>
            <h3>
              Basically, we use the following technologies
              <p className={`${styles.subtitle} p2`}>
                HTML, CSS, JavaScript, jQuery / <br />
                Gulp (Build tool) / GSAP, WOW, AOS (Animations)
              </p>
            </h3>

            <Switch
              name="frontend.is_react"
              checked={frontend.is_react}
              handleChange={(e) => {
                handleChange(e);
                setFieldValue("backend.CMS", "");
              }}
              innerText="I need React"
            />

            <Input
              name="frontend.specific_requests"
              value={frontend.specific_requests}
              onChange={handleChange}
              placeholder="Write down if you have a specific requests (optional)"
              isTextArea={true}
            />
          </div>

          <div className={styles["block-3"]}>
            <h3>What language is your product in?</h3>

            <div className={styles.languages}>
              {languages.map((language) => (
                <Checkbox
                  key={language}
                  slug={language}
                  checked={frontend.languages}
                  innerText={language}
                  size="lg"
                  variant={1}
                  onClick={async () => {
                    if (language === "Other") {
                      setFieldValue("frontend.other_language", "");
                      setFieldTouched("frontend.other_language", false);
                    }

                    await setFieldValue(
                      "frontend.languages",
                      frontend.languages.includes(language)
                        ? frontend.languages.filter((lan) => lan !== language)
                        : [...frontend.languages, language]
                    );

                    setFieldTouched("frontend.languages", true);
                  }}
                  error={errors.frontend?.languages}
                  touched={touched.frontend?.languages}
                />
              ))}

              {typeof errors.frontend?.languages === "string" &&
                touched.frontend?.languages &&
                errors.frontend.languages && (
                  <p className="error-message">{errors.frontend.languages}</p>
                )}
            </div>

            {frontend.languages.includes("Other") && (
              <Input
                name="frontend.other_language"
                value={frontend.other_language}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Write down the required languages"
                isTextArea={false}
                error={errors.frontend?.other_language}
                touched={touched.frontend?.other_language}
              />
            )}
          </div>

          <div className={styles["block-4"]}>
            <h3>Does the site need animation?</h3>

            <div className={styles.options}>
              {["Yes", "No"].map((option) => (
                <div key={option} className={styles.option}>
                  <Checkbox
                    slug={option}
                    checked={frontend.need_animation}
                    innerText={option}
                    size="lg"
                    variant={2}
                    onClick={async () => {
                      const newOption =
                        frontend.need_animation === option ? "" : option;

                      if (["No", ""].includes(frontend.need_animation)) {
                        setFieldValue("frontend.animation", "");
                        setFieldTouched("frontend.animation", false);
                        setIsLoading(true);
                      }

                      await setFieldValue("frontend.need_animation", newOption);
                      setFieldTouched("frontend.need_animation", true);
                    }}
                    error={errors.frontend?.need_animation}
                    touched={touched.frontend?.need_animation}
                  />
                </div>
              ))}

              {touched.frontend?.need_animation &&
                errors.frontend?.need_animation && (
                  <p className="error-message">
                    {errors.frontend?.need_animation}
                  </p>
                )}
            </div>

            {frontend.need_animation.includes("Yes") && (
              <div className={styles.animations}>
                <h3>How complex is the animation needed?</h3>

                <div className={styles.examples}>
                  {[
                    "Slightly animated site",
                    "More animated website",
                    "Very animated website (+ discussion on the call)",
                  ].map((animation, i) => (
                    <div key={animation} className={styles.example}>
                      <Checkbox
                        slug={animation}
                        checked={frontend.animation}
                        innerText={animation}
                        size="lg"
                        variant={2}
                        onClick={async () => {
                          await setFieldValue(
                            "frontend.animation",
                            frontend.animation === animation ? "" : animation
                          );

                          setFieldTouched("frontend.animation", true);
                        }}
                        error={errors.frontend?.animation}
                        touched={touched.frontend?.animation}
                      />

                      {isLoading && (
                        <Skeleton
                          style={{ aspectRatio: "16 / 12" }}
                          borderRadius={0}
                        />
                      )}

                      <video
                        style={{
                          width: "100%",
                          height: "auto",
                          display: isLoading ? "none" : "block",
                        }}
                        loop
                        autoPlay
                        muted
                        preload="auto"
                        playsInline
                        onCanPlay={() => setIsLoading(false)}
                      >
                        <source
                          src={`/video/0${i + 1}_Example.mp4`}
                          type="video/mp4"
                        />
                        This animation is currently unavailable
                      </video>
                    </div>
                  ))}

                  {touched.frontend?.animation &&
                    errors.frontend?.animation && (
                      <p className="error-message">
                        {errors.frontend?.animation}
                      </p>
                    )}
                </div>
              </div>
            )}
          </div>

          <div className={styles["block-5"]}>
            <h3>Any additional requirements?</h3>

            <Input
              name="frontend.requirements"
              value={frontend.requirements}
              onChange={handleChange}
              placeholder="Add here (optional)"
              isTextArea={true}
            />
          </div>
        </div>
      )}
    </Wrapper>
  );
}
