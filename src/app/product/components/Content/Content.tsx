"use client";

import { useFormikContext } from "formik";

import Wrapper from "../../../components/Wrapper/Wrapper";
import Checkbox from "@/ui/Checkbox/Checkbox";
import InputFile from "@/ui/InputFile/InputFile";
import InputList from "@/ui/InputList/InputList";

import type { Form } from "@/app/product/interfaces/Form";

import styles from "./Content.module.scss";

export default function Content() {
  const {
    values: { product_details, content },
    handleBlur,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext<Form["initialValues"]>();

  return (
    <Wrapper title="Content" label="4 min left">
      <div className={styles["block-1"]}>
        <h3>
          {product_details.website_mode.includes("Website redesign")
            ? "Should we leave the structure and the content the same as in the existing website?"
            : "Do you have content?"}
        </h3>

        <div className={styles.options}>
          {(product_details.website_mode.includes("Website redesign")
            ? ["Leave the same", "I have new structure"]
            : ["Yes, we have", "No, we don't"]
          ).map((option) => (
            <div key={option} className={styles.option}>
              <Checkbox
                slug={option}
                checked={content.is_content}
                innerText={option}
                size="lg"
                variant={2}
                onClick={async () => {
                  if (
                    ["", "No, we don't", "Leave the same"].includes(
                      content.is_content
                    )
                  ) {
                    setFieldValue("content.content_url", "");
                    setFieldValue("content.content_pages", [""]);
                  }

                  await setFieldValue(
                    "content.is_content",
                    content.is_content === option ? "" : option
                  );
                  setFieldTouched("content.is_content", true);
                }}
                error={errors.content?.is_content}
                touched={touched.content?.is_content}
              />
            </div>
          ))}
        </div>

        {content.is_content.includes("No, we don't") && (
          <p>
            We&apos;ll use content from competitors or similar sites by changing
            the text via GPT chat.
          </p>
        )}

        {touched.content?.is_content && errors.content?.is_content && (
          <p className="error-message">{errors.content?.is_content}</p>
        )}
      </div>

      {(content.is_content.includes("I have new structure") ||
        content.is_content.includes("Yes, we have")) && (
        <div className={styles["block-2"]}>
          <InputFile
            title="Add a document with your content"
            name="content.content_url"
            value={content.content_url}
            onBlur={handleBlur}
          />

          <InputList
            title={
              <h3>
                Name these pages and give a brief description{" "}
                <span>(optional)</span>
              </h3>
            }
            style={{ marginTop: 50 }}
            gap="sm"
            name="content.content_pages"
            value={content.content_pages}
            multipleString={false}
            isContent={true}
            placeholders={[]}
            isTextArea={true}
            btnText="Add more"
          />
        </div>
      )}
    </Wrapper>
  );
}
