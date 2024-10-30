import styles from "./page.module.scss";

import Brief from "@components/brief/Brief";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <Brief />
      </main>
    </div>
  );
}
