import styles from "./brief.module.scss";
import BriefForm from "@components/briefForm/BriefForm";

const Brief = () => {
  return (
    <section className={styles.section}>
      <div className="wrapper">
        <BriefForm />
      </div>
    </section>
  );
};

export default Brief;
