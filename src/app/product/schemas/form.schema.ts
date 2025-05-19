import * as yup from "yup";

export const formSchema = yup.object().shape({
  product_details: yup.object().shape({
    name: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("This field is required"),
    website_mode: yup.string().required("Please select one of the options"),
    current_version_url: yup.string().when("website_mode", {
      is: (mode: string) => mode === "Website redesign",
      then: (schema) => schema.required("This field is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    website_types: yup
      .array()
      .of(yup.string())
      .min(1, "Please select at least one website type")
      .required(),
    website_types_other: yup.string().when("website_types", {
      is: (types: string[]) => types.includes("Other"),
      then: (schema) => schema.required("This field is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    product_description: yup.string().required("This field is required"),
    product_variations: yup.string().when("website_types", {
      is: (types: string[]) => types.includes("E-commerce"),
      then: (schema) => schema.required("Please select an option"),
      otherwise: (schema) => schema.notRequired(),
    }),
    "3D_model": yup.string().when("website_types", {
      is: (types: string[]) => types.includes("E-commerce"),
      then: (schema) => schema.required("Please select an option"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  design: yup.object().shape({
    screen_resolutions: yup
      .array()
      .of(yup.string())
      .min(1, "Please select at least one screen resolution"),
    branding: yup.string().required("Please select an option"),
    branding_url: yup.string().when("branding", {
      is: (branding: string) => branding === "Yes, we have",
      then: (schema) => schema.required("This field is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  content: yup.object().shape({
    is_content: yup.string().required("Please select an option"),
  }),
  frontend: yup.object().shape({
    need_frontend: yup.string().required("Please select an option"),
    languages: yup
      .array()
      .of(yup.string())
      .when("need_frontend", {
        is: (frontend: string) => frontend === "Yes, we do",
        then: (schema) => schema.min(1, "Please select at least one option"),
        otherwise: (schema) => schema.notRequired(),
      }),
    other_language: yup.string().when(["need_frontend", "languages"], {
      is: (frontend: string, languages: string[]) =>
        frontend === "Yes, we do" && languages.includes("Other"),
      then: (schema) => schema.required("This field is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    need_animation: yup.string().when("need_frontend", {
      is: (frontend: string) => frontend === "Yes, we do",
      then: (schema) => schema.required("Please select an option"),
      otherwise: (schema) => schema.notRequired(),
    }),
    animation: yup.string().when(["need_frontend", "need_animation"], {
      is: (frontend: string, animation: string) =>
        frontend === "Yes, we do" && animation === "Yes",
      then: (schema) => schema.required("Please select an option"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  backend: yup.object().shape({
    need_backend: yup.string().when("$frontend.need_frontend", {
      is: (frontend: string) => frontend !== "No, we don't",
      then: (schema) => schema.required("Please select an option"),
      otherwise: (schema) => schema.notRequired(),
    }),
    CMS: yup.mixed().when(["$frontend.is_react", "need_backend"], {
      is: (isReact: boolean, backend: string) =>
        !isReact && backend === "Yes, we do",
      then: () =>
        yup.lazy((item) =>
          typeof item === "object"
            ? yup.object().shape({
                value: yup.string().required("This field is required"),
              })
            : yup.string().required("Please select an option")
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
    SEO_settings: yup.string().when("need_backend", {
      is: (backend: string) => backend === "Yes, we do",
      then: (schema) => schema.required("Please select an option"),
      otherwise: (schema) => schema.notRequired(),
    }),
    external_services: yup.mixed().when("need_backend", {
      is: (backend: string) => backend === "Yes, we do",
      then: () =>
        yup.lazy((item) =>
          Array.isArray(item)
            ? yup
                .array()
                .of(yup.string())
                .min(1, "Please select at least one external service")
            : yup.string()
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
    external_services_other: yup
      .string()
      .when(["need_backend", "external_services"], {
        is: (backend: string, services: string[]) =>
          backend === "Yes, we do" && services.includes("Other"),
        then: (schema) => schema.required("This field is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    security_settings: yup.string().when("need_backend", {
      is: (backend: string) => backend === "Yes, we do",
      then: (schema) => schema.required("Please select an option"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  hosting_services: yup.object().shape({
    domain: yup.string().required("Please select an option"),
    access: yup.lazy((item) =>
      typeof item === "object"
        ? yup.object().shape({
            value: yup.string().required("This field is required"),
          })
        : yup.string().required("Please select an option")
    ),
  }),
  additions: yup.object().shape({
    budget: yup.string().required("Please select an option"),
  }),
});
