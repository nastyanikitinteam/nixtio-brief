import React from "react";
import Slider from "rc-slider";
import type { FormRangeSliderProps } from "@/types/form";

import styles from "./form-range-slider.module.scss";
// import "rc-slider/assets/index.css";
import "./styles.scss";

const FormRangeSlider = ({ min, max, step, value, onChange, label }: FormRangeSliderProps) => {
  const handleChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      onChange(value as [number, number]);
    }
  };

  const markers = {
    [min]: `${min}`,
    [Math.round((min + max) / 3)]: `${Math.round((min + max) / 3)}`,
    [Math.round((2 * (min + max)) / 3)]: `${Math.round((2 * (min + max)) / 3)}`,
    [max]: `${max}`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <label className={styles.label}>{label}</label>
        <p className={styles.value}>
          {value[0]} - {value[1]}
        </p>
      </div>
      <Slider
        range
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        marks={markers}
        dotStyle={{ borderColor: "#1890ff" }}
        activeDotStyle={{ borderColor: "#52c41a" }}
      />
    </div>
  );
};

export default FormRangeSlider;
