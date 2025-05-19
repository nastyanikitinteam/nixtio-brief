import { useFormikContext } from "formik";

import Wrapper from "../../../components/Wrapper/Wrapper";
import Toggler from "@/ui/Toggler/Toggler";
import Checkbox from "@/ui/Checkbox/Checkbox";
import Input from "@/ui/Input/Input";

import {
  getItems,
  baseServices,
} from "@/app/product/config/components/backend.config";

import type { Form } from "@/app/product/interfaces/Form";

import styles from "./Backend.module.scss";

export default function Backend() {
  const {
    values: { product_details, frontend, backend },
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext<Form["initialValues"]>();

  return frontend.need_frontend !== "No, we don't" ? (
    <Wrapper title="Back—End" label="2 min left">
      <div className={styles["block-1"]}>
        <h3>Does the company need back-end development?</h3>

        <Toggler
          name="backend.need_backend"
          option={backend.need_backend}
          setOption={setFieldValue}
          setOptionTouched={setFieldTouched}
          defaultOptions={["Yes, we do", "No, we don't"]}
          error={errors.backend?.need_backend}
          touched={touched.backend?.need_backend}
        />

        {touched.backend?.need_backend && errors.backend?.need_backend && (
          <p className="error-message">{errors.backend?.need_backend}</p>
        )}
      </div>

      {backend.need_backend === "Yes, we do" &&
        (() => {
          {
            const items = getItems(product_details.website_types);

            const slicedItems = frontend.is_react
              ? items.slice(1, items.length)
              : items;

            return slicedItems.map((item) => {
              const key = item.key as keyof typeof backend;

              return (
                <div key={key} className={styles["block-2"]}>
                  <h3>{item.title}</h3>

                  <div className={styles.options}>
                    {item.options.map((option) => (
                      <div key={option} className={styles.option}>
                        <Checkbox
                          slug={option}
                          checked={
                            key === "CMS"
                              ? typeof backend.CMS === "object"
                                ? backend.CMS.type
                                : backend.CMS
                              : key === "SEO_settings"
                                ? backend.SEO_settings
                                : backend.security_settings
                          }
                          innerText={option}
                          size="lg"
                          variant={2}
                          onClick={async () => {
                            if (key === "CMS" && option === "Other") {
                              await setFieldValue(
                                "backend.CMS",
                                typeof backend.CMS === "object" &&
                                  backend.CMS.type === "Other"
                                  ? ""
                                  : { type: "Other", value: "" }
                              );
                            } else {
                              await setFieldValue(
                                `backend.${key}`,
                                backend[key] === option ? "" : option
                              );
                            }

                            setFieldTouched(`backend.${key}`, true);
                          }}
                          error={
                            typeof errors.backend?.[key] === "string"
                              ? errors.backend?.[key]
                              : undefined
                          }
                          touched={touched.backend?.[key]}
                        />
                      </div>
                    ))}

                    {touched.backend?.[key] &&
                      errors.backend?.[key] &&
                      (key !== "CMS" ||
                        typeof errors.backend?.CMS === "string") && (
                        <p className="error-message">
                          {errors.backend?.[key] as string}
                        </p>
                      )}
                  </div>

                  {key === "CMS" &&
                    typeof backend.CMS === "object" &&
                    backend.CMS.type.includes("Other") && (
                      <Input
                        name="backend.CMS.value"
                        value={backend.CMS.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Your option"
                        isTextArea={false}
                        error={
                          typeof errors.backend?.CMS === "object"
                            ? (errors.backend.CMS as { value: string }).value
                            : ""
                        }
                        touched={
                          typeof touched.backend?.CMS === "object"
                            ? (touched.backend.CMS as { value: boolean }).value
                            : false
                        }
                      />
                    )}

                  {key === "SEO_settings" && (
                    <div className={styles["block-3"]}>
                      <h3>Do you need integration with external services?</h3>

                      <div className={styles.services}>
                        {(() => {
                          const services = [...baseServices];

                          if (
                            product_details.website_types.includes("E-commerce")
                          ) {
                            const insertions = [
                              { index: 2, item: "Shipping" },
                              { index: 4, item: "E-marketing platforms" },
                            ];

                            insertions.forEach(({ index, item }) => {
                              services.splice(index, 0, item);
                            });
                          }

                          return services.map((service) => (
                            <Checkbox
                              key={service}
                              slug={service}
                              checked={backend.external_services}
                              innerText={service}
                              size="lg"
                              variant={1}
                              onClick={async () => {
                                if (
                                  ["Other", "I don't know"].includes(service)
                                ) {
                                  setFieldValue(
                                    "backend.external_services_other",
                                    ""
                                  );
                                  setFieldTouched(
                                    "backend.external_services_other",
                                    false
                                  );
                                }

                                if (service === "I don't know") {
                                  await setFieldValue(
                                    "backend.external_services",
                                    !Array.isArray(backend.external_services)
                                      ? []
                                      : "I don't know"
                                  );
                                } else {
                                  const currentServices = Array.isArray(
                                    backend.external_services
                                  )
                                    ? backend.external_services
                                    : [];

                                  const filteredServices =
                                    currentServices.filter(
                                      (service) => service !== "I don't know"
                                    );

                                  await setFieldValue(
                                    "backend.external_services",
                                    filteredServices.includes(service)
                                      ? filteredServices.filter(
                                          (s) => s !== service
                                        )
                                      : [...filteredServices, service]
                                  );
                                }

                                setFieldTouched(
                                  "backend.external_services",
                                  true
                                );
                              }}
                              error={
                                typeof errors.backend?.external_services ===
                                "string"
                                  ? errors.backend?.external_services
                                  : undefined
                              }
                              touched={touched.backend?.external_services}
                            />
                          ));
                        })()}

                        {typeof errors.backend?.external_services ===
                          "string" &&
                          touched.backend?.external_services &&
                          errors.backend?.external_services && (
                            <p className="error-message">
                              {errors.backend?.external_services}
                            </p>
                          )}
                      </div>

                      {backend.external_services.includes("Other") && (
                        <Input
                          name="backend.external_services_other"
                          value={backend.external_services_other}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Your option"
                          isTextArea={false}
                          error={errors.backend?.external_services_other}
                          touched={touched.backend?.external_services_other}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            });
          }
        })()}
    </Wrapper>
  ) : null;
}
