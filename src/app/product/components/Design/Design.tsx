import Image from "next/image";
import Link from "next/link";

import { useFormikContext } from "formik";

import Wrapper from "../../../components/Wrapper/Wrapper";
import Card from "@/ui/Card/Card";
import Checkbox from "@/ui/Checkbox/Checkbox";
import InputFile from "@/ui/InputFile/InputFile";
import Input from "@/ui/Input/Input";
import InputList from "@/ui/InputList/InputList";
import Tooltip from "@/ui/Tooltip/Tooltip";

import { cards } from "@/app/product/config/components/design.config";

import type { Form } from "@/app/product/interfaces/Form";

import styles from "./Design.module.scss";

export default function Design() {
  const {
    values: { product_details, design },
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext<Form["initialValues"]>();

  return (
    <Wrapper title="Design" label="6 min left">
      <div className={styles["block-1"]}>
        <h3>What screen resolutions should we do for the website design?</h3>

        <div className={styles.cards}>
          {cards.map((card) => (
            <Card
              key={card.text}
              name="design.screen_resolutions"
              value={design.screen_resolutions}
              variant={1}
              isMultiple={true}
              error={errors.design?.screen_resolutions}
              touched={touched.design?.screen_resolutions}
              {...card}
            />
          ))}
        </div>

        {touched.design?.screen_resolutions &&
          errors.design?.screen_resolutions && (
            <p className="error-message">{errors.design.screen_resolutions}</p>
          )}
      </div>

      <div className={styles["block-2"]}>
        <h3>Does the company have branding?</h3>

        <div className={styles.options}>
          {["Yes, we have", "No, we don't"].map((option) => (
            <div key={option} className={styles.option}>
              <Checkbox
                slug={option}
                checked={design.branding}
                innerText={option}
                size="lg"
                variant={2}
                onClick={async () => {
                  if (["No, we don't", ""].includes(design.branding)) {
                    setFieldValue("design.branding_url", "");
                    setFieldTouched("design.branding_url", false);
                  }

                  await setFieldValue(
                    "design.branding",
                    design.branding === option ? "" : option
                  );
                  setFieldTouched("design.branding", true);
                }}
                error={errors.design?.branding}
                touched={touched.design?.branding}
              />
            </div>
          ))}
        </div>

        {touched.design?.branding && errors.design?.branding && (
          <p className="error-message">{errors.design?.branding}</p>
        )}
      </div>

      {design.branding.includes("Yes, we have") && (
        <InputFile
          title="Add a document with your branding"
          name="design.branding_url"
          value={design.branding_url}
          onBlur={handleBlur}
          error={errors.design?.branding_url}
          touched={touched.design?.branding_url}
        />
      )}

      {!product_details.website_types.includes("Other") && (
        <div className={styles.references}>
          <h2>Style references</h2>

          <div className={styles.examples}>
            {[
              "/images/reference-example-01.png",
              "/images/reference-example-02.png",
              "/images/reference-example-03.png",
            ].map((image, index) => (
              <div key={image} className={styles.example}>
                <h3>{`Style example #${index + 1}`}</h3>

                <Image
                  width={570}
                  height={426}
                  src={image}
                  alt="reference example"
                />

                <Input
                  name={`design.style_references[${index}].likes_dislikes`}
                  value={design.style_references[index]?.likes_dislikes}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue(
                      `design.style_references[${index}].style_example`,
                      image
                    );
                  }}
                  placeholder="What do you like and don't like here? (optional)"
                  isTextArea={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles["input-list"]}>
        <InputList
          title={
            <h3>
              If you have sites or apps that you like, please add a link to it
              <Tooltip
                className={styles["tooltip-width"]}
                content={
                  <p>
                    If you don&apos;t have examples, look at{" "}
                    <Link
                      href="https://nixtio.com/cases/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      our portfolio
                    </Link>
                  </p>
                }
              />
            </h3>
          }
          style={{ marginTop: 20 }}
          gap="lg"
          name="design.own_style_references"
          value={design.own_style_references}
          multipleString={true}
          placeholders={[
            "Name/URL link",
            "What do you like and don't like here?",
          ]}
          btnText="Add example"
        />
      </div>
    </Wrapper>
  );
}
