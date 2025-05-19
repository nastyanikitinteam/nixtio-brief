import styles from "./Label.module.scss";

export default function Label({ text }: { text: string }) {
  return (
    <div className={styles.label}>
      <p>{text}</p>
    </div>
  );
}
