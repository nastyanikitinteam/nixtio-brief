import ReactSlider from "rc-slider";

import "rc-slider/assets/index.css";
import "./Slider.scss";

export default function Slider({
  title,
  titleValue,
  isRange,
  defaultValue,
  marks,
  value,
  onChange,
}: {
  title: string;
  titleValue: string;
  isRange: boolean;
  defaultValue: number[];
  marks: Record<number, string>;
  value: number | number[];
  onChange: (dots: number | number[]) => void;
}) {
  return (
    <div className="slider-wrapper">
      <div className="top-block">
        <h3>{title}</h3>
        <h3>{titleValue}</h3>
      </div>

      <ReactSlider
        range={isRange}
        allowCross={false}
        defaultValue={defaultValue}
        min={defaultValue[0]}
        max={defaultValue[1]}
        marks={marks}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
