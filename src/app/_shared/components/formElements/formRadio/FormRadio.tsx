import cn from "classnames";

import { RadioProps } from "@/types/form";

import styles from "./form-radio.module.scss";
import CheckIcon from "@images/main/check.svg";

const FormRadio = ({ field, form, children, withIcon }: RadioProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      form.setFieldValue(field.name, field.value);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="radio"
        {...field}
        id={`${field.name}-${field.value}`}
        className={styles.input}
        checked={form.values[field.name] === field.value}
        onChange={handleChange}
        value={field.value}
      />
      <label htmlFor={`${field.name}-${field.value}`} className={cn(styles.label, { [styles.withIcon]: withIcon })}>
        {withIcon ? (
          <>
            <div className={styles.block}></div>
            {children}
          </>
        ) : (
          <>
            <div className={styles.block}>{field.value === field.value && <CheckIcon />}</div>
            {children}
          </>
        )}
      </label>
    </div>
  );
};

export default FormRadio;
