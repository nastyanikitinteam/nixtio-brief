import { Form } from "@/app/branding/interfaces/BrandingForm";

export function getBrandingDesignData(
  branding_design: Form["initialValues"]["branding_design"]
) {
  return [
    {
      label: "Branded materials:",
      value: branding_design.need_branding_design,
    },
    {
      label: "Select which option you prefer:",
      value: branding_design.branding_options.join(", "),
    },
    {
      label: "Business cards:",
      value: branding_design.business_cards,
    },
    {
      label: "Cover for social media:",
      value: branding_design.social_media_cover,
    },
    {
      label: "Social media:",
      value: [
        ...branding_design.social_media.filter((lang) => lang !== "Other"),
        ...(branding_design.social_media_other
          ? [branding_design.social_media_other]
          : []),
      ].join(", "),
    },
    {
      label: "White paper:",
      value: branding_design.white_paper,
    },
    {
      label: "Presentation:",
      value: branding_design.presentation,
    },
    {
      label: "Pitch deck:",
      value: branding_design.pitch_deck,
    },
    {
      label: "Write your option:",
      value: branding_design.write_your_option,
    },
    {
      label: "Company need print files:",
      value: branding_design.need_print_files,
    },
    {
      label: "Printing requirements:",
      value: branding_design.printing_requirements,
    },
    {
      label: "Contact information for the print shop:",
      value: branding_design.print_shop_info,
    },
    {
      label: "Additional requirements:",
      value: branding_design.add_requirements,
    },
  ];
}
