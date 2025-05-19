import { get } from "lodash";

import toast from "react-hot-toast";

import type { FormikErrors, FormikTouched } from "formik";
import type { LottieOptions } from "lottie-react";
import type { InputList } from "@/interfaces/InputList";
import type { Form as ProductForm } from "@/app/product/interfaces/Form";
import type { BrandingForm } from "@/app/branding/interfaces/BrandingForm";

export function changeAnimationColor(
  data: LottieOptions["animationData"],
  newColor: number[]
): LottieOptions["animationData"] {
  const targetColor = [0.068759202957, 0.068759202957, 0.068759202957, 1];

  if (Array.isArray(data)) {
    return data.map((item) => changeAnimationColor(item, newColor));
  } else if (typeof data === "object" && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (
          key === "k" &&
          JSON.stringify(value) === JSON.stringify(targetColor)
        ) {
          return [key, newColor];
        }
        return [key, changeAnimationColor(value, newColor)];
      })
    );
  }
  return data;
}

export function getFilteredItems<T extends Record<string, string>>(
  items: T[],
  key: keyof T
): T[] {
  return items
    .filter((item) => item[key])
    .map((item) => ({
      ...item,
      [key]: item[key].trim(),
    }));
}

export function getFilteredInputList(list: InputList[]) {
  return list
    .filter((item) => item.name_or_url)
    .map((item) => ({
      name_or_url: item.name_or_url.trim(),
      likes_dislikes: item.likes_dislikes.trim(),
    }));
}

export function renderError(
  errors:
    | FormikErrors<ProductForm["initialValues"]>
    | FormikErrors<BrandingForm["initialValues"]>,
  touched:
    | FormikTouched<ProductForm["initialValues"]>
    | FormikTouched<BrandingForm["initialValues"]>,
  path: string
) {
  const error = get(errors, path);
  const isTouched = get(touched, path);

  return isTouched && error ? <p className="error-message">{error}</p> : null;
}

export function showErrorToast() {
  toast.error("You have blank fields", {
    className: "custom-toast",
    icon: (
      <svg width="24" height="24">
        <use fill="white" xlinkHref="sprite.svg#error" />
      </svg>
    ),
  });
}
