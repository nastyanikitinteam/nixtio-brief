import { Form } from "@/app/product/interfaces/Form";

export function getProductDetailsData(
  product_details: Form["initialValues"]["product_details"]
) {
  return [
    {
      label: "Name:",
      value: product_details.name,
    },
    {
      label: "Email:",
      value: product_details.email,
    },
    {
      label: "Name of the product:",
      value: product_details.product_name,
    },
    {
      label: "Website mode:",
      value: product_details.website_mode,
    },
    {
      label: "Current version of the site:",
      value: product_details.current_version_url,
    },
    {
      label: "Website type:",
      value: [
        ...product_details.website_types.filter((type) => type !== "Other"),
        ...(product_details.website_types_other
          ? [product_details.website_types_other]
          : []),
      ].join(", "),
    },
    {
      label: "Product description:",
      value: product_details.product_description,
    },
    {
      label: "What problems does the product solve?:",
      value: product_details.product_problems,
    },
    {
      label: "What is the product/category?:",
      value: product_details.product_category,
    },
    {
      label: "Product variations (size, color):",
      value: product_details.product_variations,
    },
    {
      label: "Does the product need a 3D model?:",
      value: product_details["3D_model"],
    },
    {
      label: "Target audience description:",
      value: product_details.target_audience,
    },
    {
      label: "Target audience age:",
      value: product_details.audience_age.join(" - "),
    },
    {
      label: "Product's target geographical market:",
      value: product_details.target_geographical_market,
    },
    {
      label: "Competitors:",
      value: product_details.competitors,
    },
  ];
}
