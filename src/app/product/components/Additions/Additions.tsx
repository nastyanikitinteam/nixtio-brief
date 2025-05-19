import { useFormikContext } from "formik";

import Wrapper from "../../../components/Wrapper/Wrapper";
import Checkbox from "@/ui/Checkbox/Checkbox";
import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";

import { showErrorToast } from "@/lib/helpers";

import type { Form } from "@/app/product/interfaces/Form";

import styles from "./Additions.module.scss";

export default function Additions({ isLoading }: { isLoading: boolean }) {
  const {
    values: { additions },
    submitForm,
    validateForm,
    handleChange,
    setFieldValue,
    setFieldTouched,
    setTouched,
    errors,
    touched,
  } = useFormikContext<Form["initialValues"]>();

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
    <Wrapper title="Additions" label="<1 min left">
      <div className={styles["block-1"]}>
        <h3>Project budget (USD)</h3>

        <div className={styles.options}>
          {["< 3k", "3-5k", "5-10k", "10-20k", "20-30k", "> 30k"].map(
            (option) => (
              <Checkbox
                key={option}
                slug={option}
                checked={additions.budget}
                innerText={option}
                size="lg"
                variant={2}
                onClick={async () => {
                  await setFieldValue(
                    "additions.budget",
                    additions.budget === option ? "" : option
                  );

                  setFieldTouched("additions.budget", true);
                }}
                error={errors.additions?.budget}
                touched={touched.additions?.budget}
              />
            )
          )}

          {touched.additions?.budget && errors.additions?.budget && (
            <p className="error-message">{errors.additions.budget}</p>
          )}
        </div>
      </div>

      <div className={styles["block-2"]}>
        <h3>Any additional requirements?</h3>

        <Input
          name="additions.requirements"
          value={additions.requirements}
          onChange={handleChange}
          placeholder="Add here (optional)"
          isTextArea={true}
        />
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
