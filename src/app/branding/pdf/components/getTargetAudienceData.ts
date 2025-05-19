import { Form } from "@/app/branding/interfaces/BrandingForm";

export function getTargetAudienceData(
  target_audience: Form["initialValues"]["target_audience"]
) {
  return [
    {
      label: "Target audience description:",
      value: target_audience.target_audience,
    },
    {
      label: "Why customer needs product?:",
      value: target_audience.customer_need,
    },
    {
      label: "Map customer journey to purchase:",
      value: target_audience.user_journey,
    },
    {
      label: "What's important to know about the product/brand?:",
      value: target_audience.product_insights,
    },
  ];
}
