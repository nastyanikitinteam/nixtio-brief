import Label from "@/ui/Label/Label";

import "./Wrapper.scss";

export default function Wrapper({
  title,
  label,
  children,
}: Readonly<{
  title: string;
  label: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="wrapper">
      <h2 className="title">
        {title}
        <Label text={label} />
      </h2>
      <div className="content">{children}</div>
    </div>
  );
}
