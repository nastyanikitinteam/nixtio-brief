import styles from "./header.module.scss";

import Logo from "@images/main/logo.svg";

const Header = () => {
  return (
    <header className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Header;
