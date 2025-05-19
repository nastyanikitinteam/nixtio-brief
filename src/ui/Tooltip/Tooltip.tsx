"use client";

import { ReactNode } from "react";

import Tippy from "@tippyjs/react";

import "tippy.js/dist/tippy.css";
import "./Tooltip.scss";

export default function Tooltip({
  className = "",
  content,
}: {
  className?: string;
  content: ReactNode;
}) {
  return (
    <Tippy
      className={`${className} tooltip`}
      content={content}
      placement="top"
      popperOptions={{
        modifiers: [
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
              padding: 30,
            },
          },
        ],
      }}
      interactive
    >
      <div className="tooltip-icon">
        <svg width="24" height="24">
          <use fill="black" xlinkHref={"sprite.svg#info"} />
        </svg>
      </div>
    </Tippy>
  );
}
