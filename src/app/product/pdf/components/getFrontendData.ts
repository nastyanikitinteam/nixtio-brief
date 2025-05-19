import { Form } from "@/app/product/interfaces/Form";

export function getFrontendData(frontend: Form["initialValues"]["frontend"]) {
  return [
    {
      label: "Does the company need front-end?:",
      value: frontend.need_frontend,
    },
    {
      label: "Does the company need React?:",
      value: frontend.is_react ? "Yes" : "",
    },
    {
      label: "Specific requests:",
      value: frontend.specific_requests,
    },
    {
      label: "What language is your product in?:",
      value: [
        ...frontend.languages.filter((lang) => lang !== "Other"),
        ...(frontend.other_language ? [frontend.other_language] : []),
      ].join(", "),
    },
    {
      label: "Does the site need animation?:",
      value: frontend.need_animation,
    },
    {
      label: "How complex is the animation needed?:",
      value: frontend.animation,
    },
    {
      label: "Additional requirements:",
      value: frontend.requirements,
    },
  ];
}
