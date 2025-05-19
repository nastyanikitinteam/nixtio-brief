import { useFormikContext } from "formik";

import Input from "../Input/Input";

import type { Form } from "@/app/product/interfaces/Form";

import styles from "./InputFile.module.scss";

const InputFile = ({
  title,
  name,
  value,
  onBlur,
  error,
  touched,
}: {
  title: string;
  name: string;
  value: string;
  onBlur: (e: React.FocusEvent) => void;
  error?: string | undefined;
  touched?: boolean | undefined;
}) => {
  const { handleChange } = useFormikContext<Form["initialValues"]>();

  return (
    <div className={styles.wrapper}>
      <h3>{title}</h3>

      <Input
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={`URL link ${error || touched ? "" : "(optional)"}`}
        isTextArea={false}
        error={error}
        touched={touched}
      />
    </div>
  );
};

export default InputFile;
