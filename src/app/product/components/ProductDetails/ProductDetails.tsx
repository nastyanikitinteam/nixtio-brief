import { useFormikContext } from "formik";

import Wrapper from "../../../components/Wrapper/Wrapper";
import Input from "@/ui/Input/Input";
import Card from "@/ui/Card/Card";
import Checkbox from "@/ui/Checkbox/Checkbox";
import Slider from "@/ui/Slider/Slider";
import InputList from "@/ui/InputList/InputList";

import {
  cards,
  types,
} from "@/app/product/config/components/productDetails.config";

import type { Form } from "@/app/product/interfaces/Form";

import styles from "./ProductDetails.module.scss";

export default function ProductDetails() {
  const {
    values: { product_details },
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext<Form["initialValues"]>();

  const isIncludedECom = product_details.website_types.includes("E-commerce");

  return (
    <Wrapper title="Product Details" label="10 min left">
      <div className={styles["block-1"]}>
        <div className={styles.inputs}>
          {["Your name", "Your email"].map((placeholder, index) => {
            const initialValue = index === 0 ? "name" : "email";

            return (
              <Input
                key={placeholder}
                name={`product_details.${initialValue}`}
                value={product_details[initialValue]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                isTextArea={false}
                error={errors.product_details?.[initialValue]}
                touched={touched.product_details?.[initialValue]}
              />
            );
          })}
        </div>

        <Input
          name="product_details.product_name"
          value={product_details.product_name}
          onChange={handleChange}
          placeholder="Name of the product (optional)"
          isTextArea={false}
        />

        <div className={styles["block-2"]}>
          <div className={styles.cards}>
            {cards.map((card) => (
              <Card
                key={card.text}
                name="product_details.website_mode"
                value={product_details.website_mode}
                variant={2}
                isMultiple={false}
                error={errors.product_details?.website_mode}
                touched={touched.product_details?.website_mode}
                {...card}
              />
            ))}
          </div>

          {touched.product_details?.website_mode &&
            errors.product_details?.website_mode && (
              <p className="error-message">
                {errors.product_details.website_mode}
              </p>
            )}
        </div>

        {product_details.website_mode.includes("Website redesign") && (
          <Input
            name="product_details.current_version_url"
            value={product_details.current_version_url}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="URL link to the current version of the site"
            isTextArea={false}
            error={errors.product_details?.current_version_url}
            touched={touched.product_details?.current_version_url}
          />
        )}
      </div>

      <div className={styles["block-3"]}>
        <h3>Website type</h3>

        <div className={styles.types}>
          {types.map((type) => (
            <Checkbox
              key={type}
              slug={type}
              checked={product_details.website_types}
              innerText={type}
              size="lg"
              variant={1}
              onClick={async () => {
                if (!product_details.website_types.includes("Other")) {
                  setFieldValue("product_details.website_types_other", "");
                  setFieldTouched("product_details.website_types_other", false);
                }

                if (!product_details.website_types.includes("E-commerce")) {
                  ["product_variations", "3D_model"].forEach((key) => {
                    setFieldValue(`product_details.${key}`, "");
                    setFieldTouched(`product_details.${key}`, false);
                  });
                }

                await setFieldValue(
                  "product_details.website_types",
                  product_details.website_types.includes(type)
                    ? product_details.website_types.filter((t) => t !== type)
                    : [...product_details.website_types, type]
                );
                setFieldTouched("product_details.website_types", true);
              }}
              error={errors.product_details?.website_types}
              touched={touched.product_details?.website_types}
            />
          ))}

          {touched.product_details?.website_types &&
            errors.product_details?.website_types && (
              <p className="error-message">
                {errors.product_details?.website_types}
              </p>
            )}
        </div>

        {product_details.website_types.includes("Other") && (
          <Input
            name="product_details.website_types_other"
            value={product_details.website_types_other}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your option"
            isTextArea={false}
            error={errors.product_details?.website_types_other}
            touched={touched.product_details?.website_types_other}
          />
        )}

        <Input
          name="product_details.product_description"
          value={product_details.product_description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="A short and general description about the product"
          isTextArea={true}
          error={errors.product_details?.product_description}
          touched={touched.product_details?.product_description}
        />
      </div>

      <div className={styles["block-4"]}>
        {(() => {
          const titles = [
            "What problems does your product solve for a potential customer/user?",
            "What is the product/category?",
          ];

          const slicedTitles = isIncludedECom ? titles : titles.slice(0, 1);

          return slicedTitles.map((title, index) => {
            const initialValue =
              index === 0 ? "product_problems" : "product_category";

            return (
              <div key={title}>
                <h3>{title}</h3>
                <Input
                  name={`product_details.${initialValue}`}
                  value={product_details[initialValue]}
                  onChange={handleChange}
                  placeholder="Write here (optional)"
                  isTextArea={true}
                />
              </div>
            );
          });
        })()}

        {isIncludedECom &&
          [
            product_details.website_mode.includes("Website redesign")
              ? "Does there be product variations (size, color)?"
              : "Will there be product variations (size, color)?",
            "Do you need a 3D model of the product?",
          ].map((title, index) => {
            const initialValue =
              index === 0 ? "product_variations" : "3D_model";

            return (
              <div key={title}>
                <h3>{title}</h3>

                <div className={styles.options}>
                  {["Yes", "No"].map((option) => (
                    <div key={option} className={styles.option}>
                      <Checkbox
                        slug={option}
                        checked={product_details[initialValue]}
                        innerText={option}
                        size="lg"
                        variant={2}
                        onClick={async () => {
                          await setFieldValue(
                            `product_details.${initialValue}`,
                            product_details[initialValue] === option
                              ? ""
                              : option
                          );
                          setFieldTouched(
                            `product_details.${initialValue}`,
                            true
                          );
                        }}
                        error={errors.product_details?.[initialValue]}
                        touched={touched.product_details?.[initialValue]}
                      />
                    </div>
                  ))}

                  {touched.product_details?.[initialValue] &&
                    errors.product_details?.[initialValue] && (
                      <p className="error-message">
                        {errors.product_details?.[initialValue]}
                      </p>
                    )}
                </div>
              </div>
            );
          })}
      </div>

      <div className={styles["block-5"]}>
        <h2>Target Audience</h2>

        <Input
          name="product_details.target_audience"
          value={product_details.target_audience}
          onChange={handleChange}
          placeholder="Briefly describe the target audience (optional)"
          isTextArea={true}
        />

        <Slider
          title="Age"
          titleValue={`${product_details.audience_age[0]}-${product_details.audience_age[1]}`}
          isRange={true}
          defaultValue={[0, 70]}
          marks={{
            0: "0",
            25: "25",
            50: "50",
            70: "70",
          }}
          value={product_details.audience_age}
          onChange={(step) =>
            setFieldValue("product_details.audience_age", step)
          }
        />

        {isIncludedECom && (
          <div>
            <h3>What is the target geographical market for product sales?</h3>

            <Input
              name="product_details.target_geographical_market"
              value={product_details.target_geographical_market}
              onChange={handleChange}
              placeholder="Write here (optional)"
              isTextArea={true}
            />
          </div>
        )}
      </div>

      <div className={styles["block-6"]}>
        <InputList
          title={<h2>Competitors</h2>}
          style={{ marginTop: 50 }}
          gap="lg"
          name="product_details.competitors"
          value={product_details.competitors}
          multipleString={true}
          placeholders={[
            "Name/URL link",
            "What do you like and don't like here?",
          ]}
          btnText="Add more competitor"
        />
      </div>
    </Wrapper>
  );
}
