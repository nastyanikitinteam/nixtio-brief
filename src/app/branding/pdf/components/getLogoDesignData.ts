import { Form } from "@/app/branding/interfaces/BrandingForm";

export function getLogoDesignData(
  logo_design: Form["initialValues"]["logo_design"]
) {
  return [
    {
      label: "Personality and style of logo/branding:",
      value: logo_design.logo_character,
    },
    {
      label: "Preferred colors:",
      value: logo_design.color,
    },
    {
      label: "Type of logo best represents brand's desired image:",
      value: logo_design.logo_types.join(", "),
    },
    {
      label: "Provide examples that you like:",
      value: logo_design.liked_examples.join(", "),
    },
    {
      label: "Ideas or concepts to include in the logo:",
      value: logo_design.logo_ideas,
    },
    {
      label: "Visuals or concepts should not be used:",
      value: logo_design.unacceptable_things,
    },
    {
      label: "Restrictions on using certain symbols or images:",
      value: logo_design.logo_restrictions,
    },
    {
      label: "Where do you plan to use the logo?:",
      value: logo_design.logo_using,
    },
    {
      label: "Who's the competition?:",
      value: logo_design.competitors,
    },
    {
      label: "Core message and desired emotional:",
      value: logo_design.logo_core_message,
    },
    {
      label: "Something unique to reflect in the logo:",
      value: logo_design.company_reflection,
    },
    {
      label: "Any other important information about the logo:",
      value: logo_design.any_information,
    },
  ];
}
