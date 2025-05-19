import type { InputList } from "@/interfaces/InputList";

export interface ApplicationForm {
  initialValues: {
    product_details: {
      name: string;
      email: string;
      product_name: string;
      app_mode: string;
      current_version_url: string;
      app_types: string[];
      app_types_other: string;
      product_description: string;
      product_problems: string;
      product_category: string;
      product_variations: string;
      "3D_model": string;
      branding: string;
      branding_url: string;
      target_audience: string;
      audience_age: number[];
      target_geographical_market: string;
      competitors: InputList[];
    };
    content: {
      is_content: string;
      content_url: string;
      content_pages: { page: string; description: string }[];
    };
    development: {
      need_development: string;
    };
  };
  validationSchema: null;
}
