import { Form } from "@/app/product/interfaces/Form";

export function getBackendData(backend: Form["initialValues"]["backend"]) {
  return [
    {
      label: "Does the company need back-end?:",
      value: backend.need_backend,
    },
    {
      label: "Which CMS would you like to use?:",
      value: typeof backend.CMS === "object" ? backend.CMS.value : backend.CMS,
    },
    {
      label: "Do you need basic SEO settings?:",
      value: backend.SEO_settings,
    },
    {
      label: "Do you need external service integration?:",
      value: Array.isArray(backend.external_services)
        ? [
            ...backend.external_services.filter(
              (service) => service !== "Other"
            ),
            ...(backend.external_services_other
              ? [backend.external_services_other]
              : []),
          ].join(", ")
        : backend.external_services,
    },
    {
      label: "What security settings are preferred?:",
      value: backend.security_settings,
    },
  ];
}
