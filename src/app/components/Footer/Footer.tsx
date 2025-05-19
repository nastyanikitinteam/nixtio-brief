import Link from "next/link";

import { socialMedia } from "@/app/config/footer.config";

import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.icons}>
          {socialMedia.map((icon) => (
            <Link key={icon.id} href={icon.link}>
              <svg width={icon.size[0]} height={icon.size[1]}>
                <use fill="white" xlinkHref={`sprite.svg#${icon.id}`} />
              </svg>
            </Link>
          ))}
        </div>

        <div className={styles.info}>
          <p>©2010—2025 Nixtio. All rights reserved</p>

          <Link href="https://maksim.nikitinteam.com/nixtio/privacy/">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
