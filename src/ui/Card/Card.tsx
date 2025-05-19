import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

import { useFormikContext } from "formik";

import Checkbox from "../Checkbox/Checkbox";

import gsap from "gsap";

import { changeAnimationColor } from "@/lib/helpers";

import type { AnimationItem } from "lottie-web";
import type { LottieOptions } from "lottie-react";
import type { Form } from "@/app/product/interfaces/Form";

import cn from "classnames";
import styles from "./Card.module.scss";

export default function Card({
  animationData,
  img,
  name,
  value,
  text,
  additionalText,
  variant,
  isMultiple,
  error,
  touched,
}: {
  animationData?: LottieOptions["animationData"];
  img?: string;
  name: string;
  value: string | string[];
  text: string;
  additionalText?: string;
  variant: number;
  isMultiple: boolean;
  error?: string[] | string | undefined;
  touched?: boolean | undefined;
}) {
  const { setFieldValue, setFieldTouched } =
    useFormikContext<Form["initialValues"]>();

  const animationRef = useRef<HTMLDivElement | null>(null);
  const animationInstance = useRef<AnimationItem | null>(null);
  const colorRef = useRef<number[]>([0.412, 0.435, 0.467, 1]);

  const [isHovered, setIsHovered] = useState(false);

  const isChecked =
    !isMultiple && typeof value === "string"
      ? value === text
      : value.includes(text);

  const getLottie = useCallback(
    async (color: number[]) => {
      if (!animationRef.current) return;

      const lot = await import("lottie-web");

      if (animationInstance.current) {
        animationInstance.current.destroy();
      }

      animationInstance.current = lot.default.loadAnimation({
        autoplay: isHovered,
        loop: true,
        animationData: changeAnimationColor(animationData, color),
        container: animationRef.current,
      });
    },
    [isHovered, animationData]
  );

  useEffect(() => {
    if (isChecked) return;

    const targetColor = isHovered ? [0, 0, 0, 1] : [0.412, 0.435, 0.467, 1];

    gsap.to(colorRef.current, {
      duration: 0.3,
      ease: "easeInOut",
      onUpdate: () => {
        getLottie(colorRef.current);
      },
      ...Object.fromEntries(targetColor.map((value, index) => [index, value])),
    });
  }, [isChecked, isHovered, getLottie]);

  return (
    <div
      className={cn(styles.card, {
        [styles["card-img"]]: img,
        [styles["card--checked"]]: isChecked,
        [styles["card--error"]]: touched && error,
      })}
      onClick={async () => {
        if (name.includes("product_details")) {
          Object.entries({
            "product_details.current_version_url": ["New website", ""],
            "content.is_content": ["New website", "Website redesign", ""],
          }).forEach(([field, conditions]) => {
            if (conditions.includes(value as string)) {
              setFieldValue(field, "");
              if (field.includes("product_details")) {
                setFieldTouched(field, false);
              }
            }
          });
        }

        await setFieldValue(
          name,
          !isMultiple && typeof value === "string"
            ? value === text
              ? ""
              : text
            : value.includes(text)
              ? (value as string[]).filter((cardText) => cardText !== text)
              : [...value, text]
        );

        setFieldTouched(name, true);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.checkbox}>
        <Checkbox slug={text} checked={value} size="sm" variant={variant} />
      </div>

      {img ? (
        <div className={styles["img-container"]}>
          <Image width={130} height={85} src={img} alt="logo example" />
        </div>
      ) : (
        <div className={styles["animated-icon"]} ref={animationRef}></div>
      )}

      <p
        className={cn({
          [styles["p-smaller"]]: img,
        })}
      >
        <span
          className={cn({
            [styles["add-text"]]: additionalText,
          })}
        >
          {text}
        </span>
        <span className={styles.subtitle}>
          {additionalText && `\n${additionalText}`}
        </span>
      </p>
    </div>
  );
}
