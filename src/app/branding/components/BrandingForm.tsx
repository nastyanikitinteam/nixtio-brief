"use client";

import { useState } from "react";

import Form from "@/app/components/Form/Form";
import CompanyDetails from "./CompanyDetails/CompanyDetails";
import TargetAudience from "./TargetAudience/TargetAudience";
import LogoDesign from "./LogoDesign/LogoDesign";
import BrandingDesign from "./BrandingDesign/BrandingDesign";

import { brandingFormConfig as form } from "@/app/branding/config/brandingForm.config";
import { getFilteredInputList } from "@/lib/helpers";
import { BRANDING_LOCAL_STORAGE_KEY } from "@/const/BRANDING_LOCAL_STORAGE_KEY";

import type { BrandingForm } from "@/app/branding/interfaces/BrandingForm";

export default function BrandingForm() {
  const [isLoading, setIsLoading] = useState(false);

  const getUpdatedValues = (values: BrandingForm["initialValues"]) => {
    const { logo_design } = values;

    const updatedValues = {
      ...values,
      logo_design: {
        ...logo_design,
        liked_examples: logo_design.liked_examples.filter(
          (example) => example && example.trim()
        ),
        competitors: getFilteredInputList(logo_design.competitors),
      },
    };

    return updatedValues;
  };

  const getBody = (updatedValues: BrandingForm["initialValues"]) => {
    return {
      type: "branding",
      name: updatedValues.company_details.name,
      email: updatedValues.company_details.email,
      company: updatedValues.company_details.company_name,
      values: updatedValues,
    };
  };

  return (
    <Form
      form={form}
      LOCAL_STORAGE_KEY={BRANDING_LOCAL_STORAGE_KEY}
      getUpdatedValues={getUpdatedValues}
      getBody={getBody}
      setIsLoading={setIsLoading}
      isBranding={true}
    >
      <CompanyDetails />
      <TargetAudience />
      <LogoDesign />
      <BrandingDesign isLoading={isLoading} />
    </Form>
  );
}
