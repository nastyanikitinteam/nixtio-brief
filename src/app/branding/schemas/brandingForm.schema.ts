import * as yup from "yup";

export const brandingFormSchema = yup.object().shape({
  company_details: yup.object().shape({
    name: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("This field is required"),
    company_name: yup.string().required("This field is required"),
    product_description: yup.string().required("This field is required"),
  }),
  target_audience: yup.object().shape({
    target_audience: yup.string().required("This field is required"),
    customer_need: yup.string().required("This field is required"),
    user_journey: yup.string().required("This field is required"),
    product_insights: yup.string().required("This field is required"),
  }),
  logo_design: yup.object().shape({
    logo_character: yup.string().required("This field is required"),
    color: yup.string().required("This field is required"),
    logo_types: yup
      .array()
      .of(yup.string())
      .min(1, "Please select at least one type of logo"),
    liked_examples: yup
      .array()
      .of(yup.string())
      .transform((value) =>
        Array.isArray(value) ? value.filter(Boolean) : value
      )
      .min(1, "At least one field is required"),
    logo_ideas: yup.string().required("This field is required"),
    unacceptable_things: yup.string().required("This field is required"),
    logo_restrictions: yup.string().required("This field is required"),
    logo_using: yup.string().required("This field is required"),
    logo_core_message: yup.string().required("This field is required"),
    company_reflection: yup.string().required("This field is required"),
  }),
  branding_design: yup.object().shape({
    need_branding_design: yup.string().required("Please select an option"),
    branding_options: yup
      .array()
      .of(yup.string())
      .when("need_branding_design", {
        is: (value: string) => value === "Yes, we do",
        then: (schema) => schema.min(1, "Please select at least one option"),
        otherwise: (schema) => schema.notRequired(),
      }),
    business_cards: yup.string().when("branding_options", {
      is: (options: string[]) => options.includes("Business cards"),
      then: (schema) => schema.required("This field is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    social_media: yup
      .array()
      .of(yup.string())
      .when("branding_options", {
        is: (options: string[]) => options.includes("Cover for social media"),
        then: (schema) => schema.min(1, "Please select at least one option"),
        otherwise: (schema) => schema.notRequired(),
      }),
    social_media_other: yup
      .string()
      .when(["branding_options", "social_media"], {
        is: (options: string[], media: string[]) =>
          options.includes("Cover for social media") && media.includes("Other"),
        then: (schema) => schema.required("This field is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    write_your_option: yup.string().when("branding_options", {
      is: (options: string[]) => options.includes("Write your option"),
      then: (schema) => schema.required("This field is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    need_print_files: yup.string().when("branding_options", {
      is: (options: string[]) =>
        options.includes("Business cards") ||
        options.includes("White paper") ||
        options.includes("Write your option"),
      then: (schema) => schema.required("Please select an option"),
      otherwise: (schema) => schema.notRequired(),
    }),
    printing_requirements: yup.string().when("need_print_files", {
      is: (print_files: string) => print_files === "Yes, we do",
      then: (schema) => schema.required("This field is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
});
