import { Form } from "@/app/product/interfaces/Form";

export function getHostingServicesData(
  hosting_services: Form["initialValues"]["hosting_services"]
) {
  return [
    {
      label: "Do you have a purchased domain?:",
      value: hosting_services.domain,
    },
    {
      label: "Access to the hosting/FTP/DB:",
      value:
        typeof hosting_services.access === "object"
          ? hosting_services.access.value
          : hosting_services.access,
    },
  ];
}
