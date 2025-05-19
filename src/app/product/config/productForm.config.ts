import { formSchema } from "@/app/product/schemas/form.schema";

export const productForm = {
  initialValues: {
    product_details: {
      name: "",
      email: "",
      product_name: "",
      website_mode: "",
      current_version_url: "",
      website_types: [],
      website_types_other: "",
      product_description: "",
      product_problems: "",
      product_category: "",
      product_variations: "",
      "3D_model": "",
      target_audience: "",
      audience_age: [0, 70],
      target_geographical_market: "",
      competitors: [{ name_or_url: "", likes_dislikes: "" }],
    },
    design: {
      screen_resolutions: [],
      branding: "",
      branding_url: "",
      style_references: Array.from({ length: 3 }, () => ({
        style_example: "",
        likes_dislikes: "",
      })),
      own_style_references: [{ name_or_url: "", likes_dislikes: "" }],
    },
    content: {
      is_content: "",
      content_url: "",
      content_pages: [{ page: "", description: "" }],
    },
    frontend: {
      need_frontend: "",
      is_react: false,
      specific_requests: "",
      languages: [],
      other_language: "",
      need_animation: "",
      animation: "",
      requirements: "",
    },
    backend: {
      need_backend: "",
      CMS: "",
      SEO_settings: "",
      external_services: [],
      external_services_other: "",
      security_settings: "",
    },
    hosting_services: {
      domain: "",
      access: "",
    },
    additions: {
      budget: "",
      requirements: "",
    },
  },
  validationSchema: formSchema,
};
