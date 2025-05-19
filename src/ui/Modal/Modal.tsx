"use client";

import { useRef, useState, useCallback, useEffect } from "react";

import { useRouter } from "next/navigation";

import animationModalv1 from "@/lottie/modal-v1.json";
import animationModalv2 from "@/lottie/modal-v2.json";

import Button from "../Button/Button";

import cn from "classnames";
import styles from "./Modal.module.scss";

export default function Modal({
  isBranding,
  setIsModalOpen,
}: {
  isBranding: boolean;
  setIsModalOpen: (value: boolean) => void;
}) {
  const router = useRouter();

  const animationRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLottie = useCallback(async () => {
    if (!animationRef.current) return;

    const lot = await import("lottie-web");

    lot.default.loadAnimation({
      autoplay: true,
      loop: true,
      animationData: isBranding ? animationModalv1 : animationModalv2,
      container: animationRef.current,
    });
  }, [isBranding]);

  useEffect(() => {
    getLottie();
  }, [getLottie]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles["animated-icon"]} ref={animationRef}></div>

        <div
          className={cn(styles.content, {
            [styles["content-v1"]]: isBranding,
            [styles["content-v2"]]: !isBranding,
          })}
        >
          <p className={`p2 ${styles.subtitle}`}>
            {isBranding
              ? "Request has been sent"
              : "Product brief successfully sent"}
          </p>

          <h2 className={styles.title}>
            {isBranding
              ? `We will contact \n you within 24h`
              : "Fill out one more brief for branding?"}
          </h2>
        </div>

        {isBranding ? (
          <Button
            className={styles.btn}
            type="button"
            text="Ok"
            onClick={() => setIsModalOpen(false)}
          />
        ) : (
          <div className={styles["btns-block"]}>
            {["Later", "Yep"].map((text) => (
              <Button
                key={text}
                className={cn(styles.btn, {
                  [styles["btn-v2"]]: !isBranding,
                  [styles["btn--link"]]: text === "Later",
                })}
                type="button"
                text={text}
                isLoading={text === "Yep" && isLoading}
                onClick={() => {
                  if (text === "Yep") {
                    setIsLoading(true);
                    router.push("/branding");
                  } else {
                    setIsModalOpen(false);
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
