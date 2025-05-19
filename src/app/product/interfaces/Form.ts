import { formSchema } from "../schemas/form.schema";

import type { ObjectSchema, InferType } from "yup";
import type { InputList } from "@/interfaces/InputList";

export interface Form {
  initialValues: {
    product_details: {
      name: string;
      email: string;
      product_name: string;
      website_mode: string;
      current_version_url: string;
      website_types: string[];
      website_types_other: string;
      product_description: string;
      product_problems: string;
      product_category: string;
      product_variations: string;
      "3D_model": string;
      target_audience: string;
      audience_age: number[];
      target_geographical_market: string;
      competitors: InputList[];
    };
    design: {
      screen_resolutions: string[];
      branding: string;
      branding_url: string;
      style_references: { style_example: string; likes_dislikes: string }[];
      own_style_references: InputList[];
    };
    content: {
      is_content: string;
      content_url: string;
      content_pages: { page: string; description: string }[];
    };
    frontend: {
      need_frontend: string;
      is_react: boolean;
      specific_requests: string;
      languages: string[];
      other_language: string;
      need_animation: string;
      animation: string;
      requirements: string;
    };
    backend: {
      need_backend: string;
      CMS:
        | string
        | {
            type: string;
            value: string;
          };
      SEO_settings: string;
      external_services: string[] | string;
      external_services_other: string;
      security_settings: string;
    };
    hosting_services: {
      domain: string;
      access:
        | string
        | {
            type: string;
            value: string;
          };
    };
    additions: {
      budget: string;
      requirements: string;
    };
  };
  validationSchema: ObjectSchema<InferType<typeof formSchema>>;
}
