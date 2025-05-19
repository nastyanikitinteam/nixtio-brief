import styles from "./Switch.module.scss";

export default function Switch({
  name,
  checked,
  handleChange,
  innerText,
}: {
  name: string;
  checked: boolean;
  handleChange: (e: React.ChangeEvent) => void;
  innerText?: string;
}) {
  return (
    <div className={styles["switch-block"]}>
      <input
        className={styles.switch}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />

      {innerText && <p className={`${styles["inner-text"]} p2`}>{innerText}</p>}
    </div>
  );
}
