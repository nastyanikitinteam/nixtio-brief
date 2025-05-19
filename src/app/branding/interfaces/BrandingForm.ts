import { brandingFormSchema } from "../schemas/brandingForm.schema";

import type { ObjectSchema, InferType } from "yup";
import type { InputList } from "@/interfaces/InputList";

export interface BrandingForm {
  initialValues: {
    company_details: {
      name: string;
      email: string;
      company_name: string;
      product_description: string;
      tagline_mission_statement: string;
      company_positioning: string;
      previous_design: string;
    };
    target_audience: {
      target_audience: string;
      customer_need: string;
      user_journey: string;
      product_insights: string;
    };
    logo_design: {
      logo_character: string;
      color: string;
      logo_types: string[];
      liked_examples: string[];
      logo_ideas: string;
      unacceptable_things: string;
      logo_restrictions: string;
      logo_using: string;
      competitors: InputList[];
      logo_core_message: string;
      company_reflection: string;
      any_information: string;
    };
    branding_design: {
      need_branding_design: string;
      branding_options: string[];
      business_cards: string;
      social_media_cover: string;
      social_media: string[];
      social_media_other: string;
      white_paper: string;
      presentation: string;
      pitch_deck: string;
      write_your_option: string;
      need_print_files: string;
      printing_requirements: string;
      print_shop_info: string;
      add_requirements: string;
    };
  };
  validationSchema: ObjectSchema<InferType<typeof brandingFormSchema>>;
}
