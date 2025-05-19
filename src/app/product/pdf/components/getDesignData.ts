import { Form } from "@/app/product/interfaces/Form";

export function getDesignData(design: Form["initialValues"]["design"]) {
  return [
    {
      label: "Screen resolutions:",
      value: design.screen_resolutions.join(", "),
    },
    {
      label: "Does the company have branding?:",
      value: design.branding,
    },
    {
      label: "Branding URL:",
      value: design.branding_url,
    },
    {
      label: "Style references:",
      value: design.style_references,
    },
    {
      label: "Sites or apps that you like:",
      value: design.own_style_references,
    },
  ];
}
