import { brandingFormSchema } from "@/app/branding/schemas/brandingForm.schema";

export const applicationFormConfig = {
  initialValues: {
    product_details: {
      name: "",
      email: "",
      product_name: "",
      app_mode: "",
      current_version_url: "",
      app_types: [],
      app_types_other: "",
      product_description: "",
      product_problems: "",
      product_category: "",
      product_variations: "",
      "3D_model": "",
      branding: "",
      branding_url: "",
      target_audience: "",
      audience_age: [],
      target_geographical_market: "",
      competitors: [],
    },
    content: {
      is_content: "",
      content_url: "",
      content_pages: [],
    },
    development: {
      need_development: "",
    },
  },
 validationSchema: brandingFormSchema,
};
