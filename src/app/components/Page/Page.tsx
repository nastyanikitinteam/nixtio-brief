import styles from "./Page.module.scss";

export default function Page({
  title,
  description,
  Form,
}: {
  title: string;
  description: string;
  Form: React.ComponentType;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles["top-block"]}>
        <p className={`p2 ${styles.subtitle}`}>Brief</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <Form />
    </div>
  );
}
