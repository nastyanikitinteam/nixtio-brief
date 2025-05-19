import { Form } from "@/app/branding/interfaces/BrandingForm";

export function getCompanyDetailsData(
  company_details: Form["initialValues"]["company_details"]
) {
  return [
    {
      label: "Name:",
      value: company_details.name,
    },
    {
      label: "Email:",
      value: company_details.email,
    },
    {
      label: "Company name:",
      value: company_details.company_name,
    },
    {
      label: "Product/business description:",
      value: company_details.product_description,
    },
    {
      label: "Tagline/slogan & mission statement:",
      value: company_details.tagline_mission_statement,
    },
    {
      label: "Positioning of company:",
      value: company_details.company_positioning,
    },
    {
      label: "Previous design & marketing materials:",
      value: company_details.previous_design,
    },
  ];
}
