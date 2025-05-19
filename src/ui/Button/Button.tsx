import { ClipLoader } from "react-spinners";

import styles from "./Button.module.scss";

export default function Button({
  className = "",
  type,
  text,
  isLoading = false,
  onClick,
}: {
  className?: string;
  type: "submit" | "reset" | "button";
  text: string;
  isLoading?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      className={`${className} ${styles.btn}`}
      type={type}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <ClipLoader size={30} color="#fff" /> : <p>{text}</p>}
    </button>
  );
}
