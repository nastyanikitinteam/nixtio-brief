import styles from "./page.module.scss";

import BriefForm from "@components/briefForm/BriefForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <section className={styles.section}>
          <div className="wrapper">
            <h1>Next.js</h1>
            <BriefForm />
          </div>
        </section>
      </main>
    </div>
  );
}
