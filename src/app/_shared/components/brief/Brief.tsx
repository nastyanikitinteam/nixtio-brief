import cn from "classnames";

import BriefForm from "@components/briefForm/BriefForm";

import styles from "./brief.module.scss";

const Brief = () => {
  return (
    <section className={styles.section}>
      <div className="wrapper">
        <div className={styles.main}>
          <h4 className={cn("title-h4", styles.subtitle)}>Brief</h4>
          <h1 className={cn("title-h1", styles.title)}>Product requirement document</h1>
          <p className={styles.description}>
            For us to start your project, we need minimal information from you. By the way, answering the questions below will give you a better
            understanding of your project
          </p>
        </div>
        <div className={styles.form}>
          <BriefForm />
        </div>
      </div>
    </section>
  );
};

export default Brief;
