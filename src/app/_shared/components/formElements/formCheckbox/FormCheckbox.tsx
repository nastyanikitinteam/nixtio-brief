import { CheckboxProps } from "@/types/form";
import styles from "./form-checkbox.module.scss";
import cn from "classnames";
import CheckIcon from "@images/main/check.svg";

const FormCheckbox = ({ field, form, children }: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    const currentValues = form.values[field.name] || [];

    // Додаємо або видаляємо значення з масиву
    if (checked) {
      form.setFieldValue(field.name, [...currentValues, value]);
    } else {
      form.setFieldValue(
        field.name,
        currentValues.filter((item: string) => item !== value)
      );
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id={`${field.name}-${field.value}`}
        className={styles.input}
        checked={form.values[field.name]?.includes(field.value)}
        onChange={handleChange}
        value={field.value}
      />
      <label htmlFor={`${field.name}-${field.value}`} className={styles.label}>
        <div className={styles.block}>{form.values[field.name]?.includes(field.value) && <CheckIcon />}</div>
        {children}
      </label>
    </div>
  );
};

export default FormCheckbox;
