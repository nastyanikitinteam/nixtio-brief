import { Form } from "@/app/product/interfaces/Form";

export function getAdditionsData(
  additions: Form["initialValues"]["additions"]
) {
  return [
    {
      label: "Project budget (USD):",
      value: additions.budget,
    },
    {
      label: "Additional requirements:",
      value: additions.requirements,
    },
  ];
}
