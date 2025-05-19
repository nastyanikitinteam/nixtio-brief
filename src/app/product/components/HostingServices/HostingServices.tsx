import { useFormikContext } from "formik";

import Wrapper from "../../../components/Wrapper/Wrapper";
import Checkbox from "@/ui/Checkbox/Checkbox";
import Input from "@/ui/Input/Input";

import type { Form } from "@/app/product/interfaces/Form";

import styles from "./HostingServices.module.scss";

export default function HostingServices() {
  const {
    values: { hosting_services },
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext<Form["initialValues"]>();

  return (
    <Wrapper title={`Hosting\nServices`} label="<1 min left">
      <div className={styles["block-1"]}>
        {[
          {
            title: "Do you have a purchased domain?",
            options: ["Yes", "No"],
          },
          {
            title: "Access to the hosting/FTP/DB",
            options: ["Yes", "No access"],
          },
        ].map((item, index) => {
          const keys: (keyof typeof hosting_services)[] = ["domain", "access"];

          return (
            <div key={item.title} className={styles["block-2"]}>
              <h3>{item.title}</h3>

              <div className={styles.options}>
                {item.options.map((option) => (
                  <div key={option} className={styles.option}>
                    <Checkbox
                      slug={option}
                      checked={
                        index === 0
                          ? hosting_services.domain
                          : typeof hosting_services.access === "object"
                            ? hosting_services.access.type
                            : hosting_services.access
                      }
                      innerText={option}
                      size="lg"
                      variant={2}
                      onClick={async () => {
                        if (index === 1 && option === "Yes") {
                          await setFieldValue(
                            "hosting_services.access",
                            typeof hosting_services.access === "object" &&
                              hosting_services.access.type === "Yes"
                              ? ""
                              : { type: "Yes", value: "" }
                          );
                        } else {
                          await setFieldValue(
                            `hosting_services.${keys[index]}`,
                            hosting_services[keys[index]] === option
                              ? ""
                              : option
                          );
                        }

                        setFieldTouched(
                          `hosting_services.${keys[index]}`,
                          true
                        );
                      }}
                      error={
                        typeof errors.hosting_services?.[keys[index]] ===
                        "string"
                          ? errors.hosting_services?.[keys[index]]
                          : undefined
                      }
                      touched={touched.hosting_services?.[keys[index]]}
                    />
                  </div>
                ))}

                {touched.hosting_services?.[keys[index]] &&
                  errors.hosting_services?.[keys[index]] &&
                  (keys[index] !== "access" ||
                    typeof errors.hosting_services?.access === "string") && (
                    <p className="error-message">
                      {errors.hosting_services?.[keys[index]] as string}
                    </p>
                  )}
              </div>

              {index === 1 &&
                typeof hosting_services.access === "object" &&
                hosting_services.access.type.includes("Yes") && (
                  <Input
                    name="hosting_services.access.value"
                    value={hosting_services.access.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Field for entering access data"
                    isTextArea={true}
                    error={
                      typeof errors.hosting_services?.access === "object"
                        ? (errors.hosting_services?.access as { value: string })
                            .value
                        : ""
                    }
                    touched={
                      typeof touched.hosting_services?.access === "object"
                        ? (
                            touched.hosting_services?.access as {
                              value: boolean;
                            }
                          ).value
                        : false
                    }
                  />
                )}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}
