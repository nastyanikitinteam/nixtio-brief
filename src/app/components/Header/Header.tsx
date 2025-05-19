import Link from "next/link";

import styles from "./Header.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <svg width="50" height="50">
          <use fill="black" xlinkHref="sprite.svg#logo" />
        </svg>
      </Link>
    </div>
  );
}
